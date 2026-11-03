import { createClient } from '@neon/neon-js'

const databaseUrl = import.meta.env.VITE_NEON_DATABASE_URL

if (!databaseUrl) {
  throw new Error(
    'VITE_NEON_DATABASE_URL is missing. Use the HTTPS Neon database URL from the Data API page (not the Postgres connection string).',
  )
}

export const db = createClient(databaseUrl, {
  auth: {
    allowAnonymous: true,
  },
})
