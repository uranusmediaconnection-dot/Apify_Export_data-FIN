# Calendar App (Full‑Stack)

A modern **2026‑style** calendar built with a lightweight **React‑like** front‑end (vanilla ES modules + Tailwind) and a tiny **Express** back‑end that stores events in a JSON file.

## Features
- Dark glass‑morphism UI, smooth animations, purple accent.
- Monthly, weekly and daily views.
- Create / edit / delete events (modal UI).
- Free‑time finder.
- Responsive design – mobile friendly.
- Backend API (`/api/events`) for persisting events.

## Project Structure
```
calendar full implementation/
│   README.md
│   package.json            # monorepo for both front‑end & back‑end
│
├─frontend/
│   ├─public/
│   │   ├─index.html        # entry point (served by backend)
│   │   └─style.css         # Tailwind‑generated CSS (included via CDN)
│   └─src/
│       ├─index.js          # bootstraps the app
│       ├─App.js             # root component
│       ├─Calendar.js        # month / week / day grid
│       ├─EventModal.js      # modal for add / edit events
│       ├─Sidebar.js         # user list, mini‑calendar, upcoming
│       └─utils.js           # date helpers, storage helpers
│
└─backend/
    ├─server.js               # Express server, serves static front‑end + API
    └─data/events.json        # simple JSON DB for events
```

## Development & Build
```bash
# 1️⃣ Install dependencies (Node.js >= 18 required)
npm install

# 2️⃣ Run both front‑end & back‑end in development mode
npm run dev    # starts Express on http://localhost:3000
```
Open the URL in a browser – you’ll see the freshly styled calendar.

## Deploying to GitHub & Vercel (step‑by‑step guide)
See the **Deploy Guide** section at the bottom of this file.
