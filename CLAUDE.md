# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (accessible on LAN via host: true)
npm run build     # Build for production
npm run preview   # Preview production build locally
```

No linting or testing framework is configured.

## Architecture

This is a **Vue 3 + Vite PWA** called "Mirage Access System" — a door access control panel for a building ("Batán 3"). It is a minimal single-page application.

### Stack

- **Vue 3** with `<script setup>` Composition API (JavaScript, no TypeScript)
- **Vite** as dev server and bundler
- **Bootstrap 5** for layout and UI components
- **Tailwind CSS 4** (devDependency, used alongside Bootstrap for utilities)
- **vite-plugin-pwa** with `autoUpdate` — the app installs as a standalone PWA

### Application flow

The entire app lives in `src/App.vue`. There is one reactive concern:

1. **Status polling** — `checkWemosStatus()` hits `GET /status` every 5 seconds to check if the Wemos IoT controller is reachable on the local network.
2. **Door control** — `openDoor(doorId)` sends `POST /open/{doorId}` to open a door (`p1` = Principal, `p2` = Intermedia). Buttons are disabled when offline or while a request is in flight.

### Backend API

The backend runs at a hardcoded LAN address: `http://192.168.100.16:5003`

- `GET  /status`       → `{ online: boolean }` — Wemos MQTT connectivity
- `POST /open/p1`      → Open main door ("Principal")
- `POST /open/p2`      → Open intermediate door ("Intermedia")

The dev server is configured with `host: true` so the app is reachable from mobile devices on the same LAN during development.
