# LinkedIn Company Email Scraper - Apify Actor

> Extract employee data from LinkedIn companies with verified email addresses

[![Actor ID](https://img.shields.io/badge/Actor-qXMa8kADnUQdmz18G-blue)](https://console.apify.com/actors/qXMa8kADnUQdmz18G)
[![Status](https://img.shields.io/badge/Status-In_Development-yellow)]()
[![Pricing](https://img.shields.io/badge/Pricing-$1.00/1K_results-green)]()

## 📋 Project Overview

This repository contains the complete implementation plan, documentation, and deployment scripts for building a LinkedIn Company Email Scraper Actor on the Apify platform.

**Actor ID:** `qXMa8kADnUQdmz18G`  
**Pricing Model:** $1.00 per 1,000 results  
**Status:** 73% Complete (11/15 tasks)

## 🎯 Features

- 🔍 **Employee Scraping** - Extract employees from LinkedIn companies
- 📧 **Email Discovery** - Find email addresses using pattern matching
- ✅ **Email Verification** - Verify emails via SMTP and API services
- 🎯 **Advanced Filtering** - Filter by job title, location, department, seniority
- 📊 **Structured Output** - Export data in JSON format for CRM integration
- 💰 **Pay-per-result Pricing** - Cost-effective pricing model

## 📂 Repository Structure

```
Apify_Workers_Actor/
├── TODO.md                          # Complete TODO list (590 lines)
├── PROJECT_SUMMARY.md               # Project overview (255 lines)
├── DEPLOYMENT_CHECKLIST.md          # Step-by-step deployment guide (420 lines)
├── deploy_simple.ps1                # Simple deployment helper script
├── deploy_actor.ps1                 # Advanced deployment script
├── LinkedIn_Company_Email_Scraper_Guide.md  # Implementation guide (64KB)
├── Max_a_Refine_and_Improve_t.png  # Actor logo (752KB)
└── .gitignore                       # Git ignore configuration
```

## 🚀 Getting Started

### Prerequisites

- Apify account with API access
- Actor ID: `qXMa8kADnUQdmz18G`
- API Token (stored securely)

### Deployment Steps

1. **Read the TODO List**
   ```bash
   cat TODO.md
   ```

2. **Follow Deployment Checklist**
   - Open `DEPLOYMENT_CHECKLIST.md`
   - Follow Steps 1-13 sequentially
   - Each step includes precise instructions and code

3. **Deploy to Apify Platform**
   - Navigate to [Actor Console](https://console.apify.com/actors/qXMa8kADnUQdmz18G/source)
   - Upload source files
   - Build and test

## 📄 Documentation

### Core Documents

| Document | Description | Size |
|----------|-------------|------|
| **TODO.md** | Complete task list with 15 tasks (11 done, 4 pending) | 590 lines |
| **PROJECT_SUMMARY.md** | Project overview, progress, and next steps | 255 lines |
| **DEPLOYMENT_CHECKLIST.md** | Step-by-step deployment guide | 420 lines |
| **LinkedIn_Company_Email_Scraper_Guide.md** | Full implementation guide | 64KB |

### Key Sections

- ✅ **Completed Tasks (1-11)** - All planning and development complete
- ⏳ **Pending Tasks (12-15)** - Manual deployment required
- 📊 **Progress Tracking** - 73% complete (11/15 tasks)
- 🔑 **Critical Information** - API tokens, Actor ID, pricing details

## 💻 Input Schema

```json
{
  "companies": ["https://www.linkedin.com/company/example/", "Company Name"],
  "maxEmployees": 100,
  "findEmails": true,
  "jobTitles": ["Software Engineer", "DevOps Engineer"],
  "locations": ["San Francisco, CA", "Remote"],
  "department": "engineering",
  "decisionMakersOnly": false
}
```

## 📤 Output Format

```json
{
  "full_name": "John Doe",
  "job_title": "Software Engineer",
  "company_name": "Example Corp",
  "company_domain": "example.com",
  "linkedin_url": "https://linkedin.com/in/johndoe",
  "email": "john.doe@example.com",
  "email_status": "valid",
  "email_confidence": 85,
  "location": "San Francisco, CA",
  "seniority": "Mid",
  "department": "Engineering"
}
```

## 💰 Pricing

- **Model:** Pay per result
- **Rate:** $1.00 per 1,000 results
- **Per Result:** $0.001
- **Free Tier:** Up to 2,500 results (optional)

Matches pricing from [LinkedIn Jobs Scraper](https://apify.com/curious_coder/linkedin-jobs-scraper/pricing)

## 📊 Project Progress

```
✅ Tasks 1-11:  COMPLETE (Planning & Development)
⏳ Task 12:     Manual deployment required
⏳ Task 13:     Logo upload required
⏳ Task 14:     Pricing configuration required  
⏳ Task 15:     Store publication required

Overall: 73% Complete (11/15 tasks)
```

### Completed Tasks

- [x] Environment Setup
- [x] Project Structure
- [x] Configuration Files
- [x] LinkedIn Scraper Module Design
- [x] Email Pattern Discovery Design
- [x] Email Verification Design
- [x] Filter and Format Utilities Design
- [x] Main Actor Entry Point
- [x] Dependencies and Docker Configuration
- [x] Documentation
- [x] Local Testing Preparation

### Pending Tasks

- [ ] **Task 12:** Deploy to Apify Platform (Manual - See DEPLOYMENT_CHECKLIST.md)
- [ ] **Task 13:** Upload Logo and Assets
- [ ] **Task 14:** Configure Monetization and Pricing
- [ ] **Task 15:** Publish to Apify Store

## 🔗 Quick Links

- [Actor Console](https://console.apify.com/actors/qXMa8kADnUQdmz18G)
- [Source Editor](https://console.apify.com/actors/qXMa8kADnUQdmz18G/source)
- [Settings](https://console.apify.com/actors/qXMa8kADnUQdmz18G/settings)
- [Test Console](https://console.apify.com/actors/qXMa8kADnUQdmz18G/console)

## 🛠️ Technology Stack

- **Language:** Python 3.11
- **Browser Automation:** Playwright + Chromium
- **Email Verification:** SMTP + API (BounceVerify/MillionVerifier)
- **Framework:** Apify SDK
- **Libraries:** beautifulsoup4, httpx, dnspython

## ⏱️ Time to Completion

- **Hands-on Time:** 33-47 minutes
- **Build Time:** 2-5 minutes
- **Review Time:** 1-3 business days (Apify approval)
- **Total:** 1-3 business days

## 📝 Development Workflow

1. **Read Documentation** - Start with TODO.md
2. **Follow Checklist** - DEPLOYMENT_CHECKLIST.md has precise steps
3. **Deploy Actor** - Upload source code to Apify
4. **Build & Test** - Verify Actor works correctly
5. **Configure Pricing** - Set $1.00/1000 results
6. **Upload Logo** - Add Actor branding
7. **Publish** - Submit to Apify Store

## 🤝 Contributing

This is a private development project for Apify Actor deployment. Contributions are not currently accepted.

## 📜 License

Proprietary - All rights reserved

## 📞 Support

For questions or issues:
- **Apify Docs:** https://docs.apify.com/
- **Discord:** https://discord.com/invite/jyEM2PRvMU
- **Forum:** https://forum.apify.com/

---

**Last Updated:** 2026-09-30  
**Version:** 1.0.0  
**Status:** Ready for Deployment

---

Made with ❤️ for Apify Platform
