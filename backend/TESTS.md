# Spendlens Backend Tests

The backend uses Vitest for service and route testing.

## Run Tests

```bash
cd backend
npm run test
```

## Current Coverage

The test suite focuses on the audit engine because it is the core product logic, with API route coverage for validation and response shape.

Covered cases:

- Cursor Teams/Business downgrade for very small teams
- Optimized GitHub Copilot stack with no forced savings
- Over-allocated seat detection
- High OpenAI API spend routing and caching recommendation
- Fully optimized stack scenario
- Claude Max downgrade recommendation for broad team usage
- Invoice reconciliation when reported spend exceeds official list pricing
- Unknown tools returning an honest no-savings recommendation
- `POST /api/audit` success response shape
- `POST /api/audit` validation failures

## Why These Tests Matter

Spendlens needs to be financially honest. These tests ensure the backend can find real savings while also returning "already optimized" when the spend profile does not justify a recommendation.
