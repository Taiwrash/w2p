/**
 * api.js – Central API base URL configuration
 *
 * In development (./dev.sh), Vite proxies nothing, so we call the backend
 * directly on port 8000 via VITE_API_URL.
 *
 * In production (Docker), FastAPI serves the built static files itself on
 * the same origin, so the base is empty ("") and all calls are same-origin.
 *
 * Set VITE_API_URL in your .env.local or CI environment for split deployment.
 */
const API_BASE = import.meta.env.VITE_API_URL ?? '';

export default API_BASE;
