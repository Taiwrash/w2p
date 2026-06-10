# ============================================================
# Stage 1: Build the Vite/React frontend
# ============================================================
FROM node:18-alpine AS frontend-build

WORKDIR /app

# Copy dependency manifests first for layer caching
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci --prefer-offline

# Copy source and build
COPY frontend/index.html frontend/vite.config.js frontend/eslint.config.js ./
COPY frontend/src ./src
COPY frontend/public ./public

RUN npm run build
# Output: /app/dist

# ============================================================
# Stage 2: Python backend + static frontend served together
# ============================================================
FROM python:3.12-slim AS runtime

WORKDIR /app

# System deps (curl for healthcheck)
RUN apt-get update && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source
COPY backend/ ./backend/

# Copy built frontend assets into a dedicated folder
COPY --from=frontend-build /app/dist ./frontend/dist

# Install staticfiles middleware so FastAPI can serve the frontend
RUN pip install --no-cache-dir aiofiles

# Expose the single port
EXPOSE 8000

# Persist the SQLite database across container restarts via a named volume
VOLUME ["/app/backend"]

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:8000/api/farm-status || exit 1

# Start the server
CMD ["python3", "-m", "uvicorn", "backend.main:app", \
     "--host", "0.0.0.0", "--port", "8000"]
