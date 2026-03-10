.PHONY: install dev build test screenshots clean

install:
	uv sync
	pnpm install

dev:
	pnpm run css:watch &
	uv run mkdocs serve -f tests/mkdocs.yml

build:
	pnpm run css:build
	uv run mkdocs build -f tests/mkdocs.yml

test:
	pnpm run css:build
	uv run mkdocs build -f tests/mkdocs.yml
	pnpm exec playwright test

screenshots:
	pnpm run css:build
	uv run mkdocs build -f tests/mkdocs.yml
	pnpm exec playwright test tests/e2e/visual.spec.ts --update-snapshots

clean:
	rm -rf site/ tests/site/ node_modules/ dist/ build/ *.egg-info
