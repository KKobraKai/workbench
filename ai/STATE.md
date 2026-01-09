# State

## Project Purpose
OpenSauce Workbench — Epistemic Observatory. Core features: Pudding Check, Midterm Election Lens, AI/Media Claim Tracing.

## Current Features
- Pudding Check MVP (static reports, React)
- Midterm Workbench (with tabs: Pudding Check + Demo Reports Viewer)
- Demo Reports Viewer (schema-compliant JSON reports with share links)
- AI Conversation Forensics (pattern analysis)
- Trust Audit (five-pillar assessment)
- Prompt Builder (epistemic hygiene tools)

## What Is Explicitly NOT Built Yet
- Backend infrastructure
- Live data polling
- Account system
- Premium lens features
- Automated claim analysis

## Deployment Status
- React SPA (static)
- GitHub auto-deploy
- Frontend-only MVP
- No dependencies beyond React core

## Development Setup
- Runtime: Vite dev server on port 8000
- LAN Access: Enabled for phone testing via http://<PC_IP>:8000
- Commands:
  - Install: `npm install`
  - Run: `npm run dev`
  - Desktop: http://localhost:8000
  - Phone: http://<PC_IPV4>:8000 (same Wi-Fi/LAN)
- Note: Windows firewall may prompt for Node; allow on Private networks

## Deployment Status
- Production build: Tested and verified working
- Reports location: /public/reports/ (included in docs/ during build)
- Build command: `npm run build` (outputs to docs/)
- Preview command: `npm run preview`
- Deployed to: GitHub (commit: 9efc670)
- GitHub Pages: Deploy from branch main /docs folder
- Base path: /workbench/ (configured in vite.config.js)
- Desktop verified: localhost:8000 ✓
- Production verified: preview server ✓

## Local Dev (Canonical - Verified)

**Commands:**
- Install: `npm install`
- Run: `npm run dev`

**URLs (Confirmed Working):**
- Desktop: http://localhost:8000
- LAN: http://192.168.1.7:8000 (same Wi-Fi/LAN)

**Test URLs (Verified Jan 8, 2026):**
- Valid: /?tab=midterm&report=elections_midterm_claim_example ✓
- Valid: /?tab=midterm&report=media_claim_example ✓
- Valid: /?tab=midterm&report=ai_output_example ✓
- Invalid: /?tab=midterm&report=does_not_exist ✓ (shows error UI)

**LAN Access Note:**
Phones on same network use http://<LAN_IP>:8000
Windows Firewall: Allow Node on Private networks if prompted

## Constraints
- Solopreneur development
- Fast iteration cycles
- Doctrine-aligned architecture
- Schema-first approach
- Observation-only doctrine
