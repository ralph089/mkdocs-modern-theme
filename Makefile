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
