# Spendlens Tests

## How To Run

Backend tests:

```bash
cd backend
npm install
npm run test
```

Frontend lint/build checks:

```bash
cd frontend
npm install
npm run lint
npm run build
```

Backend build:

```bash
cd backend
npm run build
```

## Automated Tests

### `backend/tests/auditEngine.test.ts`

Covers the core audit engine logic:

- Recommends Cursor Pro when a tiny team is on a team/admin plan
- Does not force savings when GitHub Copilot Business matches expected pricing
- Detects over-allocated seats and calculates seat waste savings
- Recommends API routing and caching for high OpenAI API spend
- Returns an optimized-stack recommendation when savings are immaterial
- Suggests a cheaper Claude configuration when Max is used broadly
- Uses invoice reconciliation when reported spend exceeds list pricing
- Keeps unknown tools honest instead of fabricating savings

### `backend/tests/auditRoutes.test.ts`

Covers API behavior:

- `POST /api/audit` returns a normalized audit response for valid input
- `POST /api/audit` returns clean validation errors for invalid input

## Why These Tests Matter

The audit engine is the highest-risk part of the product because it makes financial claims. These tests check that Spendlens can find real savings, calculate monthly and annual impact, and also say "already optimized" when the input does not justify a recommendation.

## Current Result

Latest local verification:

```txt
Backend tests: 10 passed
Frontend lint: passed
Frontend build: passed
Backend build: passed
```
