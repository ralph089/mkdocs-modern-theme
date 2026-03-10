# Development

How to work on the theme itself.

## Requirements

- [uv](https://docs.astral.sh/uv/) — Python package manager
- [pnpm](https://pnpm.io/) — Node.js package manager

## Setup

```bash
git clone https://github.com/ralph089/mkdocs-modern-theme.git
cd mkdocs-modern-theme
make install
```

This installs Python and Node dependencies and copies vendored JS files.

## Commands

| Command | What it does |
|---------|-------------|
| `make install` | Install all dependencies |
| `make dev` | Start dev server with CSS watch (localhost:8000) |
| `make build` | Build CSS and documentation site |
| `make test` | Build and run Playwright E2E tests |
| `make screenshots` | Update visual regression snapshots |
| `make clean` | Remove build artifacts |

## Project Structure

<div class="file-tree" markdown>

- mkdocs_modern_theme/
  - css/
    - input.css — Tailwind CSS source
    - theme.css — Compiled output (generated)
  - js/
    - theme.js — Theme logic (search, sidebar, dark mode)
    - alpine.min.js — Alpine.js (vendored)
    - lunr.min.js — Lunr.js search (vendored)
    - mermaid.min.js — Mermaid diagrams (vendored, generated)
  - partials/
    - sidebar.html
    - header.html
    - footer.html
    - toc.html
    - search-modal.html
  - base.html — Base template
  - main.html — Main content template
- tests/
  - docs/ — Documentation source (also used as test fixtures)
  - e2e/ — Playwright E2E test specs
  - mkdocs.yml — MkDocs config for the docs site

</div>

## CSS

The theme uses [Tailwind CSS v4](https://tailwindcss.com/). The source is `mkdocs_modern_theme/css/input.css`, compiled to `theme.css` during build.

`make dev` runs Tailwind in watch mode alongside `mkdocs serve`.

## Testing

E2E tests use [Playwright](https://playwright.dev/) and run against the built docs site.

```bash
make test
```

To run a single test file:

```bash
pnpm run copy:mermaid && pnpm run css:build && uv run mkdocs build -f tests/mkdocs.yml
pnpm exec playwright test tests/e2e/search.spec.ts --config tests/e2e/playwright.config.ts
```

## Conventional Commits

This project uses [conventional commits](https://www.conventionalcommits.org/). Commit messages are validated locally by commitlint + husky.

```
feat: add new feature        → minor version bump
fix: fix a bug               → patch version bump
docs: update readme           → no release
chore: update dependencies    → no release
```

Releases are automated via [python-semantic-release](https://python-semantic-release.readthedocs.io/) on push to `main`.
