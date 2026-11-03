import { neon } from '@neondatabase/serverless'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('DATABASE_URL is missing. Add your Neon connection string to .env')
}

const sql = neon(databaseUrl);

await sql`
  CREATE TABLE IF NOT EXISTS notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`

await sql`GRANT USAGE ON SCHEMA public TO anonymous, authenticated`
await sql`GRANT SELECT, INSERT, UPDATE, DELETE ON notes TO anonymous, authenticated`

console.log('notes table ready')
