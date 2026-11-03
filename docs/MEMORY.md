# Project Memory

- The app was created in an empty workspace on 2026-11-03.
- Visual fidelity to the supplied light/dark notes dashboard is the first design priority.
- Source files are intentionally small and kept under the project’s 120-line rule.
- The current service uses seeded, in-memory demo notes. It is not permanent storage and must not be described as Neon CRUD.
- Theme preference is the sole approved `localStorage` use.
- Trash is a visual filter with clear messaging because the prescribed database schema has no soft-delete column.
- The sidebar has a dependency-free, accessible collapse control because this Vite project has no pre-existing shadcn/ui configuration or Sidebar primitives.
