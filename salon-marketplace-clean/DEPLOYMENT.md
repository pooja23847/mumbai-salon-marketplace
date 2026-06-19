# Deployment Checklist

## Required checks

Run these before every deploy:

```bash
npm run lint
npm run build
```

## Environment variables

Set these in the hosting platform:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_SUPABASE_PROJECT_ID=
SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
SUPABASE_PROJECT_ID=
```

Set `LOVABLE_API_KEY` too if the AI advisor should use the hosted AI service.

## Supabase

Apply the SQL files in `supabase/migrations` to the production Supabase project before enabling user bookings or owner dashboards.

## Build output

The production build writes client assets to `dist/client` and the server bundle to `dist/server`.
