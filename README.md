# Eclesia

> *"Uma amiga na hora de organizar os Levitas!"*

Eclesia is a web application for managing church worship team scheduling. It helps praise groups organize their weekly and special services by tracking members, instruments, songs, and service rosters.

## Features

- **Levitas** — Manage worship team members, their instruments, and availability
- **Escalas** — Create and manage service schedules (Wednesday, Sunday, Special), assigning members to each instrument role (ministro, baixo, bateria, guitarra, teclado, violão, backing vocals)
- **Instrumentos** — Track the instruments available in the group
- **Músicas** — Manage the song catalog used in services
- **Public schedule view** — Anyone can view upcoming schedules without logging in
- **Role-based access control** — Different permission levels for admins and regular members
- **Multi-theme support** — Multiple visual themes selectable from the landing page
- **PWA (Progressive Web App)** — Installable on mobile/desktop, works with offline caching via Service Worker

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **UI**: Shadcn/ui + custom animated components
- **Forms**: React Hook Form + Zod
- **Notifications**: Sonner
- **Auth**: JWT stored in cookies, validated server-side via middleware
- **PWA**: `@ducanh2912/next-pwa` (Service Worker, installable, offline caching)
- **Deployment**: Vercel

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Landing page
│   ├── login/            # Authentication page
│   ├── escalas/          # Public schedule viewer
│   └── home/             # Protected dashboard
│       ├── escalas/      # Schedule management
│       ├── levitas/      # Member management
│       ├── instrumentos/ # Instrument management
│       └── musicas/      # Song management
├── components/
│   ├── modals/           # CRUD dialogs for each entity
│   └── ui/               # UI component library
├── lib/
│   ├── apiObjects.ts     # TypeScript interfaces for all domain models
│   └── apiRequests.ts    # Generic REST API helpers
└── middleware.ts          # JWT-based route protection
```

## Authentication

- Public routes: `/`, `/login`, `/escalas`
- All `/home/*` routes require a valid JWT cookie
- Login supports both username/password and a 6-character access code
- Tokens are validated against the backend API on every request via Next.js middleware

## Deploy on Vercel

The easiest way to deploy this app is via the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
