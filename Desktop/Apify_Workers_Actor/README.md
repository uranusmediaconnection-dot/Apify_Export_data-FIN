# FDN Google Map Master Scraper - Apify Actor

> Extract comprehensive Google Maps business data including contacts, reviews, photos, and hours. No API key required.

[![Status](https://img.shields.io/badge/Status-Implementation_In_Progress-yellow)]()
[![Pricing](https://img.shields.io/badge/Pricing-$2.00/1K_places-green)]()

## 📋 Project Overview

This repository contains the implementation and deployment materials for the **FDN Google Map Master Scraper** Actor on the Apify platform.

**Actor Name:** FDN Google Map Master Scraper  
**Pricing Model:** Pay-per-Event at $2.00 per 1,000 places  
**Status:** Implementation complete, verification and deployment pending

## 🎯 Features

- 🔍 **Google Maps Search** - Search by query and location
- 📊 **32+ Output Fields** - Comprehensive place data
- 📞 **Contact Enrichment** - Extract emails and social links from websites
- ⭐ **Reviews & Ratings** - Optional review extraction
- 🖼️ **Photo URLs** - Optional photo extraction
- 🕒 **Opening Hours** - Business hours and popular times
- 🌍 **Multi-language Support** - Language and country localization
- 💰 **Pay-per-Event Pricing** - Pay only for successful extractions

## 📂 Repository Structure

```
Apify_Workers_Actor/
├── temp_actor_source/
│   ├── src/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── maps_scraper.py
│   │   ├── contact_enricher.py
│   │   ├── data_processor.py
│   │   └── proxy_manager.py
│   ├── .actor/
│   │   ├── actor.json
│   │   └── input_schema.json
│   ├── Dockerfile
│   ├── requirements.txt
│   └── README.md
├── README.md
├── TODO.md
├── PROJECT_SUMMARY.md
├── DEPLOYMENT_CHECKLIST.md
├── FDN_Google_Map_Master_Scraper_Guide.md
└── Max_a_Refine_and_Improve_t.png
```

## 💻 Input Schema

```json
{
  "queries": ["coffee shops in San Francisco", "restaurants in New York"],
  "location": "San Francisco, CA",
  "maxResults": 50,
  "scrapeDetails": true,
  "scrapeContacts": true,
  "scrapeReviews": false,
  "scrapePhotos": false,
  "maxReviews": 100,
  "maxPhotos": 10,
  "language": "en",
  "country": "us"
}
```

## 📤 Output Format

```json
{
  "place_id": "ChIJ...",
  "name": "Example Business",
  "category": "Restaurant",
  "address": "123 Main St, City, ST 12345",
  "latitude": 37.7749,
  "longitude": -122.4194,
  "phone": "+1-555-0100",
  "website": "https://example.com",
  "emails": ["info@example.com"],
  "social_links": {"facebook": "https://facebook.com/example"},
  "rating": 4.5,
  "reviews_count": 123,
  "price_level": 2,
  "opening_hours": ["Mon: 8:00 AM - 6:00 PM"],
  "parse_confidence": 0.92,
  "query": "coffee shops in San Francisco",
  "rank": 1,
  "scraped_at": "2026-09-30T00:00:00Z"
}
```

## 💰 Pricing

- **Model:** Pay per result
- **Rate:** $2.00 per 1,000 places
- **Per Place:** $0.002
- **Free Tier:** Up to 100 places free

## 🛠️ Technology Stack

- **Language:** Python 3.11
- **Browser Automation:** Playwright + Chromium
- **Framework:** Apify SDK
- **Proxy:** Apify RESIDENTIAL proxy group
- **Libraries:** beautifulsoup4, httpx, dnspython

## 📝 Development Workflow

1. **Implementation** - Source code in `temp_actor_source/src/`
2. **Testing** - Validate selectors and extraction against live Google Maps
3. **Deployment** - Upload to Apify Console and build
4. **Configuration** - Set pricing and upload logo
5. **Publication** - Submit to Apify Store

## 📞 Support

- **Apify Docs:** https://docs.apify.com/
- **Forum:** https://forum.apify.com/
- **Support:** https://help.apify.com/

---

**Last Updated:** 2026-09-30  
**Version:** 1.0.0  
**Status:** Implementation complete, verification and deployment pending
