# Complete Guide: Building and Publishing a LinkedIn Company Email Scraper on Apify

## Table of Contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Understanding Apify Actors](#understanding-apify-actors)
4. [Setup and Installation](#setup-and-installation)
5. [Actor Architecture](#actor-architecture)
6. [Building the LinkedIn Company Email Scraper](#building-the-linkedin-company-email-scraper)
7. [Local Development and Testing](#local-development-and-testing)
8. [Deployment to Apify Platform](#deployment-to-apify-platform)
9. [Publishing to Apify Store](#publishing-to-apify-store)
10. [Monetization and Pricing](#monetization-and-pricing)
11. [Maintenance and Best Practices](#maintenance-and-best-practices)

---

## Introduction

This guide provides step-by-step instructions for creating and publishing a LinkedIn Company Email Scraper as an Apify Actor. Based on analysis of successful LinkedIn email finder Actors on the Apify platform, we'll build a robust, scalable solution that:

- Extracts employee information from LinkedIn company pages
- Finds and verifies business email addresses
- Filters by job title, location, department, and seniority
- Returns structured JSON/CSV output
- Works without LinkedIn login or cookies

### Key Features to Implement
- **No-login scraping** - Uses public data and web search
- **Email verification** - SMTP validation and deliverability checks
- **Bulk processing** - Handle multiple companies simultaneously
- **Decision-maker filtering** - Target C-suite, VP, Director levels
- **Pay-per-result pricing** - Charge only for successful results

---

## Prerequisites

### Required Knowledge
- Programming experience (JavaScript/Node.js or Python)
- Basic understanding of web scraping concepts
- Familiarity with JSON and REST APIs
- Git version control basics

### Required Accounts
1. **Apify Account** (https://apify.com)
   - Sign up for free
   - Get your API token from Settings > Integrations
   - Note: Free tier includes $5 monthly credit

2. **Email Verification Service** (Optional but recommended)
   - BounceVerify ($0.89/1000 emails)
   - MillionVerifier
   - Hunter.io API key

3. **Development Tools**
   - Node.js 22+ OR Python 3.11+
   - Git
   - Code editor (VS Code recommended)
   - Docker (optional for local testing)

### System Requirements
- **Memory**: Minimum 8GB RAM for browser-based scraping
- **Storage**: 2GB free space for dependencies and data
- **OS**: Windows, macOS, or Linux

---

## Understanding Apify Actors

### What is an Actor?
Actors are serverless cloud programs that:
- Accept structured JSON input
- Perform web scraping, automation, or data processing
- Produce structured output (JSON, CSV, Excel)
- Run in Docker containers
- Can be scheduled, chained, and monetized

### Actor Components

```
your-actor/
├── .actor/
│   ├── actor.json           # Actor metadata and configuration
│   ├── input_schema.json    # Defines UI and input validation
│   └── README.md            # Actor documentation
├── src/
│   └── main.js/main.py      # Your scraping logic
├── storage/                  # Local storage emulation
│   ├── datasets/
│   ├── key_value_stores/
│   └── request_queues/
├── Dockerfile               # Docker build configuration
└── package.json/.venv       # Dependencies
```

### Actor Lifecycle
1. **Init** - Actor starts, initializes SDK
2. **Input** - Reads and validates input
3. **Processing** - Executes scraping/automation logic
4. **Output** - Stores results in dataset/key-value store
5. **Exit** - Cleanup and graceful shutdown

---

## Setup and Installation

### Step 1: Install Apify CLI

**Option A: Installation Script (Recommended - No Node.js required)**

```bash
# macOS/Linux
curl -fsSL https://apify.com/install-cli.sh | bash

# Windows (PowerShell)
irm https://apify.com/install-cli.ps1 | iex
```

**Option B: NPM (Requires Node.js 22+)**

```bash
npm install -g apify-cli
```

**Option C: Homebrew (macOS)**

```bash
brew install apify-cli
```

**Verify Installation:**

```bash
apify --version
# Expected output: apify-cli/1.0.1 (0dfcfd8) running on ...
```

### Step 2: Authenticate with Apify

```bash
apify login
```

This opens a browser window to authenticate. Alternatively, set your API token:

```bash
export APIFY_TOKEN=your_api_token_here
# Windows CMD: set APIFY_TOKEN=your_api_token_here
# Windows PowerShell: $env:APIFY_TOKEN="your_api_token_here"
```

### Step 3: Create New Actor Project

```bash
# Create new directory and navigate to it
mkdir linkedin-company-email-scraper
cd linkedin-company-email-scraper

# Initialize new Actor
apify init
```

**Interactive Setup Prompts:**

1. **Template Selection**: Choose one of:
   - `node-puppeteer` - For browser-based scraping (JavaScript)
   - `python-playwright` - For browser-based scraping (Python)
   - `node-cheerio` - For HTTP-based scraping (JavaScript)
   - `python-beautifulsoup` - For HTTP-based scraping (Python)

2. **Actor Name**: `linkedin-company-email-scraper`

3. **Description**: "Find LinkedIn company employees and verify business emails"

**Recommended Template**: `python-playwright` or `node-puppeteer` for robust scraping

---

## Actor Architecture

### High-Level Architecture

```
┌─────────────────┐
│   User Input    │
│  - Companies    │
│  - Filters      │
│  - Max Results  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Input Parser   │
│  & Validator    │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│   Company Employee Finder       │
│   - LinkedIn company page       │
│   - People search results       │
│   - Apply filters (title, loc)  │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│   Profile Data Extraction       │
│   - Name, title, company        │
│   - Work history, education     │
│   - Extract company domain      │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│   Email Pattern Discovery       │
│   - Find published emails       │
│   - Identify format pattern     │
│   - Generate candidate emails   │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│   Email Verification            │
│   - SMTP validation             │
│   - Catch-all detection         │
│   - Deliverability score        │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│   Output Formatting             │
│   - Structured JSON             │
│   - CSV export ready            │
│   - Metadata & confidence       │
└─────────────────────────────────┘
```

### Data Flow

**Input Schema:**
```json
{
  "companies": ["https://linkedin.com/company/stripe", "Acme Corp"],
  "jobTitles": ["CEO", "VP of Sales", "Marketing Director"],
  "locations": ["United States", "London"],
  "department": "sales",
  "decisionMakersOnly": true,
  "maxEmployees": 100,
  "maxCandidatesPerEmployee": 3
}
```

**Output Schema:**
```json
{
  "full_name": "Jane Doe",
  "job_title": "VP of Sales",
  "company_name": "Acme Corp",
  "company_domain": "acmecorp.com",
  "linkedin_url": "https://linkedin.com/in/janedoe",
  "email": "jane.doe@acmecorp.com",
  "email_status": "valid",
  "email_confidence": 97,
  "location": "San Francisco, CA",
  "seniority": "VP",
  "department": "Sales",
  "verifier_result": "ok",
  "found_via": "domain_pattern"
}
```

---

## Building the LinkedIn Company Email Scraper

### Directory Structure Setup

```bash
linkedin-company-email-scraper/
├── .actor/
│   ├── actor.json
│   ├── input_schema.json
│   ├── output_schema.json
│   └── README.md
├── src/
│   ├── main.py                 # Entry point
│   ├── config.py               # Configuration
│   ├── scrapers/
│   │   ├── linkedin_scraper.py
│   │   └── company_finder.py
│   ├── email/
│   │   ├── pattern_finder.py
│   │   ├── generator.py
│   │   └── verifier.py
│   └── utils/
│       ├── filters.py
│       └── formatters.py
├── requirements.txt / package.json
├── Dockerfile
└── .dockerignore
```

### Step 1: Define Actor Configuration

**File: `.actor/actor.json`**

```json
{
  "actorSpecification": 1,
  "name": "linkedin-company-email-scraper",
  "title": "LinkedIn Company Employees Scraper + Email Finder",
  "description": "Find LinkedIn company employees and decision makers with verified business emails. No login or cookies required.",
  "version": "1.0.0",
  "meta": {
    "templateId": "python-playwright"
  },
  "input": "./.actor/input_schema.json",
  "output": "./.actor/output_schema.json",
  "dockerfile": "./Dockerfile",
  "readme": "./.actor/README.md",
  "categories": ["LEAD_GENERATION", "BUSINESS"],
  "defaultRunOptions": {
    "build": "latest",
    "timeoutSecs": 3600,
    "memoryMbytes": 8192
  }
}
```

### Step 2: Create Input Schema

**File: `.actor/input_schema.json`**

```json
{
  "title": "LinkedIn Company Email Scraper Input",
  "type": "object",
  "schemaVersion": 1,
  "properties": {
    "companies": {
      "title": "LinkedIn Company URLs or Names",
      "type": "array",
      "description": "One company per line. LinkedIn company URLs work best; plain company names are also resolved.",
      "editor": "stringList",
      "items": {
        "type": "string"
      },
      "prefill": [
        "https://www.linkedin.com/company/stripe/",
        "https://www.linkedin.com/company/shopify/"
      ]
    },
    "jobTitles": {
      "title": "Job Titles (Optional)",
      "type": "array",
      "description": "Filter employees by job titles. Leave blank for all roles.",
      "editor": "stringList",
      "items": {
        "type": "string"
      },
      "prefill": ["CEO", "CTO", "VP of Sales", "Director of Marketing"]
    },
    "locations": {
      "title": "Locations (Optional)",
      "type": "array",
      "description": "Filter by LinkedIn location (e.g., United States, London, Sydney).",
      "editor": "stringList",
      "items": {
        "type": "string"
      }
    },
    "department": {
      "title": "Department Filter",
      "type": "string",
      "description": "Narrow to one business function.",
      "enum": [
        "any",
        "sales",
        "marketing",
        "human_resources",
        "business_development",
        "engineering",
        "operations",
        "finance",
        "information_technology",
        "product_management",
        "customer_success"
      ],
      "default": "any",
      "editor": "select"
    },
    "decisionMakersOnly": {
      "title": "Decision Makers Only",
      "type": "boolean",
      "description": "Only return Director, VP, CXO, and Owner/Partner seniority levels.",
      "default": false,
      "editor": "checkbox"
    },
    "maxEmployees": {
      "title": "Maximum Employees",
      "type": "integer",
      "description": "Maximum employee records to return per run.",
      "minimum": 1,
      "maximum": 2000,
      "default": 100,
      "editor": "number"
    },
    "maxCandidatesPerEmployee": {
      "title": "Email Patterns to Try",
      "type": "integer",
      "description": "Maximum email patterns to test per employee (cost control).",
      "minimum": 1,
      "maximum": 6,
      "default": 3,
      "editor": "number"
    },
    "findEmails": {
      "title": "Find and Verify Emails",
      "type": "boolean",
      "description": "Attempt to find and verify business email addresses.",
      "default": true,
      "editor": "checkbox"
    },
    "verifierApiKey": {
      "title": "Email Verifier API Key (Optional)",
      "type": "string",
      "description": "API key for email verification service (BounceVerify, MillionVerifier, etc.).",
      "editor": "textfield",
      "isSecret": true
    }
  },
  "required": ["companies"]
}
```

### Step 3: Create Output Schema

**File: `.actor/output_schema.json`**

```json
{
  "title": "LinkedIn Employee with Email",
  "type": "object",
  "properties": {
    "full_name": {
      "title": "Full Name",
      "type": "string",
      "description": "Employee's full name"
    },
    "job_title": {
      "title": "Job Title",
      "type": "string",
      "description": "Current job title"
    },
    "company_name": {
      "title": "Company Name",
      "type": "string"
    },
    "company_domain": {
      "title": "Company Domain",
      "type": "string",
      "description": "Company website domain"
    },
    "linkedin_url": {
      "title": "LinkedIn Profile URL",
      "type": "string",
      "format": "uri"
    },
    "email": {
      "title": "Business Email",
      "type": "string",
      "format": "email",
      "description": "Verified or candidate business email"
    },
    "email_status": {
      "title": "Email Status",
      "type": "string",
      "enum": ["valid", "risky", "catch_all", "invalid", "not_found"],
      "description": "Email deliverability status"
    },
    "email_confidence": {
      "title": "Confidence Score",
      "type": "integer",
      "minimum": 0,
      "maximum": 100,
      "description": "Confidence score for the email (0-100)"
    },
    "location": {
      "title": "Location",
      "type": "string"
    },
    "seniority": {
      "title": "Seniority Level",
      "type": "string",
      "enum": ["Entry", "Mid", "Senior", "Director", "VP", "CXO", "Owner/Partner"]
    },
    "department": {
      "title": "Department",
      "type": "string"
    }
  }
}
```

### Step 4: Main Scraper Implementation (Python)

**File: `src/main.py`**

```python
import asyncio
from apify import Actor
from scrapers.linkedin_scraper import LinkedInScraper
from email.pattern_finder import EmailPatternFinder
from email.verifier import EmailVerifier
from utils.filters import apply_filters
from utils.formatters import format_output

async def main():
    """
    Main entry point for the LinkedIn Company Email Scraper Actor.
    """
    async with Actor:
        # Get and validate input
        actor_input = await Actor.get_input() or {}
        Actor.log.info(f"Received input: {actor_input}")
        
        companies = actor_input.get('companies', [])
        job_titles = actor_input.get('jobTitles', [])
        locations = actor_input.get('locations', [])
        department = actor_input.get('department', 'any')
        decision_makers_only = actor_input.get('decisionMakersOnly', False)
        max_employees = actor_input.get('maxEmployees', 100)
        max_candidates = actor_input.get('maxCandidatesPerEmployee', 3)
        find_emails = actor_input.get('findEmails', True)
        verifier_api_key = actor_input.get('verifierApiKey')
        
        if not companies:
            Actor.log.error("No companies provided in input")
            await Actor.exit()
            return
        
        # Initialize components
        linkedin_scraper = LinkedInScraper()
        email_pattern_finder = EmailPatternFinder()
        email_verifier = EmailVerifier(api_key=verifier_api_key)
        
        all_results = []
        
        # Process each company
        for company in companies:
            Actor.log.info(f"Processing company: {company}")
            
            try:
                # Step 1: Get company profile and employees
                company_data = await linkedin_scraper.get_company_info(company)
                employees = await linkedin_scraper.get_company_employees(
                    company_data['linkedin_url'],
                    max_employees=max_employees
                )
                
                Actor.log.info(f"Found {len(employees)} employees for {company_data['name']}")
                
                # Step 2: Apply filters
                filtered_employees = apply_filters(
                    employees,
                    job_titles=job_titles,
                    locations=locations,
                    department=department,
                    decision_makers_only=decision_makers_only
                )
                
                Actor.log.info(f"After filtering: {len(filtered_employees)} employees")
                
                # Step 3: Find and verify emails
                if find_emails:
                    # Discover email patterns for this company
                    company_domain = company_data.get('domain', '')
                    email_patterns = await email_pattern_finder.discover_patterns(
                        company_domain
                    )
                    
                    for employee in filtered_employees:
                        # Generate email candidates
                        email_candidates = email_pattern_finder.generate_candidates(
                            first_name=employee['first_name'],
                            last_name=employee['last_name'],
                            domain=company_domain,
                            patterns=email_patterns,
                            max_candidates=max_candidates
                        )
                        
                        # Verify emails
                        verified_email = await email_verifier.verify_candidates(
                            email_candidates
                        )
                        
                        if verified_email:
                            employee['email'] = verified_email['email']
                            employee['email_status'] = verified_email['status']
                            employee['email_confidence'] = verified_email['confidence']
                        else:
                            employee['email'] = None
                            employee['email_status'] = 'not_found'
                            employee['email_confidence'] = 0
                        
                        # Add company data
                        employee['company_name'] = company_data['name']
                        employee['company_domain'] = company_domain
                        
                        all_results.append(employee)
                        
                        # Push data incrementally
                        await Actor.push_data(format_output(employee))
                        
                        # Status update
                        await Actor.set_status_message(
                            f"Processed {len(all_results)}/{max_employees} employees"
                        )
                
            except Exception as e:
                Actor.log.error(f"Error processing company {company}: {str(e)}")
                continue
        
        Actor.log.info(f"Scraping completed. Total results: {len(all_results)}")
        
        # Final status
        await Actor.set_status_message(
            f"Completed! Found {len(all_results)} employees with emails"
        )

if __name__ == '__main__':
    asyncio.run(main())
```

### Step 5: LinkedIn Scraper Module

**File: `src/scrapers/linkedin_scraper.py`**

```python
from playwright.async_api import async_playwright
from apify import Actor
import re

class LinkedInScraper:
    """Scrapes LinkedIn company pages and employee information."""
    
    def __init__(self):
        self.browser = None
        self.context = None
    
    async def get_company_info(self, company_identifier):
        """
        Get company information from LinkedIn.
        
        Args:
            company_identifier: LinkedIn URL or company name
        
        Returns:
            dict: Company data including name, domain, employee count
        """
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            
            # Resolve company name to LinkedIn URL if needed
            if not company_identifier.startswith('http'):
                company_url = await self._search_company(page, company_identifier)
            else:
                company_url = company_identifier
            
            # Navigate to company page
            await page.goto(company_url, wait_until='networkidle')
            
            # Extract company data
            company_data = {
                'name': await self._extract_company_name(page),
                'domain': await self._extract_company_domain(page),
                'employee_count': await self._extract_employee_count(page),
                'linkedin_url': company_url,
                'industry': await self._extract_industry(page)
            }
            
            await browser.close()
            return company_data
    
    async def get_company_employees(self, company_url, max_employees=100):
        """
        Get list of employees from company page.
        
        Args:
            company_url: LinkedIn company URL
            max_employees: Maximum number of employees to scrape
        
        Returns:
            list: Employee data dictionaries
        """
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            
            # Navigate to people page
            people_url = f"{company_url}/people/"
            await page.goto(people_url, wait_until='networkidle')
            
            employees = []
            
            # Scroll and load more employees
            while len(employees) < max_employees:
                # Extract visible employee cards
                employee_cards = await page.query_selector_all('.org-people-profile-card')
                
                for card in employee_cards:
                    if len(employees) >= max_employees:
                        break
                    
                    employee = await self._extract_employee_data(card)
                    if employee:
                        employees.append(employee)
                
                # Check if there are more results
                load_more_btn = await page.query_selector('button.scaffold-finite-scroll__load-button')
                if load_more_btn:
                    await load_more_btn.click()
                    await page.wait_for_timeout(2000)
                else:
                    break
            
            await browser.close()
            return employees
    
    async def _extract_employee_data(self, card):
        """Extract employee data from profile card."""
        try:
            name_elem = await card.query_selector('.org-people-profile-card__profile-title')
            name = await name_elem.inner_text() if name_elem else None
            
            title_elem = await card.query_selector('.artdeco-entity-lockup__subtitle')
            job_title = await title_elem.inner_text() if title_elem else None
            
            link_elem = await card.query_selector('a[href*="/in/"]')
            linkedin_url = await link_elem.get_attribute('href') if link_elem else None
            
            # Parse name into first and last
            first_name, last_name = self._parse_name(name)
            
            return {
                'full_name': name,
                'first_name': first_name,
                'last_name': last_name,
                'job_title': job_title,
                'linkedin_url': linkedin_url,
                'seniority': self._determine_seniority(job_title),
                'department': self._determine_department(job_title)
            }
        except Exception as e:
            Actor.log.warning(f"Error extracting employee data: {e}")
            return None
    
    def _parse_name(self, full_name):
        """Split full name into first and last name."""
        if not full_name:
            return None, None
        parts = full_name.strip().split()
        first_name = parts[0] if len(parts) > 0 else ''
        last_name = parts[-1] if len(parts) > 1 else ''
        return first_name, last_name
    
    def _determine_seniority(self, job_title):
        """Determine seniority level from job title."""
        if not job_title:
            return 'Unknown'
        
        title_lower = job_title.lower()
        
        if any(term in title_lower for term in ['ceo', 'cto', 'cfo', 'coo', 'chief']):
            return 'CXO'
        elif any(term in title_lower for term in ['vp', 'vice president']):
            return 'VP'
        elif 'director' in title_lower:
            return 'Director'
        elif any(term in title_lower for term in ['senior', 'sr', 'lead', 'principal']):
            return 'Senior'
        elif any(term in title_lower for term in ['manager', 'head of']):
            return 'Mid'
        else:
            return 'Entry'
    
    def _determine_department(self, job_title):
        """Determine department from job title."""
        if not job_title:
            return 'Unknown'
        
        title_lower = job_title.lower()
        
        dept_keywords = {
            'sales': ['sales', 'account executive', 'business development'],
            'marketing': ['marketing', 'growth', 'brand'],
            'engineering': ['engineer', 'developer', 'software', 'technical'],
            'product': ['product', 'pm'],
            'operations': ['operations', 'ops', 'supply chain'],
            'finance': ['finance', 'accounting', 'cfo'],
            'hr': ['human resources', 'hr', 'people', 'talent'],
            'customer_success': ['customer success', 'support', 'customer experience']
        }
        
        for dept, keywords in dept_keywords.items():
            if any(kw in title_lower for kw in keywords):
                return dept
        
        return 'Other'
    
    async def _search_company(self, page, company_name):
        """Search for company on LinkedIn by name."""
        search_url = f"https://www.linkedin.com/search/results/companies/?keywords={company_name}"
        await page.goto(search_url, wait_until='networkidle')
        
        # Get first result
        first_result = await page.query_selector('.reusable-search__result-container a[href*="/company/"]')
        if first_result:
            return await first_result.get_attribute('href')
        
        raise Exception(f"Could not find company: {company_name}")
    
    async def _extract_company_name(self, page):
        """Extract company name from page."""
        name_elem = await page.query_selector('.org-top-card-summary__title')
        return await name_elem.inner_text() if name_elem else None
    
    async def _extract_company_domain(self, page):
        """Extract company domain from page."""
        website_elem = await page.query_selector('a[href*="http"]')
        if website_elem:
            url = await website_elem.get_attribute('href')
            domain = re.findall(r'https?://(?:www\.)?([^/]+)', url)
            return domain[0] if domain else None
        return None
    
    async def _extract_employee_count(self, page):
        """Extract employee count."""
        count_elem = await page.query_selector('.org-top-card-summary-info-list__info-item')
        if count_elem:
            text = await count_elem.inner_text()
            # Parse "10,000+ employees" -> 10000
            numbers = re.findall(r'[\d,]+', text)
            if numbers:
                return int(numbers[0].replace(',', ''))
        return None
    
    async def _extract_industry(self, page):
        """Extract company industry."""
        industry_elem = await page.query_selector('.org-top-card-summary-info-list__info-item:nth-child(2)')
        return await industry_elem.inner_text() if industry_elem else None
```

### Step 6: Email Pattern Finder

**File: `src/email/pattern_finder.py`**

```python
import re
from typing import List, Dict
from apify import Actor
import httpx
from bs4 import BeautifulSoup

class EmailPatternFinder:
    """Discovers and generates email address patterns."""
    
    # Common email patterns
    PATTERNS = [
        '{first}.{last}@{domain}',      # john.doe@company.com
        '{first}{last}@{domain}',       # johndoe@company.com
        '{first_initial}{last}@{domain}', # jdoe@company.com
        '{first}@{domain}',             # john@company.com
        '{first}_{last}@{domain}',      # john_doe@company.com
        '{first}-{last}@{domain}',      # john-doe@company.com
    ]
    
    async def discover_patterns(self, domain: str) -> List[str]:
        """
        Discover actual email patterns used by a company.
        
        Args:
            domain: Company domain (e.g., 'stripe.com')
        
        Returns:
            List of discovered patterns, sorted by confidence
        """
        discovered_emails = []
        
        # Method 1: Scrape company website
        website_emails = await self._scrape_company_website(domain)
        discovered_emails.extend(website_emails)
        
        # Method 2: Search public sources (GitHub, npm, etc.)
        public_emails = await self._search_public_sources(domain)
        discovered_emails.extend(public_emails)
        
        # Analyze patterns from discovered emails
        patterns = self._analyze_patterns(discovered_emails, domain)
        
        Actor.log.info(f"Discovered {len(patterns)} email patterns for {domain}")
        return patterns
    
    async def _scrape_company_website(self, domain: str) -> List[str]:
        """Scrape company website for email addresses."""
        emails = []
        
        try:
            async with httpx.AsyncClient() as client:
                # Try common pages
                pages_to_check = [
                    f'https://{domain}',
                    f'https://{domain}/about',
                    f'https://{domain}/contact',
                    f'https://{domain}/team',
                ]
                
                for url in pages_to_check:
                    try:
                        response = await client.get(url, timeout=10)
                        if response.status_code == 200:
                            # Find emails in page content
                            page_emails = re.findall(
                                r'[a-zA-Z0-9._%+-]+@' + re.escape(domain),
                                response.text
                            )
                            emails.extend(page_emails)
                    except Exception as e:
                        Actor.log.debug(f"Could not fetch {url}: {e}")
                        continue
        
        except Exception as e:
            Actor.log.warning(f"Error scraping website {domain}: {e}")
        
        return list(set(emails))  # Remove duplicates
    
    async def _search_public_sources(self, domain: str) -> List[str]:
        """Search GitHub, npm, and other public sources for emails."""
        emails = []
        
        # GitHub search
        try:
            async with httpx.AsyncClient() as client:
                # Search GitHub for commits by domain
                github_url = f'https://api.github.com/search/commits?q={domain}'
                # Note: Requires GitHub API token for full access
                # For now, we'll use a basic approach
                pass
        except Exception as e:
            Actor.log.debug(f"GitHub search error: {e}")
        
        return emails
    
    def _analyze_patterns(self, emails: List[str], domain: str) -> List[str]:
        """
        Analyze discovered emails to identify patterns.
        
        Returns patterns sorted by frequency.
        """
        if not emails:
            # Return default patterns if no emails found
            return self.PATTERNS
        
        pattern_counts = {}
        
        for email in emails:
            local_part = email.split('@')[0]
            
            # Identify pattern type
            if '.' in local_part:
                pattern_counts['{first}.{last}@{domain}'] = pattern_counts.get(
                    '{first}.{last}@{domain}', 0
                ) + 1
            elif '_' in local_part:
                pattern_counts['{first}_{last}@{domain}'] = pattern_counts.get(
                    '{first}_{last}@{domain}', 0
                ) + 1
            elif '-' in local_part:
                pattern_counts['{first}-{last}@{domain}'] = pattern_counts.get(
                    '{first}-{last}@{domain}', 0
                ) + 1
            elif len(local_part.split()) == 1:
                # Could be firstlast or first or firstinitiallast
                pattern_counts['{first}{last}@{domain}'] = pattern_counts.get(
                    '{first}{last}@{domain}', 0
                ) + 1
        
        # Sort patterns by frequency
        sorted_patterns = sorted(
            pattern_counts.items(),
            key=lambda x: x[1],
            reverse=True
        )
        
        # Return sorted patterns, then fill with default patterns
        result = [p[0] for p in sorted_patterns]
        for pattern in self.PATTERNS:
            if pattern not in result:
                result.append(pattern)
        
        return result
    
    def generate_candidates(
        self,
        first_name: str,
        last_name: str,
        domain: str,
        patterns: List[str],
        max_candidates: int = 3
    ) -> List[str]:
        """
        Generate email address candidates based on patterns.
        
        Args:
            first_name: First name
            last_name: Last name
            domain: Company domain
            patterns: List of patterns to use
            max_candidates: Maximum number of candidates to generate
        
        Returns:
            List of email address candidates
        """
        if not first_name or not last_name:
            return []
        
        # Normalize names
        first = first_name.lower().strip()
        last = last_name.lower().strip()
        first_initial = first[0] if first else ''
        
        candidates = []
        
        for pattern in patterns[:max_candidates]:
            email = pattern.format(
                first=first,
                last=last,
                first_initial=first_initial,
                domain=domain
            )
            candidates.append(email)
        
        return candidates
```

### Step 7: Email Verifier

**File: `src/email/verifier.py`**

```python
import asyncio
import smtplib
import dns.resolver
from typing import Dict, List, Optional
from apify import Actor
import httpx

class EmailVerifier:
    """Verifies email addresses using SMTP and third-party services."""
    
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key
        self.verifier_service = 'bounceverify'  # or 'millionverifier', 'hunter'
    
    async def verify_candidates(
        self,
        email_candidates: List[str]
    ) -> Optional[Dict]:
        """
        Verify a list of email candidates and return the best match.
        
        Args:
            email_candidates: List of email addresses to verify
        
        Returns:
            Dict with verified email and metadata, or None
        """
        if not email_candidates:
            return None
        
        # Try to verify each candidate
        for email in email_candidates:
            result = await self.verify_email(email)
            
            if result and result['status'] in ['valid', 'risky']:
                return {
                    'email': email,
                    'status': result['status'],
                    'confidence': result['confidence'],
                    'verifier': result['verifier']
                }
        
        # If no valid email found, return best guess
        return {
            'email': email_candidates[0],
            'status': 'unverified',
            'confidence': 50,
            'verifier': 'pattern_guess'
        }
    
    async def verify_email(self, email: str) -> Optional[Dict]:
        """
        Verify a single email address.
        
        Returns:
            Dict with status, confidence, and verifier info
        """
        # Step 1: Basic format validation
        if not self._is_valid_format(email):
            return {
                'status': 'invalid',
                'confidence': 0,
                'verifier': 'format_check'
            }
        
        # Step 2: DNS MX record check
        domain = email.split('@')[1]
        if not await self._check_mx_records(domain):
            return {
                'status': 'invalid',
                'confidence': 0,
                'verifier': 'mx_check'
            }
        
        # Step 3: SMTP verification (if API key not provided)
        if not self.api_key:
            smtp_result = await self._verify_smtp(email)
            return smtp_result
        
        # Step 4: Use third-party verification service
        api_result = await self._verify_with_api(email)
        return api_result
    
    def _is_valid_format(self, email: str) -> bool:
        """Check if email format is valid."""
        import re
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None
    
    async def _check_mx_records(self, domain: str) -> bool:
        """Check if domain has valid MX records."""
        try:
            mx_records = dns.resolver.resolve(domain, 'MX')
            return len(mx_records) > 0
        except Exception as e:
            Actor.log.debug(f"MX check failed for {domain}: {e}")
            return False
    
    async def _verify_smtp(self, email: str) -> Dict:
        """
        Verify email via SMTP connection.
        
        Note: This is a basic check and may not work for all domains.
        """
        domain = email.split('@')[1]
        
        try:
            # Get MX record
            mx_records = dns.resolver.resolve(domain, 'MX')
            mx_host = str(mx_records[0].exchange)
            
            # Connect to SMTP server
            server = smtplib.SMTP(timeout=10)
            server.set_debuglevel(0)
            server.connect(mx_host)
            server.helo(server.local_hostname)
            server.mail('verify@apify.com')
            code, message = server.rcpt(email)
            server.quit()
            
            if code == 250:
                return {
                    'status': 'valid',
                    'confidence': 80,
                    'verifier': 'smtp'
                }
            else:
                return {
                    'status': 'invalid',
                    'confidence': 20,
                    'verifier': 'smtp'
                }
        
        except Exception as e:
            Actor.log.debug(f"SMTP verification failed for {email}: {e}")
            return {
                'status': 'unknown',
                'confidence': 50,
                'verifier': 'smtp_error'
            }
    
    async def _verify_with_api(self, email: str) -> Dict:
        """Verify email using third-party API (BounceVerify, etc.)."""
        
        if self.verifier_service == 'bounceverify':
            return await self._verify_bounceverify(email)
        elif self.verifier_service == 'millionverifier':
            return await self._verify_millionverifier(email)
        else:
            Actor.log.warning(f"Unknown verifier service: {self.verifier_service}")
            return await self._verify_smtp(email)
    
    async def _verify_bounceverify(self, email: str) -> Dict:
        """Verify email using BounceVerify API."""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    'https://api.bounceverify.com/v1/verify',
                    params={
                        'apikey': self.api_key,
                        'email': email
                    },
                    timeout=30
                )
                
                if response.status_code == 200:
                    data = response.json()
                    
                    status_map = {
                        'valid': 'valid',
                        'invalid': 'invalid',
                        'unknown': 'risky',
                        'catch-all': 'catch_all'
                    }
                    
                    confidence_map = {
                        'valid': 95,
                        'invalid': 5,
                        'unknown': 50,
                        'catch-all': 70
                    }
                    
                    result_status = data.get('status', 'unknown')
                    
                    return {
                        'status': status_map.get(result_status, 'unknown'),
                        'confidence': confidence_map.get(result_status, 50),
                        'verifier': 'bounceverify'
                    }
        
        except Exception as e:
            Actor.log.error(f"BounceVerify API error for {email}: {e}")
        
        # Fallback to SMTP
        return await self._verify_smtp(email)
    
    async def _verify_millionverifier(self, email: str) -> Dict:
        """Verify email using MillionVerifier API."""
        # Similar implementation to BounceVerify
        # Documentation: https://www.millionverifier.com/api
        pass
```

### Step 8: Utility Functions

**File: `src/utils/filters.py`**

```python
from typing import List, Dict

def apply_filters(
    employees: List[Dict],
    job_titles: List[str] = None,
    locations: List[str] = None,
    department: str = 'any',
    decision_makers_only: bool = False
) -> List[Dict]:
    """
    Apply filters to employee list.
    
    Args:
        employees: List of employee dictionaries
        job_titles: List of job titles to filter by
        locations: List of locations to filter by
        department: Department to filter by
        decision_makers_only: Only include decision makers
    
    Returns:
        Filtered list of employees
    """
    filtered = employees
    
    # Filter by job titles
    if job_titles:
        filtered = [
            e for e in filtered
            if e.get('job_title') and any(
                title.lower() in e['job_title'].lower()
                for title in job_titles
            )
        ]
    
    # Filter by locations
    if locations:
        filtered = [
            e for e in filtered
            if e.get('location') and any(
                loc.lower() in e['location'].lower()
                for loc in locations
            )
        ]
    
    # Filter by department
    if department and department != 'any':
        filtered = [
            e for e in filtered
            if e.get('department', '').lower() == department.lower()
        ]
    
    # Filter by decision makers
    if decision_makers_only:
        decision_maker_seniorities = ['Director', 'VP', 'CXO', 'Owner/Partner']
        filtered = [
            e for e in filtered
            if e.get('seniority') in decision_maker_seniorities
        ]
    
    return filtered
```

**File: `src/utils/formatters.py`**

```python
from typing import Dict

def format_output(employee: Dict) -> Dict:
    """
    Format employee data for output.
    
    Ensures all fields are present and properly formatted.
    """
    return {
        'full_name': employee.get('full_name'),
        'first_name': employee.get('first_name'),
        'last_name': employee.get('last_name'),
        'job_title': employee.get('job_title'),
        'company_name': employee.get('company_name'),
        'company_domain': employee.get('company_domain'),
        'linkedin_url': employee.get('linkedin_url'),
        'email': employee.get('email'),
        'email_status': employee.get('email_status', 'not_found'),
        'email_confidence': employee.get('email_confidence', 0),
        'location': employee.get('location'),
        'seniority': employee.get('seniority', 'Unknown'),
        'department': employee.get('department', 'Unknown'),
        'verifier_result': employee.get('verifier_result'),
        'found_via': employee.get('found_via', 'linkedin')
    }
```

### Step 9: Dependencies

**File: `requirements.txt` (Python)**

```txt
apify~=4.0
playwright~=1.40.0
beautifulsoup4~=4.12.0
httpx~=0.25.0
dnspython~=2.4.0
```

**File: `package.json` (JavaScript Alternative)**

```json
{
  "name": "linkedin-company-email-scraper",
  "version": "1.0.0",
  "type": "module",
  "description": "LinkedIn Company Email Scraper Actor",
  "main": "src/main.js",
  "scripts": {
    "start": "node src/main.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "apify": "^3.7.0",
    "playwright": "^1.40.0",
    "cheerio": "^1.0.0",
    "axios": "^1.6.0"
  },
  "author": "Your Name",
  "license": "MIT"
}
```

### Step 10: Dockerfile

**File: `Dockerfile`**

```dockerfile
# Use official Apify Python base image
FROM apify/actor-python-playwright:3.11

# Copy requirements and install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Install Playwright browsers
RUN playwright install chromium

# Copy source code
COPY . ./

# Run the scraper
CMD ["python", "-m", "src.main"]
```

### Step 11: README Documentation

**File: `.actor/README.md`**

```markdown
# LinkedIn Company Employees Scraper + Email Finder

Find LinkedIn company employees and decision makers with verified business emails. No login or cookies required.

## Features

- ✅ **No LinkedIn Account Required** - Uses public data and web search
- ✅ **Email Verification** - SMTP validation and deliverability checks
- ✅ **Bulk Processing** - Process multiple companies in one run
- ✅ **Advanced Filtering** - Filter by title, location, department, seniority
- ✅ **Decision Maker Targeting** - Focus on C-suite, VPs, and Directors
- ✅ **Pay-Per-Result** - Only pay for successfully found emails

## Input

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `companies` | Array | Yes | LinkedIn company URLs or company names |
| `jobTitles` | Array | No | Filter by job titles (e.g., "CEO", "VP of Sales") |
| `locations` | Array | No | Filter by location (e.g., "United States", "London") |
| `department` | String | No | Filter by department (sales, marketing, engineering, etc.) |
| `decisionMakersOnly` | Boolean | No | Only return Director+ levels |
| `maxEmployees` | Integer | No | Maximum employees to return (default: 100) |
| `maxCandidatesPerEmployee` | Integer | No | Email patterns to try per employee (default: 3) |
| `findEmails` | Boolean | No | Find and verify emails (default: true) |
| `verifierApiKey` | String | No | API key for email verification service |

### Example Input

```json
{
  "companies": [
    "https://www.linkedin.com/company/stripe/",
    "Shopify"
  ],
  "jobTitles": ["CEO", "VP of Sales", "Director of Marketing"],
  "locations": ["United States"],
  "department": "sales",
  "decisionMakersOnly": true,
  "maxEmployees": 50,
  "findEmails": true
}
```

## Output

Each employee record includes:

```json
{
  "full_name": "Jane Doe",
  "job_title": "VP of Sales",
  "company_name": "Stripe",
  "company_domain": "stripe.com",
  "linkedin_url": "https://linkedin.com/in/janedoe",
  "email": "jane.doe@stripe.com",
  "email_status": "valid",
  "email_confidence": 95,
  "location": "San Francisco, CA",
  "seniority": "VP",
  "department": "Sales"
}
```

## Pricing

- **With verified email**: $0.020 per lead (~$20 per 1,000)
- **Without email**: $0.008 per lead (~$8 per 1,000)
- **No monthly fees** - Pay only for what you extract

## Use Cases

- **Outbound Prospecting** - Build targeted lead lists from Sales Navigator
- **CRM Enrichment** - Fill missing email addresses in your database
- **Market Research** - Analyze company structures and hiring patterns
- **Competitive Intelligence** - Track competitor team growth

## API Usage

```python
from apify_client import ApifyClient

client = ApifyClient('YOUR_API_TOKEN')

run_input = {
    "companies": ["https://www.linkedin.com/company/stripe/"],
    "decisionMakersOnly": True,
    "maxEmployees": 100
}

run = client.actor("your-username/linkedin-company-email-scraper").call(run_input=run_input)

for item in client.dataset(run["defaultDatasetId"]).iterate_items():
    print(item)
```

## FAQ

**Q: Does this require my LinkedIn credentials?**  
A: No. No cookies, no login, no LinkedIn account needed.

**Q: How accurate are the emails?**  
A: Emails are verified via SMTP and third-party services. Only deliverable emails are returned.

**Q: What if an email can't be found?**  
A: You still get the full profile data. Email fields will be null, and you're not charged the email fee.

**Q: Does this work with Sales Navigator URLs?**  
A: Yes. Both standard and Sales Navigator profile formats are supported.

## Support

For issues, questions, or feature requests, please contact us at:
- Email: support@yourdomain.com
- Discord: [Join our community](https://discord.gg/apify)

## License

MIT
```

---

## Local Development and Testing

### Step 1: Install Dependencies

```bash
# Python
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
playwright install chromium

# JavaScript
npm install
```

### Step 2: Create Test Input

**File: `storage/key_value_stores/default/INPUT.json`**

```json
{
  "companies": [
    "https://www.linkedin.com/company/stripe/"
  ],
  "maxEmployees": 5,
  "findEmails": true
}
```

### Step 3: Run Locally

```bash
# Python
apify run

# Or directly with Python
python -m src.main

# JavaScript
npm start
```

### Step 4: View Output

Results are stored in:
```
storage/
└── datasets/
    └── default/
        ├── 000000001.json
        ├── 000000002.json
        └── ...
```

### Step 5: Debug and Iterate

**Enable debug logging:**

```python
# In src/main.py
from apify import Actor

Actor.log.set_level(Actor.log.LEVEL_DEBUG)
```

**Test specific components:**

```python
# Test email pattern finder
from email.pattern_finder import EmailPatternFinder

finder = EmailPatternFinder()
patterns = await finder.discover_patterns('stripe.com')
print(patterns)
```

**Monitor resource usage:**

```bash
apify info
```

---

## Deployment to Apify Platform

### Step 1: Login to Apify

```bash
apify login
```

### Step 2: Build and Push Actor

```bash
# Build Docker image locally (optional)
apify build

# Push to Apify platform
apify push
```

This command will:
1. Build your Docker image
2. Push it to Apify's container registry
3. Create or update your Actor on the platform

### Step 3: Verify Deployment

1. Go to https://console.apify.com/actors
2. Find your Actor in the list
3. Click "Run" to test it

### Step 4: Configure Actor Settings

In Apify Console, configure:

**Build Settings:**
- **Memory**: 8192 MB (8 GB recommended for browser scraping)
- **Timeout**: 3600 seconds (1 hour)
- **Build tag**: `latest`

**Run Settings:**
- **Default memory**: 8192 MB
- **Default timeout**: 3600 seconds

**Proxy Configuration (Optional):**
- Enable Apify Proxy for better success rates
- Use datacenter proxies or residential proxies

### Step 5: Set Up Secrets

For API keys (email verifier, etc.):

1. Go to Settings > Integrations
2. Add secret: `EMAIL_VERIFIER_API_KEY`
3. Reference in input schema as `isSecret: true`

### Step 6: Enable Webhooks (Optional)

Set up webhooks for run events:
- Run succeeded
- Run failed
- Run timed out

---

## Publishing to Apify Store

### Step 1: Prepare for Publication

**Requirements Checklist:**

- [ ] Complete README.md with clear documentation
- [ ] Input schema with user-friendly descriptions
- [ ] Output schema defining result structure
- [ ] Example input and output
- [ ] Actor icon (PNG, 200x200px minimum)
- [ ] Category tags (LEAD_GENERATION, BUSINESS)
- [ ] Tested on multiple inputs
- [ ] Error handling implemented
- [ ] Proper logging and status messages

### Step 2: Create Actor Icon

Create a 200x200px PNG icon representing your Actor:
- Simple, recognizable design
- Relevant to LinkedIn/email scraping
- Professional appearance

Upload to:
```
.actor/
└── actor.png
```

### Step 3: Set Actor Metadata

Update `.actor/actor.json`:

```json
{
  "name": "linkedin-company-email-scraper",
  "title": "LinkedIn Company Employees Scraper + Email Finder",
  "description": "Find LinkedIn company employees and decision makers with verified business emails. No login required.",
  "version": "1.0.0",
  "categories": ["LEAD_GENERATION", "BUSINESS", "SOCIAL_MEDIA"],
  "isPublic": true,
  "seo": {
    "title": "LinkedIn Email Finder - Company Employees Scraper",
    "description": "Extract LinkedIn company employees with verified business emails. Filter by title, location, and seniority. No login required. Pay per result."
  }
}
```

### Step 4: Submit for Publication

```bash
# Make Actor public
apify push --public
```

Or in Apify Console:
1. Go to Actor settings
2. Set visibility to "Public"
3. Click "Publish to Store"
4. Fill out publication form:
   - **Title**: LinkedIn Company Employees Scraper + Email Finder
   - **Short Description**: (50 chars) Find emails for LinkedIn company employees
   - **Full Description**: (from README.md)
   - **Categories**: Lead Generation, Business, Social Media
   - **Tags**: linkedin, email-finder, lead-generation, b2b

### Step 5: Set Up SEO

**Title**: "LinkedIn Email Finder - Company Employees Scraper | No Login"

**Meta Description**: "Extract verified business emails from LinkedIn company employees. Filter by title, location, seniority. $20/1000 emails. No LinkedIn account needed."

**Keywords**:
- linkedin email finder
- company employee scraper
- business email extractor
- b2b lead generation
- decision maker contacts

### Step 6: Create Example Runs

Create 3-5 example runs demonstrating:
1. Basic company scraping
2. Decision maker targeting
3. Department filtering
4. Bulk company processing
5. Email verification

### Step 7: Monitor Store Performance

After publication, monitor:
- **Usage statistics** - How many people are using your Actor
- **Revenue** (if monetized) - Earnings from Actor usage
- **Ratings and reviews** - User feedback
- **Run success rate** - Percentage of successful runs

---

## Monetization and Pricing

### Pricing Models

**1. Pay-Per-Result (Recommended)**

Charge based on actual results delivered:

```json
{
  "pricingModel": "PER_RESULT",
  "pricePerResult": 0.020,
  "currency": "USD"
}
```

Example pricing:
- With email: $0.020 per lead ($20 per 1,000)
- Without email: $0.008 per lead ($8 per 1,000)

**2. Compute Units**

Charge based on Actor runtime:

```json
{
  "pricingModel": "COMPUTE_UNITS",
  "pricePerComputeUnit": 0.25,
  "currency": "USD"
}
```

**3. Flat Rate**

Fixed price per run:

```json
{
  "pricingModel": "FLAT",
  "pricePerRun": 5.00,
  "currency": "USD"
}
```

### Configure Pay-Per-Event Charging

**In your code:**

```python
from apify import Actor

# Charge for each verified email found
await Actor.add_charge({
    'type': 'email_found',
    'count': 1,
    'unit_price': 0.020
})
```

**Event types to charge for:**
- `email_found_verified` - $0.020
- `email_found_unverified` - $0.008
- `profile_scraped` - $0.005

### Set Pricing Tiers

```json
{
  "pricingModel": "TIERED",
  "tiers": [
    {
      "minResults": 1,
      "maxResults": 100,
      "pricePerResult": 0.025
    },
    {
      "minResults": 101,
      "maxResults": 1000,
      "pricePerResult": 0.020
    },
    {
      "minResults": 1001,
      "maxResults": null,
      "pricePerResult": 0.015
    }
  ]
}
```

### Revenue Sharing

Apify takes:
- **20%** commission on paid Actor usage
- **80%** goes to you (the developer)

Example:
- User pays $100 for Actor usage
- You receive $80
- Apify keeps $20

### Payment Thresholds

- **Minimum payout**: $20
- **Payment frequency**: Monthly
- **Payment methods**: PayPal, bank transfer, Payoneer

---

## Maintenance and Best Practices

### Regular Maintenance Tasks

**Weekly:**
- [ ] Monitor error rates and failed runs
- [ ] Check for LinkedIn DOM changes
- [ ] Review user feedback and issues
- [ ] Update documentation if needed

**Monthly:**
- [ ] Analyze usage patterns
- [ ] Optimize performance bottlenecks
- [ ] Update dependencies
- [ ] Review and adjust pricing

**Quarterly:**
- [ ] Major feature updates
- [ ] Security audit
- [ ] Compatibility testing
- [ ] Marketing and promotion

### Error Handling Best Practices

```python
try:
    employees = await linkedin_scraper.get_company_employees(company_url)
except Exception as e:
    Actor.log.error(f"Failed to scrape {company_url}: {str(e)}")
    
    # Send error to dataset for debugging
    await Actor.push_data({
        'error': str(e),
        'company': company_url,
        'timestamp': datetime.now().isoformat()
    })
    
    # Continue with next company
    continue
```

### Logging Standards

```python
# Info: Normal operations
Actor.log.info(f"Processing company: {company_name}")

# Warning: Non-critical issues
Actor.log.warning(f"Email verification failed, using pattern guess")

# Error: Critical failures
Actor.log.error(f"Failed to connect to LinkedIn: {error}")

# Debug: Detailed debugging info
Actor.log.debug(f"Found {len(patterns)} email patterns")
```

### Status Messages

Keep users informed:

```python
await Actor.set_status_message(
    f"Processed {processed}/{total} employees - {found_emails} emails found"
)
```

### Rate Limiting

Respect website rate limits:

```python
import asyncio

# Add delays between requests
await asyncio.sleep(2)  # 2 second delay

# Use exponential backoff for retries
for attempt in range(3):
    try:
        result = await scrape_page(url)
        break
    except Exception as e:
        if attempt < 2:
            await asyncio.sleep(2 ** attempt)
        else:
            raise
```

### LinkedIn Scraping Considerations

**Legal Compliance:**
- Only scrape publicly available data
- Respect LinkedIn's Terms of Service
- Include privacy policy in README
- Allow users to opt-out

**Technical Best Practices:**
- Use headless browsers for reliability
- Rotate user agents
- Implement request throttling
- Handle CAPTCHAs gracefully

**Data Privacy:**
- Don't store personal data longer than necessary
- Encrypt sensitive information
- Provide data deletion options
- Comply with GDPR/CCPA

### Performance Optimization

**1. Parallel Processing:**

```python
import asyncio

# Process multiple companies in parallel
tasks = [
    process_company(company)
    for company in companies
]
results = await asyncio.gather(*tasks)
```

**2. Caching:**

```python
from apify import Actor

# Cache company domain lookups
cache_key = f"domain_{company_name}"
cached_domain = await Actor.get_value(cache_key)

if not cached_domain:
    cached_domain = await lookup_domain(company_name)
    await Actor.set_value(cache_key, cached_domain)
```

**3. Incremental Output:**

```python
# Push data as it's scraped, not at the end
await Actor.push_data(employee_data)
```

### Monitoring and Alerts

Set up monitoring for:
- **Success rate** - % of successful runs
- **Average runtime** - Duration per run
- **Error rate** - % of failed runs
- **Email find rate** - % of employees with emails found

Configure alerts:
```json
{
  "alerts": [
    {
      "type": "success_rate",
      "threshold": 80,
      "action": "email"
    },
    {
      "type": "error_rate",
      "threshold": 20,
      "action": "slack"
    }
  ]
}
```

### Documentation Updates

Keep README.md updated with:
- Recent changes and fixes
- New features
- Known limitations
- FAQ updates
- Pricing changes

### User Support

Provide support through:
- **Discord community** - Quick questions
- **GitHub Issues** - Bug reports and feature requests
- **Email support** - Direct support
- **Documentation** - Comprehensive guides

### Handling Breaking Changes

When LinkedIn changes their structure:

1. **Monitor** - Set up alerts for DOM changes
2. **Quick Fix** - Deploy hotfix within 24 hours
3. **Notify Users** - Update Actor status and docs
4. **Test Thoroughly** - Validate on multiple companies
5. **Version Control** - Use semantic versioning (1.0.0 → 1.0.1)

---

## Appendix

### Useful Resources

**Apify Documentation:**
- Main Docs: https://docs.apify.com
- SDK Reference: https://docs.apify.com/sdk
- API Reference: https://docs.apify.com/api
- Academy: https://docs.apify.com/academy

**Community:**
- Discord: https://discord.gg/apify
- Forum: https://community.apify.com
- GitHub: https://github.com/apify

**Email Verification Services:**
- BounceVerify: https://www.bounceverify.com
- MillionVerifier: https://www.millionverifier.com
- Hunter.io: https://hunter.io

**LinkedIn Resources:**
- Terms of Service: https://www.linkedin.com/legal/user-agreement
- Privacy Policy: https://www.linkedin.com/legal/privacy-policy

### CLI Commands Reference

```bash
# Actor management
apify create [actorName]      # Create new Actor
apify init                     # Initialize Actor in current directory
apify run                      # Run Actor locally
apify push                     # Deploy to Apify platform
apify call [actorId]           # Run Actor on platform

# Information
apify info                     # Show Actor info
apify login                    # Login to Apify
apify logout                   # Logout from Apify

# Development
apify build                    # Build Docker image locally
apify validate                 # Validate Actor configuration

# Version management
apify upgrade                  # Upgrade CLI to latest version
```

### Troubleshooting Common Issues

**Issue: Actor fails with "Out of memory"**
- Solution: Increase memory allocation to 8GB+
- In actor.json: `"memoryMbytes": 8192`

**Issue: LinkedIn blocks requests**
- Solution: Enable Apify Proxy
- Use residential proxies for better success rate
- Add delays between requests

**Issue: Emails not verifying**
- Solution: Check API key configuration
- Ensure email verifier service is accessible
- Fallback to SMTP verification

**Issue: Actor times out**
- Solution: Reduce `maxEmployees` input
- Implement pagination
- Process companies in batches

**Issue: Cannot find company**
- Solution: Improve company name resolution
- Try LinkedIn company search
- Accept both URLs and names as input

---

## Conclusion

You now have a complete guide to building and publishing a LinkedIn Company Email Scraper on Apify. This guide covered:

✅ **Setup** - Installing CLI and creating Actor project  
✅ **Development** - Building scraper with email verification  
✅ **Testing** - Local development and debugging  
✅ **Deployment** - Pushing to Apify platform  
✅ **Publishing** - Listing on Apify Store  
✅ **Monetization** - Pricing strategies and revenue sharing  
✅ **Maintenance** - Best practices for long-term success  

### Next Steps

1. **Start Building** - Follow this guide to create your Actor
2. **Test Thoroughly** - Validate on multiple companies and scenarios
3. **Deploy** - Push to Apify platform
4. **Gather Feedback** - Get user input before Store publication
5. **Publish** - List on Apify Store and start earning
6. **Iterate** - Continuously improve based on usage patterns

### Support

For questions or issues with this guide:
- Review Apify documentation: https://docs.apify.com
- Join Discord community: https://discord.gg/apify
- Contact Apify support: support@apify.com

**Good luck with your Actor!** 🚀
