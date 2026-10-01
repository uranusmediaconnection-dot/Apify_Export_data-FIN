# FDN Google Map Master Scraper - TODO List

**Actor Name:** FDN Google Map Master Scraper  
**Actor ID:** [To be assigned by Apify]  
**Last Updated:** 2026-09-30  
**Status:** Implementation Complete, Verification and Deployment Pending

---

## 📋 PROJECT TASKS

### Phase 1: Core Implementation ✅ COMPLETE

| Task | Status | Notes |
|------|--------|-------|
| Project structure | ✅ Done | `temp_actor_source/src/` package created |
| `src/__init__.py` | ✅ Done | Package marker |
| `src/proxy_manager.py` | ✅ Done | Apify RESIDENTIAL proxy rotation wrapper |
| `src/data_processor.py` | ✅ Done | Cleaning, normalization, deduplication, confidence scoring |
| `src/contact_enricher.py` | ✅ Done | Website scraping for emails/social links |
| `src/maps_scraper.py` | ✅ Done | Playwright-based Google Maps search/detail extraction |
| `src/main.py` | ✅ Done | Real Actor orchestration, input validation, incremental push |
| `.actor/actor.json` | ✅ Done | Actor metadata and run options |
| `.actor/input_schema.json` | ✅ Done | 15-field input schema |
| `requirements.txt` | ✅ Done | apify, playwright, beautifulsoup4, httpx, dnspython |
| `Dockerfile` | ✅ Done | Python 3.11 + Playwright Chromium, updated for `src` layout |
| `temp_actor_source/README.md` | ✅ Done | Actor README draft |
| Root `README.md` | ✅ Done | Updated from LinkedIn to Google Maps content |

### Phase 2: Verification and Testing 🔴 PENDING

| Task | Status | Notes |
|------|--------|-------|
| Python syntax validation | 🔴 Pending | Run py_compile/lint on all `src/*.py` files |
| Live Google Maps selector validation | 🔴 Pending | Validate CSS selectors against current Maps DOM |
| Fallback parser coverage | 🔴 Pending | Confirm fallback paths activate on layout drift |
| Deduplication behavior | 🔴 Pending | Verify place_id + URL dedupe under concurrent runs |
| Proxy reachability | 🔴 Pending | Confirm `RESIDENTIAL` proxy remains reachable for Maps |
| Error/retry behavior | 🔴 Pending | Confirm exponential backoff and graceful degradation |

### Phase 3: Documentation Sync 🔴 PENDING

| Task | Status | Notes |
|------|--------|-------|
| Root `TODO.md` | 🔴 In Progress | Align progress percentages and task statuses with real state |
| Root `PROJECT_SUMMARY.md` | 🔴 Pending | Remove unverified production-readiness claims |
| `DEPLOYMENT_CHECKLIST.md` | 🔴 Pending | Update file paths to match `src/` layout |
| `FDN_Google_Map_Master_Scraper_Guide.md` | 🔴 Pending | Sync architecture notes with implemented modules |

### Phase 4: Deployment to Apify 🔴 PENDING

| Task | Status | Notes |
|------|--------|-------|
| Create/update Actor in Console | 🔴 Pending | Upload source files or connect repo |
| Build Actor | 🔴 Pending | Verify Docker build succeeds |
| Test run with sample input | 🔴 Pending | Validate end-to-end extraction |
| Upload logo | 🔴 Pending | `Max_a_Refine_and_Improve_t.png` |
| Configure pricing | 🔴 Pending | Enable pay-per-result, set events and free tier |
| Publish to Store | 🔴 Pending | Make public and submit for Apify approval |

---

## Critical Information

- **Actor Name:** FDN Google Map Master Scraper
- **Pricing Model:** Pay-per-Event at $2.00 per 1,000 places
- **Free Tier:** Up to 100 places free
- **Proxy Requirement:** Apify RESIDENTIAL proxy group required
- **Logo:** `Max_a_Refine_and_Improve_t.png`

## Dependencies

- Verification tasks should complete before deployment tasks
- Documentation sync can proceed in parallel with verification
- Deployment requires verified source and updated documentation

## Next Actions

1. Run syntax validation on `src/*.py`
2. Validate Google Maps selectors against live DOM
3. Update `PROJECT_SUMMARY.md` to match real state
4. Update `DEPLOYMENT_CHECKLIST.md` paths for `src/` layout
5. Proceed with Apify Console deployment

---

**Last Updated:** 2026-09-30  
**Status:** Implementation complete, verification and deployment pending
