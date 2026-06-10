# W2P Backend API
### FastAPI Core Service & AI Engine

This directory contains the Python FastAPI backend for the When & What to Plant (W2P) platform. It provides REST APIs for farm analysis, client management, advisory translation and dispatch, live price telemetry, and machine learning runs.

---

## 📂 Backend File Architecture

```
backend/
├── routers/
│   ├── __init__.py
│   ├── clients.py     # GET /api/clients, POST /api/clients
│   ├── farm.py        # GET /api/farm-status, POST /api/analyze-farm
│   ├── market.py      # GET /api/market-prices (simulated wholesale feed)
│   ├── mlops.py       # GET /api/ml-runs, POST /api/ml-runs (simulated model updates)
│   └── sms.py         # GET /api/sms-logs, POST /api/sms (AI-translated advisory dispatch)
├── database.py        # SQLite connection setup, table DDLs, and default seeds
├── main.py            # FastAPI entry point, lifespan, CORS, and static bundle mounting
├── requirements.txt   # Backend dependency list (fastapi, uvicorn, requests, pydantic, aiofiles)
├── schemas.py         # Pydantic validation & response validation contracts
└── services.py        # Open-Meteo REST connector and Gemini prompt wrappers
```

---

## 🛢️ Database Schema
On startup, W2P initializes a local SQLite file `backend/w2p.db` containing the following four tables (pre-seeded with default values if empty):

### 1. `farms`
Stores analyzed farm coordinates, acreage, environment parameters, and JSON insights.
* **Fields**: `id` (PK), `lat` (REAL), `lng` (REAL), `acres` (REAL), `soil_type` (TEXT), `water_source` (TEXT), `selected_crop` (TEXT), `insights` (TEXT - JSON payload), `updated_at` (TEXT).

### 2. `clients`
Stores enrolled farmers managed by field coordinators.
* **Fields**: `id` (PK), `name` (TEXT), `phone` (TEXT), `crop` (TEXT), `location` (TEXT), `acres` (REAL), `status` (TEXT), `updated_at` (TEXT).

### 3. `sms_logs`
Tracks sent advisories, weather warnings, and translations.
* **Fields**: `id` (PK), `client_name` (TEXT), `phone` (TEXT), `message` (TEXT), `status` (TEXT), `sent_at` (TEXT).

### 4. `ml_runs`
Maintains MLOps history for model tracking.
* **Fields**: `id` (PK), `dataset_size` (INTEGER), `model_type` (TEXT), `accuracy` (REAL), `status` (TEXT), `started_at` (TEXT).

---

## 🔗 API Route Reference

### 🌾 Farm Operations

#### 1. Fetch Current Status
* **Endpoint**: `GET /api/farm-status`
* **Response**: `FarmStatusResponse`
* **Details**: Returns the latest successfully saved farm configuration and its associated insights (including rainfall onset date, germination risk, multi-crop suitability charts, and phase timelines).

#### 2. Run Farm Analysis
* **Endpoint**: `POST /api/analyze-farm`
* **Request Body**: `FarmAnalysisRequest`
  ```json
  {
    "lat": 12.0022,
    "lng": 8.5919,
    "acres": 5.5,
    "soil_type": "Loam",
    "water_source": "Rainfed",
    "selected_crop": "Maize"
  }
  ```
* **Response**: `AnalysisResponse`
* **Details**: Synchronizes weather from Open-Meteo for the coordinates and triggers Google Gemini to generate custom agronomist reports. If Gemini is offline/unconfigured, falls back to deterministic coordinate-seeded heuristics.

---

### 👥 Client Management

#### 1. List All Clients
* **Endpoint**: `GET /api/clients`
* **Response**: `List[ClientResponse]`
* **Details**: Lists registered smallholders sorted by enrollment date.

#### 2. Enroll Client
* **Endpoint**: `POST /api/clients`
* **Request Body**: `ClientCreateRequest`
  ```json
  {
    "name": "Ibrahim Bello",
    "phone": "+234 812 345 6789",
    "crop": "Sorghum",
    "location": "Kano, NG",
    "acres": 4.5
  }
  ```
* **Response**: `{"status": "success"}`
* **Details**: Enrolls a farmer. If phone is set to `"offline"`, status defaults to `"Print Delivery"`; otherwise `"Active SMS"`.

---

### 💬 SMS Dispatch Hub

#### 1. Retrieve Log History
* **Endpoint**: `GET /api/sms-logs`
* **Response**: `List[SMSLogResponse]`
* **Details**: Lists all previously sent text warnings and translated updates.

#### 2. Dispatch Dynamic Advisory
* **Endpoint**: `POST /api/sms`
* **Request Body**: `SMSCreateRequest`
  ```json
  {
    "client_name": "Ibrahim Bello",
    "phone": "+234 812 345 6789",
    "message": "Heavy rain forecast for next Tuesday. Sow fertilizer beforehand."
  }
  ```
* **Response**: `SMSSendResponse`
* **Details**: Sends a text message to the farmer. If a `GEMINI_API_KEY` is configured, it auto-translates the message into **Hausa dialect** and appends it to the dispatch log.

---

### 🧪 Enterprise MLOps

#### 1. Fetch ML Runs
* **Endpoint**: `GET /api/ml-runs`
* **Response**: `List[MLRunResponse]`
* **Details**: Lists details of all historical model-tuning executions.

#### 2. Retrain Classifier
* **Endpoint**: `POST /api/ml-runs`
* **Request Body**: `MLRunRequest`
  ```json
  {
    "dataset_size": 145000,
    "model_type": "Random Forest Crop Classifier"
  }
  ```
* **Response**: `MLRunStartResponse` (including the simulated new accuracy percentage)
* **Details**: Simulates training a crop classification or rainfall LSTM forecasting model over a target dataset size, generating a randomized validation improvement score and saving details to database logs.

---

### 📈 Market Feed

#### 1. Fetch Market Intel
* **Endpoint**: `GET /api/market-prices`
* **Response**: `List[MarketPriceItem]`
* **Details**: Generates live, randomized wholesale crop price quotes (in Nigerian Naira per metric bag) comparing current market pricing to a static baseline price and reporting daily percent fluctuations.

---

## ⚙️ Environment Configuration

Set these keys in your shell or root `.env` file:
* **`GEMINI_API_KEY`**: Key to connect to Google's generative models (`gemini-2.5-flash`) for crop risk evaluation, weather synthesis, and Hausa translation.
* **`SERVE_STATIC`** *(true/false)*: When true, mounts the React static folder `../frontend/dist` to serve pages under FastAPI's root endpoint. This is automatically active inside the production Docker container.

---

## 🚀 Isolated Local Execution

To run the backend independently without starting the Vite frontend:

1. **Navigate to backend**:
   ```bash
   cd backend
   ```
2. **Create & activate virtual environment**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
4. **Boot the server**:
   ```bash
   python3 main.py
   ```
   *The server is active at http://localhost:8000. Interactive Swagger UI is accessible at http://localhost:8000/docs.*
