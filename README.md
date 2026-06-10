# W2P (When & What to Plant)
### AI-Powered Precision Agriculture Platform | BeOrchid Africa Developers Hackathon 2026

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)](https://vite.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker)](https://www.docker.com/)
[![Gemini](https://img.shields.io/badge/Gemini_AI-2.5_Flash-4285F4?logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)

W2P is an AI-powered agricultural intelligence platform built to remove uncertainty from planting decisions. It combines seasonal climate forecasting, machine learning models, and localized environmental data to guide farmers on **when to plant**, **what to plant**, and the **level of yield risk** they face. The system transforms raw climate data into practical, actionable guidance for African smallholder farmers, bridging the gap between advanced predictive models and localized farming reality.

---

## 📖 Table of Contents
1. [Problem Statement](#-problem-statement)
2. [Key Features](#-key-features)
3. [Technology Stack](#-technology-stack)
4. [System Architecture](#-system-architecture)
5. [Getting Started (Local Development)](#-getting-started-local-development)
6. [Running with Docker](#-running-with-docker)
7. [Convenience Makefile Targets](#-convenience-makefile-targets)
8. [Project Directory Layout](#-project-directory-layout)

---

## ⚠️ Problem Statement
Across Africa, traditional planting calendars no longer align with shifting, unpredictable climate patterns. Smallholder farmers face significant risks:
- **Failed Germination** due to unstable rainfall onset.
- **Mid-Season Crop Failure** due to drought spells or extreme temperature spikes.
- **Wasted Investments** in land clearing, plowing, seed purchases, and labor.

The challenge is not a lack of effort or farming knowledge, but rather a lack of **accessible, localized climate intelligence** delivered in formats compatible with the realities of rural farmers.

---

## 🌟 Key Features

### 1. Optimal Planting Window Prediction & Risk Scoring
- Seeds historical weather trends and current forecasts into predictive algorithms to estimate optimal planting onset windows.
- Models germination likelihood, soil moisture index, and overall end-of-season yield risk.

### 2. Multi-Crop Suitability Evaluator
- Analyzes soil characteristics (Loam, Clay, Sandy) and available water sources (Rainfed, Irrigated, Borehole) to rank crop viability.
- Generates suitability profiles for staple crops such as **Maize**, **Sorghum**, **Cassava**, **Beans**, and **Millet**.

### 3. Retro USSD Mobile Simulator (`*829#`)
- Features an interactive Nokia-style keypad and screen in the frontend.
- Simulates real USSD workflow (`*829#`) used by offline farmers to query:
  1. *Weather Alerts*
  2. *Planting Calendar*
  3. *Market Prices*

### 4. Vernacular SMS Advisories
- Allows agricultural field agents to dispatch advisory alerts to registered farmers.
- Integrates Google Gemini translation to dynamically convert advisories into local **Hausa dialect** (e.g. Kano cluster alerts) before delivery.

### 5. Live Wholesale Market Price Intel
- Delivers real-time simulated market price logs tracking daily crop value fluctuations (in local Naira exchange rates).
- Provides advisory recommendations (e.g., "Hold crop" or "Sell now") based on weekly price forecasting.

### 6. Enterprise MLOps Dashboard
- Displays historical model training runs with dataset size, model type (e.g., *LSTM*, *XGBoost*), accuracy, and completion logs.
- Enables single-click simulated model re-training triggers to simulate model accuracy updates.

---

## 🛠️ Technology Stack

- **Frontend**:
  - React 19 (Hooks, Context, Router v6)
  - Vite (Fast builds & Hot Module Replacement)
  - Leaflet Maps (`react-leaflet` for visual coordinate select)
  - Recharts (Rich visual graphs for rainfall forecasting and risk metrics)
  - Vanilla CSS (Tailored glassmorphism and modern responsive layout)
- **Backend**:
  - FastAPI (Python 3.12, high performance, auto-documented OpenAPI specs)
  - SQLite (Local lightweight relational database, pre-seeded for demo)
  - Pydantic v2 (Strict type-checking and request validation schemas)
- **AI/ML Layer & External APIs**:
  - **Google Gemini API** (`gemini-2.5-flash`) for crop suitability insights, agronomist guidance generation, and Hausa language translation.
  - **Open-Meteo API** for live 7-day meteorological data lookup.
  - **Fallback Heuristics**: Smart coordinate-seeded deterministic algorithms that ensure the app works out-of-the-box even without a Gemini API Key.

---

## 🏗️ System Architecture
W2P supports two modes of operation:
1. **Local Developer Split**: Running the Vite server (`localhost:5173`) and uvicorn backend (`localhost:8000`) independently.
2. **Production/Docker Unified**: FastAPI mounts the static build directory `/dist` and serves the React SPA assets natively, running the entire platform under a single port (`8000`).

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- **Python**: v3.10 or higher
- **Node.js**: v18 or higher (with npm)
- **Gemini API Key** *(Optional)*: Grab a key from Google AI Studio.

### Quick Start (Recommended)
We provide a setup script `dev.sh` that handles Python virtual environments, pip dependencies, npm packages, and runs both servers simultaneously.

1. **Copy Environment Template**:
   ```bash
   cp .env.example .env
   ```
2. **Edit `.env`**:
   Add your `GEMINI_API_KEY` to run AI-powered features.
3. **Execute Dev Script**:
   ```bash
   chmod +x dev.sh
   ./dev.sh
   ```
4. **Access the Apps**:
   - **Frontend**: http://localhost:5173
   - **Backend API Docs**: http://localhost:8000/docs

*To stop both servers, simply press `Ctrl-C` in the running terminal.*

---

## 🐳 Running with Docker

Docker containers run in the unified single-port mode where the React frontend is compiled and served alongside FastAPI.

1. **Verify Environment**: Ensure your `.env` contains your `GEMINI_API_KEY`.
2. **Start Containers**:
   ```bash
   docker compose up --build
   ```
3. **Access unified app**: Open http://localhost:8000

*The database volume `w2p_db` is mapped to persist SQLite entries (`w2p.db`) across container restarts.*

---

## ⚙️ Convenience Makefile Targets
If `make` is available on your OS, you can utilize these shortcuts:

- `make dev`: Setup and run local frontend + backend.
- `make dev-stop`: Stop background servers.
- `make docker-up`: Compile, build, and boot the Docker container.
- `make docker-down`: Shut down and remove containers.
- `make docker-clean`: Shut down containers and wipe the SQLite database volume.
- `make clean`: Clean up all node_modules, python virtual envs, and dist files.
- `make help`: List all available commands.

---

## 📂 Project Directory Layout

```
.
├── backend/               # FastAPI Python application
│   ├── routers/           # Route handler blueprints (farm, SMS, clients, MLOps, market)
│   ├── database.py        # SQLite database connection & seed data
│   ├── main.py            # FastAPI setup & static assets integration
│   ├── requirements.txt   # Python dependency list
│   ├── schemas.py         # Pydantic schema contracts
│   ├── services.py        # Gemini translation & Open-Meteo adapters
│   └── w2p.db             # Local SQLite database file (created on launch)
├── frontend/              # React + Vite frontend
│   ├── src/
│   │   ├── components/    # Frontend widgets (USSD emulator, Setup, Maps, Graphs)
│   │   │   ├── dashboard/ # Individual widgets mapped in Dashboard tabs
│   │   │   └── USSDPhone.jsx
│   │   ├── pages/         # Route pages (LandingPage, Auth, Dashboard)
│   │   ├── App.jsx        # Main Router setup
│   │   ├── index.css      # Core CSS stylesheet
│   │   └── main.jsx       # App entrypoint
│   ├── public/            # Static public assets (logo, images)
│   ├── index.html         # HTML entry point
│   ├── package.json       # Node dependency list
│   └── vite.config.js     # Vite configuration settings
├── Dockerfile             # Multi-stage production container setup
├── docker-compose.yml     # Compose config with volume persistency
├── dev.sh                 # Mono-runner shell script (runs both servers)
└── Makefile               # Convenience command shortcuts
```
