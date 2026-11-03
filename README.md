# My Notes

A small, responsive React notes dashboard with light and dark themes, visual styling based on the supplied reference, and a temporary in-memory data service.

## Features

- Create, edit, delete, search, and favorite notes
- All Notes and Favorites filters, responsive sidebar, cards, and menus
- Accessible labels, keyboard focus, loading, empty, error, and success feedback
- Theme preference persists in `localStorage`
- Centralized light/dark CSS variables in `src/styles/globals.css`

## Stack

React, TypeScript, Vite, Tailwind CSS (available for utility use), Lucide React, and CSS theme tokens. The current notes service is deliberately a mock: no database credentials or permanent note data are stored in the browser.

## Setup with Bun

```bash
bun install
bun run dev
```

Open the local URL printed by Vite. For a release build, run `bun run build`; preview it with `bun run preview`.

## Environment and Neon

Copy `.env.example` to `.env` if you are preparing an API integration. `VITE_NEON_DATA_API_URL` must be a browser-safe, authenticated API endpoint; it must never be a Neon PostgreSQL connection string or secret key. The UI currently remains in mock mode even if that value is set, pending a server-side/proxy or supported Neon Data API authentication setup.

Create the database table using a migration in your protected database environment:

```sql
create table notes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  tag text,
  is_favorite boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

RLS requires an authenticated user identity column or ownership model. Since authentication is explicitly out of scope, do not enable a permissive production RLS policy. Add server-side identity and restrictive policies when auth is introduced.

## Structure

```text
src/
  components/layout/     Navbar and Sidebar
  components/notes/      Form, cards, grid, and header
  hooks/                 Note state and filtering
  services/              Temporary data boundary
  styles/                Tokens and split feature CSS
  types/                 Shared note types
docs/                    Product and engineering records
```

See `docs/` for the product requirements, architecture, design system, security guidance, and task status.
