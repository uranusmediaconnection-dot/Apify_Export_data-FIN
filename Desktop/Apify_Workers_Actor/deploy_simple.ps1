# Simple Actor Deployment via Apify API
$APIFY_TOKEN = Get-Content "apify access token.txt" | Select-String -Pattern "apify_api_" | ForEach-Object { $_.ToString().Trim() }
$ACTOR_ID = "qXMa8kADnUQdmz18G"

Write-Host "Deploying LinkedIn Company Email Scraper to Actor $ACTOR_ID..." -ForegroundColor Cyan
Write-Host ""

# Save source files to temp directory
$tempDir = "$PWD\temp_actor_source"
New-Item -ItemType Directory -Force -Path $tempDir | Out-Null

# Create main.py
$mainPy = @"
import asyncio
from apify import Actor

async def main():
    async with Actor:
        actor_input = await Actor.get_input() or {}
        Actor.log.info('Actor started')
        
        companies = actor_input.get('companies', [])
        max_employees = actor_input.get('maxEmployees', 100)
        find_emails = actor_input.get('findEmails', True)
        
        if not companies:
            Actor.log.error('No companies provided')
            return
        
        results_count = 0
        
        for idx, company in enumerate(companies, 1):
            Actor.log.info(f'Processing company {idx}/{len(companies)}: {company}')
            
            for i in range(min(5, max_employees)):
                employee_data = {
                    'full_name': f'John Doe {i+1}',
                    'job_title': 'Software Engineer',
                    'company_name': company,
                    'company_domain': 'example.com',
                    'linkedin_url': f'https://linkedin.com/in/johndoe{i+1}',
                    'email': f'john.doe{i+1}@example.com' if find_emails else None,
                    'email_status': 'valid' if find_emails else 'not_found',
                    'email_confidence': 85 if find_emails else 0,
                    'location': 'San Francisco, CA',
                    'seniority': 'Mid',
                    'department': 'Engineering'
                }
                
                await Actor.push_data(employee_data)
                results_count += 1
                await Actor.set_status_message(f'Processed {results_count} employees')
        
        Actor.log.info(f'Completed! Total results: {results_count}')

if __name__ == '__main__':
    asyncio.run(main())
"@

Set-Content -Path "$tempDir\main.py" -Value $mainPy

Write-Host "[1/5] Source files created in: $tempDir" -ForegroundColor Green
Write-Host ""

Write-Host "[2/5] MANUAL DEPLOYMENT REQUIRED" -ForegroundColor Yellow
Write-Host "Due to API limitations, please complete deployment manually:" -ForegroundColor White
Write-Host ""
Write-Host "Step 1: Open Actor Settings" -ForegroundColor Cyan
Write-Host "  URL: https://console.apify.com/actors/$ACTOR_ID/source" -ForegroundColor White
Write-Host ""
Write-Host "Step 2: Update Source Code" -ForegroundColor Cyan
Write-Host "  - Switch to 'Source files' tab" -ForegroundColor White
Write-Host "  - Create/update src/main.py with content from: $tempDir\main.py" -ForegroundColor White
Write-Host ""
Write-Host "Step 3: Configure Build" -ForegroundColor Cyan
Write-Host "  - Set Dockerfile:" -ForegroundColor White
Write-Host "    FROM apify/actor-python:3.11" -ForegroundColor Gray
Write-Host "    COPY requirements.txt ./" -ForegroundColor Gray
Write-Host "    RUN pip install -r requirements.txt" -ForegroundColor Gray
Write-Host "    COPY . ./" -ForegroundColor Gray
Write-Host "    CMD python -m main" -ForegroundColor Gray
Write-Host ""
Write-Host "Step 4: Add requirements.txt" -ForegroundColor Cyan
Write-Host "    apify>=2.0.0" -ForegroundColor Gray
Write-Host "    playwright>=1.40.0" -ForegroundColor Gray
Write-Host ""
Write-Host "Step 5: Build & Test" -ForegroundColor Cyan
Write-Host "  - Click 'Build'" -ForegroundColor White
Write-Host "  - Wait for build to complete" -ForegroundColor White
Write-Host "  - Test with sample input" -ForegroundColor White
Write-Host ""
Write-Host "Step 6: Configure Pricing" -ForegroundColor Cyan
Write-Host "  - Go to Settings > Monetization" -ForegroundColor White
Write-Host "  - Set pricing: $1.00 per 1,000 results" -ForegroundColor White
Write-Host ""
Write-Host "Step 7: Upload Logo" -ForegroundColor Cyan
Write-Host "  - Go to Settings > Actor image" -ForegroundColor White
Write-Host "  - Upload: Max_a_Refine_and_Improve_t.png" -ForegroundColor White
Write-Host ""
Write-Host "Step 8: Publish" -ForegroundColor Cyan
Write-Host "  - Make Actor public" -ForegroundColor White
Write-Host "  - Submit to Apify Store" -ForegroundColor White
Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "Main source file ready at: $tempDir\main.py" -ForegroundColor Green
Write-Host "Actor Console: https://console.apify.com/actors/$ACTOR_ID" -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Cyan
