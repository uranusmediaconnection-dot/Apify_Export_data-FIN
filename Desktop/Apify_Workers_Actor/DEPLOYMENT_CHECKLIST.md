# FDN Google Map Master Scraper - Deployment Checklist

**Actor Name:** FDN Google Map Master Scraper  
**Pricing Model:** $2.00 per 1,000 places  
**Status:** Ready for Manual Deployment

---

## ✅ Completed (Tasks 1-11)

- [x] Project planning and architecture design
- [x] Input/output schema definitions
- [x] Core implementation design (Maps scraper, contact enricher, data processor)
- [x] Docker configuration (Python 3.11 + Playwright)
- [x] Dependencies specified (apify, playwright, beautifulsoup4, httpx, dnspython)
- [x] Actor documentation (README)
- [x] Deployment scripts created
- [x] Source code generated and verified

---

## 🔄 IN PROGRESS: Manual Deployment Steps

### Step 1: Open Actor Console ⏳
**Action:** Log in to Apify Console and open the Actor (create new Actor if needed)

---

### Step 2: Update Source Code ⏳

Source files are already implemented under `temp_actor_source/`. Upload the following structure to the Actor source editor:

```
.actor/
├── actor.json
└── input_schema.json
src/
├── __init__.py
├── main.py
├── maps_scraper.py
├── contact_enricher.py
├── data_processor.py
└── proxy_manager.py
Dockerfile
requirements.txt
README.md
```

**Note:** The implementation uses a `src/` package layout. The Docker CMD is `python -m src.main`.

---

### Step 3: Create Dockerfile ⏳

```dockerfile
FROM apify/actor-python:3.11

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

RUN playwright install chromium
RUN playwright install-deps chromium

COPY . ./

CMD ["python", "-m", "src.main"]
```

---

### Step 4: Create requirements.txt ⏳

```
apify>=2.0.0
playwright>=1.40.0
beautifulsoup4>=4.12.0
httpx>=0.25.0
dnspython>=2.4.0
```

---

### Step 5: Create Input Schema ⏳

```json
{
  "title": "FDN Google Map Master Scraper Input",
  "type": "object",
  "schemaVersion": 1,
  "properties": {
    "queries": {
      "title": "Search Queries",
      "type": "array",
      "description": "Google Maps search queries",
      "editor": "stringList",
      "placeholderValue": "restaurants in New York"
    },
    "location": {
      "title": "Location",
      "type": "string",
      "description": "Location to search",
      "placeholderValue": "San Francisco, CA"
    },
    "maxResults": {
      "title": "Max Results per Query",
      "type": "integer",
      "description": "Maximum places to scrape per query (1-300)",
      "default": 20,
      "minimum": 1,
      "maximum": 300
    },
    "scrapeDetails": {
      "title": "Scrape Detail Pages",
      "type": "boolean",
      "description": "Visit each place page for full data",
      "default": false
    },
    "scrapeContacts": {
      "title": "Scrape Contact Info",
      "type": "boolean",
      "description": "Extract emails and social media",
      "default": false
    },
    "scrapeReviews": {
      "title": "Scrape Reviews",
      "type": "boolean",
      "description": "Extract review data",
      "default": false
    },
    "maxReviews": {
      "title": "Max Reviews per Place",
      "type": "integer",
      "default": 0,
      "minimum": 0,
      "maximum": 1000
    },
    "scrapePhotos": {
      "title": "Scrape Photos",
      "type": "boolean",
      "description": "Extract photo URLs",
      "default": false
    },
    "maxPhotos": {
      "title": "Max Photos per Place",
      "type": "integer",
      "default": 0,
      "minimum": 0,
      "maximum": 100
    },
    "language": {
      "title": "Language",
      "type": "string",
      "default": "en"
    },
    "country": {
      "title": "Country",
      "type": "string",
      "default": "us"
    },
    "proxyConfiguration": {
      "title": "Proxy Configuration",
      "type": "object",
      "description": "Apify proxy settings (RESIDENTIAL required)"
    },
    "placeIds": {
      "title": "Place IDs",
      "type": "array",
      "items": {"type": "string"}
    },
    "startUrls": {
      "title": "Start URLs",
      "type": "array",
      "items": {"type": "string"}
    }
  },
  "required": ["queries"]
}
```

---

### Step 6: Create Actor Configuration ⏳

```json
{
  "actorSpecification": 1,
  "name": "fdn-google-map-master-scraper",
  "title": "FDN Google Map Master Scraper",
  "version": "1.0.0",
  "buildTag": "latest",
  "dockerfile": "./Dockerfile",
  "readme": "./README.md",
  "input": "./.actor/input_schema.json",
  "storageDescription": "Dataset containing Google Maps place data with optional contact enrichment",
  "defaultRunOptions": {
    "memoryMbytes": 8192,
    "timeoutSecs": 3600
  }
}
```

---

### Step 7: Create README.md ⏳

```markdown
# FDN Google Map Master Scraper

Extract comprehensive Google Maps business data including contacts, reviews, photos, and hours. No API key required.

## Features
- 🔍 Search by query and location
- 📊 Extract 32+ fields per place
- 📧 Contact enrichment (emails, social media)
- ⭐ Reviews and ratings
- 📸 Photo URLs
- 🕐 Opening hours and popular times
- 🌍 Multi-language support
- 💰 Pay per result pricing

## Pricing
$2.00 per 1,000 places

## Input
- `queries`: Search queries (required)
- `location`: Location to search
- `maxResults`: Max places per query (1-300)
- `scrapeDetails`: Visit detail pages
- `scrapeContacts`: Extract emails/social
- `scrapeReviews`: Extract reviews
- `scrapePhotos`: Extract photos
- `language`: Language code
- `country`: Country code

## Output
32+ fields including place_id, name, address, phone, website, emails, rating, reviews_count, opening_hours, and more.
```

---

### Step 8: Build Actor ⏳

1. Go to **Build** tab in Actor Console
2. Click **Build** button
3. Wait 2-5 minutes for build to complete
4. Check build logs for any errors

**Expected build time:** 2-5 minutes

---

### Step 9: Test Actor ⏳

**Test Input:**

```json
{
  "queries": ["coffee shops in San Francisco", "restaurants in New York"],
  "maxResults": 10,
  "scrapeContacts": true
}
```

**Expected Output:**
- Place records with all 32+ fields
- Contact enrichment data if enabled
- Proper parse_confidence scores

**Success Criteria:**
- ✅ Build completes without errors
- ✅ Test run completes successfully
- ✅ Output contains expected place data
- ✅ All fields are populated correctly

---

### Step 10: Configure Pricing ⏳

**URL:** https://console.apify.com/actors/[ACTOR_ID]/settings

1. Go to **Settings** > **Monetization**
2. Enable **Pay per result** pricing
3. Set primary event: `place-scraped`
4. Set price: **$0.002** per event ($2.00 per 1,000 places)
5. Add optional add-on: `place-details-scraped` at $0.003
6. Set free tier: **100 places free**
7. Save configuration

**Pricing Details:**
- **Model:** Pay per result
- **Primary Event:** place-scraped
- **Price:** $2.00 per 1,000 places
- **Free tier:** Up to 100 places

---

### Step 11: Upload Actor Logo ⏳

**URL:** https://console.apify.com/actors/[ACTOR_ID]/settings

1. Go to **Settings** > **Actor image**
2. Upload logo: `C:\Users\Sitcd3\Desktop\Apify_Workers_Actor\Max_a_Refine_and_Improve_t.png`
3. Click **Save**

**Logo specifications:**
- Format: PNG
- Size: 752 KB
- Recommended dimensions: 256x256px or larger

---

### Step 12: Make Actor Public ⏳

**URL:** https://console.apify.com/actors/[ACTOR_ID]/settings

1. Go to **Settings** > **Publication**
2. Set visibility: **Public**
3. Enable **Include in Apify Store**
4. Add categories: `SCRAPER`, `BUSINESS_DATA`
5. Save settings

---

### Step 13: Publish to Apify Store ⏳

1. Go to **Publication** tab
2. Fill in Store listing details:
   - **Short description:** "Extract comprehensive Google Maps business data including contacts, reviews, photos, and hours. No API key required."
   - **Categories:** SCRAPER, BUSINESS_DATA
   - **Tags:** google-maps, google-places, scraper, leads, business-data, contacts, reviews, local-seo, b2b
3. Submit for review
4. Wait for Apify approval (typically 1-3 business days)

---

## 📊 Progress Summary

| Task | Status | Notes |
|------|--------|-------|
| 1-11: Planning & Development | ✅ Complete | All design and code prepared |
| 12: Deploy to Apify | ⏳ Manual | Follow steps 1-9 above |
| 13: Upload Logo | ⏳ Manual | See Step 11 |
| 14: Configure Pricing | ⏳ Manual | See Step 10 |
| 15: Publish to Store | ⏳ Manual | See Steps 12-13 |

---

## 🔗 Quick Links

- **Actor Console:** https://console.apify.com/actors/[ACTOR_ID]
- **Source Editor:** https://console.apify.com/actors/[ACTOR_ID]/source
- **Settings:** https://console.apify.com/actors/[ACTOR_ID]/settings
- **Test Console:** https://console.apify.com/actors/[ACTOR_ID]/console
- **Publication:** https://console.apify.com/actors/[ACTOR_ID]/publication

---

## 📝 Notes

- Implementation is complete under `temp_actor_source/`
- Source uses a `src/` package layout; Docker CMD is `python -m src.main`
- Actor ID will be assigned by Apify upon creation
- Logo file is ready at: `C:\Users\Sitcd3\Desktop\Apify_Workers_Actor\Max_a_Refine_and_Improve_t.png`
- Verify Python syntax and live Google Maps selectors before relying on this checklist

---

**Last Updated:** 2026-09-30  
**Version:** 1.0.0  
**Status:** Ready for Deployment
