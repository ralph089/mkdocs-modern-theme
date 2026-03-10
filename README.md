# mkdocs-modern-theme

A minimal MkDocs theme inspired by Nextra. Clean layout, dark mode, full-text search, zero external dependencies.

## Install

```bash
pip install mkdocs-modern-theme
```

```yaml
# mkdocs.yml
theme:
  name: modern
```

## Features

- **3-column layout** — sidebar, content, table of contents
- **Dark mode** — system-aware with manual toggle (light/dark/system cycle)
- **Search** — Ctrl+K / Cmd+K modal powered by lunr.js
- **Fully bundled** — Geist fonts, Alpine.js, lunr.js all included. No CDN, no external requests
- **Themable** — 30+ CSS custom properties (`--modern-*`) for colors, fonts, spacing, layout
- **Responsive** — mobile sidebar overlay, adaptive breakpoints at 1024px and 1280px
- **Content** — admonitions, syntax highlighting, tabs, tables, collapsible details, definition lists

## Theme Options

```yaml
theme:
  name: modern
  color_mode: system        # system | light | dark
  navigation_depth: 3       # sidebar nesting depth
  show_toc: true
  show_breadcrumbs: true
  show_prev_next: true
  show_edit_link: false
  logo: null                # path to logo image
```

## Customization

Override any design token with a CSS file:

```yaml
extra_css:
  - css/custom.css
```

```css
:root {
  --modern-accent: #e11d48;
  --modern-surface: #fef2f2;
  --modern-font-sans: "Inter", sans-serif;
}
```

See the full list of custom properties in [`css/input.css`](mkdocs_modern_theme/css/input.css).

## Recommended Extensions

```yaml
markdown_extensions:
  - admonition
  - pymdownx.highlight:
      anchor_linenums: true
  - pymdownx.superfences
  - pymdownx.tabbed:
      alternate_style: true
  - pymdownx.details
  - toc:
      permalink: true
  - tables
  - def_list
```

## Development

Requires [uv](https://docs.astral.sh/uv/) and [pnpm](https://pnpm.io/).

```bash
make install    # uv sync + pnpm install
make dev        # CSS watch + mkdocs serve (test site)
make build      # build CSS + test site
make test       # build + Playwright E2E tests
```

## License

MIT
