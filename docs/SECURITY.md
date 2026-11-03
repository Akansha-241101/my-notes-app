# Security

## Current posture

This prototype has no authentication and uses no credentials. It contains no Neon connection string, API key, or other secret.

## Required before production

- Keep PostgreSQL credentials and privileged Data API credentials in server-side secret storage only.
- Authenticate requests before reaching note records and associate every record with an owner identity.
- Add an owner column, enable RLS, and use restrictive policies based on the verified identity—not client-supplied IDs.
- Validate title, content, tag, request shape, and authorization server-side.
- Use HTTPS, parameterized queries, rate limits, audit logging, and dependency updates.

Do not rely on hidden UI controls, environment variables prefixed `VITE_`, or `localStorage` for authorization or secrets.
