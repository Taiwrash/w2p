# =============================================================================
# Makefile  –  W2P convenience commands
# =============================================================================
.PHONY: dev dev-stop docker-up docker-down docker-build docker-logs clean help

# ── Local dev (no Docker) ────────────────────────────────────────────────────

dev:          ## Start frontend + backend in dev mode (Ctrl-C to stop)
	@chmod +x dev.sh && ./dev.sh

dev-stop:     ## Stop background dev servers
	@./dev.sh --stop

# ── Docker ───────────────────────────────────────────────────────────────────

docker-build: ## Build the Docker image
	docker compose build

docker-up:    ## Build (if needed) and start the Docker container
	docker compose up --build

docker-up-d:  ## Start in detached (background) mode
	docker compose up --build -d

docker-down:  ## Stop and remove the container
	docker compose down

docker-logs:  ## Tail container logs
	docker compose logs -f

docker-clean: ## Stop container AND remove the DB volume (full reset)
	docker compose down -v

# ── Misc ─────────────────────────────────────────────────────────────────────

clean:        ## Remove venv, node_modules, build artefacts
	rm -rf venv frontend/node_modules frontend/dist frontend/.vite backend/__pycache__ backend/routers/__pycache__

help:         ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
	  | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'
