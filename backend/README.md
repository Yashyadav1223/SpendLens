# Spendlens Backend

Production-style Express + TypeScript API for Spendlens, an AI Infrastructure Spend Audit Platform for startups and engineering teams.

Spendlens analyzes AI tool spend across products such as ChatGPT, Claude, Cursor, GitHub Copilot, Gemini, Anthropic API, OpenAI API, Windsurf, and v0. It identifies overspending, unnecessary plans, duplicate seats, cheaper alternatives, and Credex credit opportunities.

## Tech Stack

- Node.js + Express.js
- TypeScript
- Supabase PostgreSQL
- Zod validation
- express-rate-limit
- Gemini API with Claude and template fallback
- Resend transactional email
- Vitest unit tests

## Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The API runs on `http://localhost:8080` by default.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run test
```

## Environment Variables

See `.env.example`.

Required for full production behavior:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `GEMINI_API_KEY`
- `ANTHROPIC_API_KEY` for Claude fallback

If Supabase, Resend, Gemini, or Anthropic are not configured, the backend uses safe local fallbacks for development.

## API Overview

### `POST /api/audit`

Runs the spend audit engine.

```json
{
  "teamSize": 12,
  "useCase": "Mixed",
  "monthlyAiBudget": 5000,
  "tools": [
    {
      "tool": "Cursor",
      "plan": "Teams",
      "seats": 2,
      "monthlySpend": 80,
      "usageType": "Coding"
    }
  ]
}
```

Returns:

- audit breakdown
- total monthly savings
- annual savings
- optimization score
- recommendations
- Credex credit opportunity flag

### `POST /api/summary`

Generates a concise AI audit summary using Gemini first, Claude second, and a template fallback if both AI providers fail.

### `POST /api/leads`

Captures a Credex lead:

```json
{
  "email": "founder@example.com",
  "companyName": "Acme AI",
  "role": "CTO",
  "teamSize": 18
}
```

### `POST /api/report`

Creates a public shareable report URL from an audit result. It stores anonymized spend data and does not expose company or email data.

### `GET /api/report/:id`

Returns a public shareable report object.

## Supabase Tables

```sql
create table leads (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  company_name text not null,
  role text not null,
  team_size integer not null,
  created_at timestamptz default now()
);

create table reports (
  id uuid primary key,
  title text not null,
  public_url text not null,
  audit_result jsonb not null,
  anonymized_spend_data jsonb,
  created_at timestamptz default now()
);
```

## Deployment

Compatible with Render or Railway.

Build command:

```bash
npm install && npm run build
```

Start command:

```bash
npm run start
```
