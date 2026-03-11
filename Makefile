# ──────────────────────────────────────────────────────────────
# MkDocs Modern Theme
# ──────────────────────────────────────────────────────────────

# Colors
CYAN    := \033[36m
GREEN   := \033[32m
YELLOW  := \033[33m
RED     := \033[31m
DIM     := \033[2m
BOLD    := \033[1m
RESET   := \033[0m

.DEFAULT_GOAL := help

# ──────────────────────────────────────────────────────────────
# Setup
# ──────────────────────────────────────────────────────────────

.PHONY: install
install: ## Install all dependencies (uv + pnpm + vendored JS)
	@printf "$(CYAN)$(BOLD)Installing dependencies...$(RESET)\n"
	@uv sync --all-extras
	@pnpm install
	@pnpm run copy:mermaid
	@printf "$(GREEN)$(BOLD)Done.$(RESET)\n"

# ──────────────────────────────────────────────────────────────
# Development
# ──────────────────────────────────────────────────────────────

.PHONY: dev
dev: ## Start dev server with CSS watch (localhost:8000)
	@printf "$(CYAN)$(BOLD)Starting dev server...$(RESET)\n"
	@pnpm run css:watch &
	@uv run mkdocs serve -f tests/mkdocs.yml

.PHONY: build
build: ## Build CSS + MkDocs site
	@printf "$(CYAN)$(BOLD)Building...$(RESET)\n"
	@pnpm run copy:mermaid
	@pnpm run css:build
	@uv run mkdocs build -f tests/mkdocs.yml
	@printf "$(GREEN)$(BOLD)Build complete.$(RESET)\n"

# ──────────────────────────────────────────────────────────────
# Testing
# ──────────────────────────────────────────────────────────────

.PHONY: test
test: ## Run full Playwright E2E test suite
	@printf "$(CYAN)$(BOLD)Building for tests...$(RESET)\n"
	@pnpm run copy:mermaid
	@pnpm run css:build
	@uv run mkdocs build -f tests/mkdocs.yml
	@printf "$(CYAN)$(BOLD)Running tests...$(RESET)\n"
	@pnpm exec playwright test --config tests/e2e/playwright.config.ts
	@printf "$(GREEN)$(BOLD)All tests passed.$(RESET)\n"

.PHONY: screenshots
screenshots: ## Update visual regression snapshots
	@printf "$(CYAN)$(BOLD)Updating snapshots...$(RESET)\n"
	@pnpm run copy:mermaid
	@pnpm run css:build
	@uv run mkdocs build -f tests/mkdocs.yml
	@pnpm exec playwright test tests/e2e/visual.spec.ts --config tests/e2e/playwright.config.ts --update-snapshots
	@printf "$(GREEN)$(BOLD)Snapshots updated.$(RESET)\n"

# ──────────────────────────────────────────────────────────────
# i18n
# ──────────────────────────────────────────────────────────────

.PHONY: i18n-extract
i18n-extract: ## Extract translatable strings to .pot
	@printf "$(CYAN)$(BOLD)Extracting strings...$(RESET)\n"
	@uv run pybabel extract -F babel.cfg -o mkdocs_modern_theme/locales/messages.pot .
	@printf "$(GREEN)$(BOLD)Extracted to mkdocs_modern_theme/locales/messages.pot$(RESET)\n"

.PHONY: i18n-init
i18n-init: ## Initialize a new language (LANG=xx)
	@test -n "$(LANG)" || (printf "$(RED)Usage: make i18n-init LANG=xx$(RESET)\n" && exit 1)
	@uv run pybabel init -i mkdocs_modern_theme/locales/messages.pot -d mkdocs_modern_theme/locales -l $(LANG)
	@printf "$(GREEN)$(BOLD)Initialized locale $(LANG)$(RESET)\n"

.PHONY: i18n-update
i18n-update: ## Update .po files from .pot
	@printf "$(CYAN)$(BOLD)Updating .po files...$(RESET)\n"
	@uv run pybabel update -i mkdocs_modern_theme/locales/messages.pot -d mkdocs_modern_theme/locales
	@printf "$(GREEN)$(BOLD)Updated.$(RESET)\n"

.PHONY: i18n-compile
i18n-compile: ## Compile .po to .mo files
	@printf "$(CYAN)$(BOLD)Compiling translations...$(RESET)\n"
	@uv run pybabel compile -d mkdocs_modern_theme/locales
	@printf "$(GREEN)$(BOLD)Compiled.$(RESET)\n"

# ──────────────────────────────────────────────────────────────
# Code Quality
# ──────────────────────────────────────────────────────────────

.PHONY: lint
lint: ## Run all linters (ruff, ty, djlint, mdformat)
	@printf "$(CYAN)$(BOLD)Running linters...$(RESET)\n"
	@uv run ruff check .
	@uv run ruff format --check .
	@uv run ty check
	@uv run djlint mkdocs_modern_theme/ --check --extension html
	@uv run mdformat --check docs/
	@printf "$(GREEN)$(BOLD)All checks passed.$(RESET)\n"

.PHONY: format
format: ## Auto-format all files (ruff, djlint, mdformat)
	@printf "$(CYAN)$(BOLD)Formatting...$(RESET)\n"
	@uv run ruff check --fix .
	@uv run ruff format .
	@uv run djlint mkdocs_modern_theme/ --reformat --extension html
	@uv run mdformat docs/
	@printf "$(GREEN)$(BOLD)Formatted.$(RESET)\n"

# ──────────────────────────────────────────────────────────────
# Maintenance
# ──────────────────────────────────────────────────────────────

.PHONY: clean
clean: ## Remove all build artifacts and dependencies
	@printf "$(RED)$(BOLD)Cleaning...$(RESET)\n"
	@rm -rf site/ tests/site/ node_modules/ dist/ build/ *.egg-info
	@printf "$(GREEN)$(BOLD)Clean.$(RESET)\n"

# ──────────────────────────────────────────────────────────────
# Help
# ──────────────────────────────────────────────────────────────

.PHONY: help
help: ## Show this help
	@printf "\n$(BOLD)Usage:$(RESET)  make $(CYAN)<target>$(RESET)\n\n"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  $(CYAN)%-15s$(RESET) %s\n", $$1, $$2}'
	@printf "\n"
