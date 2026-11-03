# Agent Rules & Development Guidelines

- Read PRD, architecture, design, and memory before altering established decisions.
- Keep source files at or under 120 lines and split only by responsibility.
- Use strict TypeScript, readable names, focused components, and centralized theme tokens.
- Do not add credentials, connection strings, authentication, payments, or unapproved product scope.
- Never claim Neon persistence works until configured and tested.
- Use `localStorage` only for the selected theme; handle user-visible failures explicitly.
- Update README and task status with material implementation changes.
