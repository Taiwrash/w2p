"""
main.py
-------
W2P Backend – FastAPI application entry point.

Project layout
--------------
backend/
├── main.py          ← you are here (app factory + lifespan)
├── database.py      ← SQLite connection + schema init
├── schemas.py       ← Pydantic request / response models
├── services.py      ← Open-Meteo & Gemini API calls + fallback heuristics
└── routers/
    ├── farm.py      ← GET /api/farm-status, POST /api/analyze-farm
    ├── clients.py   ← GET/POST /api/clients
    ├── sms.py       ← GET /api/sms-logs, POST /api/sms
    ├── mlops.py     ← GET/POST /api/ml-runs
    └── market.py    ← GET /api/market-prices

Static files
------------
When SERVE_STATIC=true (set automatically inside Docker) the backend also
serves the pre-built Vite frontend from ../frontend/dist, so a single
container / single port covers the entire app.
"""

import os
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from database import init_db
from routers import clients, farm, market, mlops, sms, regional


# ---------------------------------------------------------------------------
# Lifespan (replaces deprecated on_event)
# ---------------------------------------------------------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialise the database once on startup."""
    init_db()
    yield


# ---------------------------------------------------------------------------
# Application factory
# ---------------------------------------------------------------------------

app = FastAPI(
    title="W2P – When & What to Plant API",
    version="2.0.0",
    description=(
        "AI-powered precision agriculture platform for African smallholder farmers. "
        "Provides micro-climate analysis, crop suitability ranking, vernacular SMS "
        "dispatch, and enterprise MLOps endpoints."
    ),
    lifespan=lifespan,
)

# CORS – tighten allowed origins before deploying to production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Register API routers
# ---------------------------------------------------------------------------

app.include_router(farm.router)
app.include_router(clients.router)
app.include_router(sms.router)
app.include_router(mlops.router)
app.include_router(market.router)
app.include_router(regional.router)

# ---------------------------------------------------------------------------
# Serve built frontend (Docker / production mode)
# SERVE_STATIC env var is set to "true" in docker-compose.yml
# ---------------------------------------------------------------------------

_STATIC_DIR = Path(__file__).parent.parent / "frontend" / "dist"

if os.environ.get("SERVE_STATIC", "false").lower() == "true" and _STATIC_DIR.exists():
    # Serve Vite assets (JS, CSS, images …)
    app.mount(
        "/assets",
        StaticFiles(directory=_STATIC_DIR / "assets"),
        name="assets",
    )

    # Catch-all: return index.html for every non-API path so React Router works
    @app.get("/{full_path:path}", include_in_schema=False)
    async def serve_spa(full_path: str):
        index = _STATIC_DIR / "index.html"
        return FileResponse(index)


# ---------------------------------------------------------------------------
# Dev server entry point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
