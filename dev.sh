#!/usr/bin/env bash
# =============================================================================
# dev.sh  –  Start W2P frontend + backend with a single command (no Docker)
# =============================================================================
#
# Usage:
#   chmod +x dev.sh        # first time only
#   ./dev.sh               # starts both servers
#   ./dev.sh --stop        # kills both servers
#
# Requirements:
#   • python3 with venv / pip
#   • node + npm
#
# Ports:
#   Frontend  →  http://localhost:5173   (Vite dev server)
#   Backend   →  http://localhost:8000   (FastAPI / uvicorn)
# =============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PID_FILE="${SCRIPT_DIR}/.dev_pids"

# ── Colour helpers ──────────────────────────────────────────────────────────
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'  # no colour

info()    { echo -e "${CYAN}[w2p]${NC} $*"; }
success() { echo -e "${GREEN}[w2p]${NC} $*"; }
warn()    { echo -e "${YELLOW}[w2p]${NC} $*"; }
error()   { echo -e "${RED}[w2p]${NC} $*" >&2; }

# ── Stop mode ───────────────────────────────────────────────────────────────
stop_servers() {
  if [[ -f "$PID_FILE" ]]; then
    info "Stopping W2P dev servers …"
    while IFS= read -r pid; do
      if kill -0 "$pid" 2>/dev/null; then
        kill "$pid" && info "  Killed PID $pid"
      fi
    done < "$PID_FILE"
    rm -f "$PID_FILE"
    success "All servers stopped."
  else
    warn "No PID file found. Servers may not be running."
  fi
  exit 0
}

[[ "${1:-}" == "--stop" ]] && stop_servers

# ── Cleanup on Ctrl-C ───────────────────────────────────────────────────────
cleanup() {
  echo ""
  info "Shutting down …"
  if [[ -f "$PID_FILE" ]]; then
    while IFS= read -r pid; do
      kill "$pid" 2>/dev/null || true
    done < "$PID_FILE"
    rm -f "$PID_FILE"
  fi
  success "Goodbye!"
}
trap cleanup EXIT INT TERM

# ── Backend setup ────────────────────────────────────────────────────────────
BACKEND_DIR="${SCRIPT_DIR}/backend"
VENV_DIR="${SCRIPT_DIR}/venv"

info "Setting up Python virtual environment …"
if [[ ! -d "$VENV_DIR" ]]; then
  python3 -m venv "$VENV_DIR"
fi

# shellcheck disable=SC1091
source "${VENV_DIR}/bin/activate"

info "Installing Python dependencies …"
pip install -q -r "${BACKEND_DIR}/requirements.txt"

# Load .env if present
if [[ -f "${SCRIPT_DIR}/.env" ]]; then
  info "Loading .env …"
  # export each line that isn't a comment or empty
  set -a
  # shellcheck disable=SC1091
  source "${SCRIPT_DIR}/.env"
  set +a
fi

info "Starting FastAPI backend on http://localhost:8000 …"
(
  cd "$BACKEND_DIR"
  python3 -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
) &
BACKEND_PID=$!
echo "$BACKEND_PID" >> "$PID_FILE"

# ── Frontend setup ───────────────────────────────────────────────────────────
info "Installing Node dependencies …"
cd "${SCRIPT_DIR}/frontend"
npm install --prefer-offline --silent

info "Starting Vite frontend on http://localhost:5173 …"
npm run dev &
FRONTEND_PID=$!
echo "$FRONTEND_PID" >> "$PID_FILE"

# ── Done ─────────────────────────────────────────────────────────────────────
echo ""
success "════════════════════════════════════════"
success "  W2P dev servers are running!"
success ""
success "  Frontend  →  http://localhost:5173"
success "  Backend   →  http://localhost:8000"
success "  API Docs  →  http://localhost:8000/docs"
success ""
success "  Press Ctrl-C to stop both servers."
success "════════════════════════════════════════"
echo ""

# Keep script alive so trap fires on Ctrl-C
wait
