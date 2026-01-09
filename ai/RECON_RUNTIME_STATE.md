# Runtime State Reconnaissance v0.1

## Vite Configuration

Full contents of `vite.config.js`:

```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.',
  server: {
    host: '0.0.0.0',
    port: 8000
  },
  preview: {
    host: '0.0.0.0',
    port: 8000
  },
  build: {
    outDir: 'dist'
  }
})
```

Port configured: 8000
Host set to: 0.0.0.0 (LAN access enabled)

## Routing Implementation

Query parameter parsing from main entry point (`index.html`):

```
// Read initial tab from URL
useState(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get('tab');
  if (tabParam) {
    setActiveTab(tabParam);
  }
});
```

Navigation update code:

```
const handleClick = () => {
  setActiveTab(tab.id);
  const url = new URL(window.location.href);
  url.searchParams.set('tab', tab.id);
  window.history.replaceState({}, '', `?${url.searchParams.toString()}`);
};
```

Query parameter parsing in ObservationReportViewer:

```
// Handle URL parameters for share links
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const reportParam = urlParams.get('report');
  if (reportParam && REPORT_OPTIONS.some(opt => opt.id === reportParam)) {
    setSelectedReport(reportParam);
  }
}, []);
```

## Demo Reports Inventory

Reports are stored in `/workbench-web/reports/` (not `/public/reports/`):

- `elections_midterm_claim_example.json`
- `media_claim_example.json`
- `ai_output_example.json`

Directory structure:
```
reports/
├── elections_midterm_claim_example.json
├── media_claim_example.json
└── ai_output_example.json
```

## Error Handling

Error handling logic from ObservationReportViewer component:

```
const [error, setError] = useState('');

setLoading(true);
setError('');

fetch(`./reports/${selectedReport}.json`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to load report');
    }
    return response.json();
  })
  .then(data => {
    // Basic validation
    const requiredFields = ['report_metadata', 'current_claim', 'timeline', 'patterns', 'metadata'];
    const missingFields = requiredFields.filter(field => !data[field]);

    if (missingFields.length > 0) {
      throw new Error(`Invalid report data: Missing required fields: ${missingFields.join(', ')}`);
    }

    setReportData(data);
  })
  .catch(err => {
    setError(err.message);
    setReportData(null);
  })
  .finally(() => {
    setLoading(false);
  });
```

Error display in UI:

```
{error && (
  <div style={{
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '6px',
    padding: '1rem',
    marginBottom: '2rem',
    color: '#dc2626'
  }}>
    <strong>Invalid report data:</strong> {error}
  </div>
)}
```

## Package.json Scripts

Scripts section from package.json:

```
"scripts": {
  "dev": "vite --host 0.0.0.0 --port 8000",
  "build": "vite build",
  "preview": "vite preview --host 0.0.0.0 --port 8000",
  "start": "npm run dev"
}
```

`npm run dev` executes: `vite --host 0.0.0.0 --port 8000`