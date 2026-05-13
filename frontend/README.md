# Spendlens Frontend

Modern B2B SaaS interface for AI infrastructure spend audits, built with React, Vite, Tailwind CSS, React Router, Recharts, Framer Motion, and Lucide icons.

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

## Environment

Create `.env` from `.env.example` when running the backend locally:

```bash
VITE_API_BASE_URL=http://localhost:8080
```

The audit onboarding flow posts to `POST /api/audit` and stores the generated result in localStorage. If the backend is unavailable, the UI offers a demo-report fallback so the product can still be reviewed.

## Routes

- `/` landing page
- `/login` authentication UI
- `/signup` account creation UI
- `/app` audit results dashboard
- `/app/audit` AI spend input form
- `/app/insights` AI-generated recommendations
- `/app/report` shareable audit report
- `/app/benchmarks` AI tool pricing benchmarks
- `/app/settings` settings surface
