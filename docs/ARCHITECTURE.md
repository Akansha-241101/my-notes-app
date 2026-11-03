# Architecture

## Current system

Vite serves a single React client. `App.tsx` composes the layout and owns view state. `useNotes` performs loading and error handling, while `notesService` is the sole persistence boundary. Components receive typed data and callbacks; styles are split by layout, forms, and cards.

## Data flow

`NoteForm` or `NoteCard` → `useNotes` → `notesService` → refreshed note list → `NotesGrid`.

## Database target

The planned PostgreSQL `notes` table has `id`, `title`, `content`, `tag`, `is_favorite`, `created_at`, and `updated_at`. The React field names are camelCase; a real service maps them to database snake_case fields.

## Neon integration decision

No secret or connection string is exposed to the client. The mock service is temporary. When a verified, authenticated Data API design is available, replace only `notesService` with API calls and preserve the UI contract. RLS cannot safely be completed without an ownership/identity model, so it is documented but not falsely enabled.
