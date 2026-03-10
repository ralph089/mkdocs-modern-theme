# MkDocs Modern Theme

## Setup

```bash
make install    # uv sync + pnpm install + copy vendored JS
```

## Development

```bash
make dev        # CSS watch + mkdocs serve (test site at localhost:8000)
make build      # CSS build + mkdocs build
```

## Testing

### Full test suite

```bash
make test       # Build + run all Playwright E2E tests
```

### Run specific E2E test file

```bash
pnpm exec playwright test tests/e2e/mermaid.spec.ts --config tests/e2e/playwright.config.ts
```

### Available test suites

- `tests/e2e/search.spec.ts` — search modal and keyboard shortcuts
- `tests/e2e/navigation.spec.ts` — sidebar navigation
- `tests/e2e/responsive.spec.ts` — responsive layout breakpoints
- `tests/e2e/theme-toggle.spec.ts` — dark/light mode toggle
- `tests/e2e/toc.spec.ts` — table of contents scroll spy
- `tests/e2e/visual.spec.ts` — visual regression screenshots
- `tests/e2e/mermaid.spec.ts` — mermaid diagram rendering and dark mode

### Update visual regression snapshots

```bash
make screenshots
```

### Before running tests

Tests require a full build first. `make test` handles this automatically. If running individual test files, build first:

```bash
pnpm run copy:mermaid && pnpm run css:build && uv run mkdocs build -f tests/mkdocs.yml
pnpm exec playwright test tests/e2e/<test-file>.spec.ts --config tests/e2e/playwright.config.ts
```
