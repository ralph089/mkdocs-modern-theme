# mkdocs-modern-theme

A minimal MkDocs theme with a 3-column layout, dark mode, and built-in search. No external dependencies.

**[Documentation](https://ralph089.github.io/mkdocs-modern-theme/)**

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
- **Dark mode** — system-aware with manual toggle
- **Search** — Ctrl+K / Cmd+K modal powered by lunr.js
- **Fully bundled** — Geist fonts, Alpine.js, lunr.js all included. No CDN, no external requests
- **Themable** — 30+ CSS custom properties (`--modern-*`) for colors, fonts, spacing, layout
- **Responsive** — mobile sidebar overlay, adaptive breakpoints
- **Content components** — Steps, Cards, File Tree, tabs, admonitions, mermaid diagrams

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

Override design tokens with a CSS file:

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

See the full list of custom properties in the [API reference](https://ralph089.github.io/mkdocs-modern-theme/reference/api/).

## Development

Requires [uv](https://docs.astral.sh/uv/) and [pnpm](https://pnpm.io/).

```bash
make install    # uv sync + pnpm install
make dev        # CSS watch + mkdocs serve (localhost:8000)
make build      # build CSS + site
make test       # build + Playwright E2E tests
```

## License

MIT
