# Design System

## Tokens

`src/styles/globals.css` is the source of truth. The refined light theme uses lavender-tinted `#faf9ff`, surface `#ffffff`, and primary `#6557f5`; the dark theme uses `#0c0e14`, `#151823`, and `#8b7cff`. Semantic sidebar, input, secondary, foreground, hover, and focus-ring tokens are included. Cinzel is reserved for brand and section/card headings; Inter is used for readable body copy.

## Components and layout

The desktop shell uses a 68px navbar, 230px collapsible sidebar, and compact two-card grid. Cards, inputs, buttons, filters, and menus use rounded corners, soft borders, and limited shadows. At 880px cards become one column; at 720px the sidebar becomes a compact horizontal nav.

## Interaction

Hover motion is subtle and disabled for reduced-motion preferences. Every interactive control has an accessible label or visible name, with a tokenized focus ring. The visual style avoids gradients and uses purple only as an accent.
