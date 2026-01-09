# Log

Append-only record of executions. Contains commit hashes and actions only. No speculative content.

---

Fixed GitHub Pages rendering: Added base: '/workbench/' to vite.config.js (commit d5db81e)
Rebuilt and verified production preview locally
Pushed to main — GitHub Pages redeploy triggered with correct asset paths
Public URLs expected to render correctly after propagation

- Built and committed dist/ for live GitHub Pages deployment
- Production build verified locally on preview server
- Pushed to main — GitHub Pages redeploy triggered with static files
- Public rendering expected within 5–15 minutes

- Rebuilt production dist/ with current base path configuration
- Fresh build verified locally — app renders correctly without white screen
- Confirmed /workbench/ base paths in built assets
- No changes needed — current dist/ already has correct base path assets

- Added GitHub Actions workflow (.github/workflows/deploy.yml) for auto-build/deploy to gh-pages
- Triggers on main push, builds dist/, deploys to Pages root
- Pages should now serve built app correctly after first run

- Switched build output from dist/ to docs/ for GitHub Pages compatibility
- Updated vite.config.js build.outDir to 'docs'
- Added docs/.nojekyll to prevent Jekyll interference
- Built and committed docs/ with correct /workbench/ base path assets
- Updated STATE.md: Pages deploy from main/docs folder

- Updated Vite outDir to docs, base path confirmed
- Fresh build generated to docs
- .nojekyll added (if applicable)
- Committed + pushed
- Merged pudding-check-mvp-clean into main
- Pushed merged main to origin/main
- Added docs/.nojekyll and committed