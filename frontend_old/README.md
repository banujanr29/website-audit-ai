# Website Audit AI — Frontend

A **React + Vite + TypeScript** SaaS-style frontend for the Website Audit AI tool.

## Tech Stack

| Package | Purpose |
|---|---|
| Vite 5 | Build tool & dev server |
| React 18 | UI library |
| TypeScript 5 | Static types |
| Tailwind CSS 4 | Utility-first styles |
| React Router 6 | Client-side routing |
| TanStack Query 5 | Server-state management |
| React Hook Form + Zod | Form handling & validation |
| Axios | HTTP client |
| Recharts | Data visualisation |

## Project Structure

```
src/
├── components/    # Shared/reusable UI components
├── layouts/       # Page shell layouts (MainLayout)
├── pages/         # Route-level components (Home, Audit, NotFound)
├── services/      # API client (Axios instance)
├── hooks/         # Custom React hooks
├── types/         # Shared TypeScript types
└── utils/         # Pure helper functions
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (proxies /api → http://localhost:8080)
npm run dev

# Type-check
npx tsc --noEmit

# Production build
npm run build
```

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `VITE_API_BASE_URL` | `/api` | Backend API base path |
