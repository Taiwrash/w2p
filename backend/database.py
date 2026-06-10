"""
database.py
-----------
SQLite connection factory and schema / seed initialisation.
Called once at application startup via the FastAPI lifespan hook.
"""

import json
import os
import sqlite3
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "w2p.db")

# ---------------------------------------------------------------------------
# Connection factory
# ---------------------------------------------------------------------------

def get_db() -> sqlite3.Connection:
    """Return a new SQLite connection with row-factory set."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


# ---------------------------------------------------------------------------
# Schema creation
# ---------------------------------------------------------------------------

_CREATE_FARMS = """
CREATE TABLE IF NOT EXISTS farms (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    lat          REAL    NOT NULL,
    lng          REAL    NOT NULL,
    acres        REAL    NOT NULL,
    soil_type    TEXT    NOT NULL,
    water_source TEXT    NOT NULL,
    selected_crop TEXT   NOT NULL,
    insights     TEXT    NOT NULL,
    updated_at   TEXT    NOT NULL
)"""

_CREATE_CLIENTS = """
CREATE TABLE IF NOT EXISTS clients (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT    NOT NULL,
    phone      TEXT    NOT NULL,
    crop       TEXT    NOT NULL DEFAULT 'Unassigned',
    location   TEXT    NOT NULL DEFAULT 'Pending Setup',
    acres      REAL    NOT NULL DEFAULT 0,
    status     TEXT    NOT NULL,
    updated_at TEXT    NOT NULL
)"""

_CREATE_SMS_LOGS = """
CREATE TABLE IF NOT EXISTS sms_logs (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    client_name TEXT NOT NULL,
    phone       TEXT NOT NULL,
    message     TEXT NOT NULL,
    status      TEXT NOT NULL DEFAULT 'Delivered',
    sent_at     TEXT NOT NULL
)"""

_CREATE_ML_RUNS = """
CREATE TABLE IF NOT EXISTS ml_runs (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    dataset_size INTEGER NOT NULL,
    model_type   TEXT    NOT NULL,
    accuracy     REAL    NOT NULL,
    status       TEXT    NOT NULL DEFAULT 'Completed',
    started_at   TEXT    NOT NULL
)"""


# ---------------------------------------------------------------------------
# Seed data
# ---------------------------------------------------------------------------

_DEFAULT_INSIGHTS = {
    "crop_suitability": [
        {"name": "Maize (Drought-Resistant)", "likelihood": 92, "risk": 8,  "fill": "#00E396"},
        {"name": "Sorghum",                  "likelihood": 85, "risk": 15, "fill": "#008FFB"},
        {"name": "Cassava",                  "likelihood": 78, "risk": 22, "fill": "#FFB020"},
        {"name": "Beans",                    "likelihood": 65, "risk": 35, "fill": "#FF5630"},
        {"name": "Millet",                   "likelihood": 50, "risk": 50, "fill": "#8A2BE2"},
    ],
    "rainfall_onset_date":       "Mar 15",
    "rainfall_onset_confidence": 88,
    "germination_risk":          8,
    "soil_moisture_est":         42,
    "yield_risk_alert":          22,
    "rainfall_forecast": [
        {"date": "Mar 01", "lstmPredict": 12, "historical": 10, "confidence": 90},
        {"date": "Mar 08", "lstmPredict": 25, "historical": 18, "confidence": 85},
        {"date": "Mar 15", "lstmPredict": 45, "historical": 35, "confidence": 88},
        {"date": "Mar 22", "lstmPredict": 50, "historical": 40, "confidence": 82},
        {"date": "Mar 29", "lstmPredict": 30, "historical": 45, "confidence": 75},
        {"date": "Apr 05", "lstmPredict": 15, "historical": 30, "confidence": 70},
        {"date": "Apr 12", "lstmPredict":  8, "historical": 20, "confidence": 65},
    ],
    "yield_projections": [
        {"stage": "Germination",    "projectedRisk": 12, "historicalRisk": 25},
        {"stage": "Vegetative",     "projectedRisk": 18, "historicalRisk": 30},
        {"stage": "Flowering",      "projectedRisk": 35, "historicalRisk": 50},
        {"stage": "Yield Formation","projectedRisk": 20, "historicalRisk": 40},
        {"stage": "Ripening",       "projectedRisk": 10, "historicalRisk": 15},
    ],
    "action_plan_phases": [
        {
            "phase_num":   1,
            "title":       "Land Clearing & Prep",
            "description": "Prior to the forecasted onset of rains on Mar 15, clear acreage and prepare beds. Since you are working with Loam soil, deep plowing is recommended to aid moisture penetration.",
            "status":      "In Progress",
            "dates":       "Mar 01 - Mar 10",
        },
        {
            "phase_num":   2,
            "title":       "Sow Maize (Drought-Resistant) Seeds",
            "description": "The AI identifies this as the optimal window. The combined probability of sustained moisture exceeding evaporation rates hits the 95% threshold.",
            "status":      "High Priority",
            "dates":       "Mar 15 - Mar 20",
        },
        {
            "phase_num":   3,
            "title":       "First Top-Dressing Fertilizer",
            "description": "Timed perfectly prior to the Week 3 predicted rain surge (45 mm). Ensures maximum nutrient dissolution and root absorption based on your Rainfed infrastructure.",
            "status":      "Scheduled",
            "dates":       "Apr 05 - Apr 12",
        },
    ],
}

_DEFAULT_CLIENTS = [
    ("Ojo Adebayo",  "+234 801 234 5678",   "Maize",   "Kano, NG",   5.0,  "Active SMS"),
    ("Fatima Yusuf", "+234 802 345 6789",   "Sorghum", "Kaduna, NG", 12.0, "Active SMS"),
    ("Chidi Okafor", "Offline / Print-Only","Cassava", "Enugu, NG",  3.0,  "Print Delivery"),
    ("Amaka Nnwoke", "+234 804 567 8901",   "Maize",   "Oyo, NG",    8.0,  "Active SMS"),
]

_DEFAULT_SMS = [
    (
        "Kano Cluster",
        "+234 801 234 5678",
        "W2P: An yi hasashen ruwan sama da iska mai karfi a Kano gobe. Da fatan za a tabbatar an kare amfanin gona da ke da rauni.",
        "Delivered",
    ),
    (
        "Enugu Cluster",
        "+234 803 123 4567",
        "W2P: Soil moisture in Enugu has reached optimal 45%. Recommended to begin top-dressing fertilizer application today.",
        "Pending",
    ),
]

_DEFAULT_ML_RUNS = [
    (50_000,  "XGBoost Crop Classifier",      89.2, "Completed"),
    (120_000, "LSTM Rainfall Forecasting Model", 91.5, "Completed"),
]


# ---------------------------------------------------------------------------
# Public init function
# ---------------------------------------------------------------------------

def init_db() -> None:
    """Create tables and populate seed data if the database is empty."""
    conn = get_db()
    cur  = conn.cursor()

    # Create tables
    for ddl in (_CREATE_FARMS, _CREATE_CLIENTS, _CREATE_SMS_LOGS, _CREATE_ML_RUNS):
        cur.execute(ddl)
    conn.commit()

    now = datetime.now().isoformat()

    # Seed clients
    if cur.execute("SELECT COUNT(*) FROM clients").fetchone()[0] == 0:
        cur.executemany(
            "INSERT INTO clients (name, phone, crop, location, acres, status, updated_at) "
            "VALUES (?, ?, ?, ?, ?, ?, ?)",
            [(*row, now) for row in _DEFAULT_CLIENTS],
        )

    # Seed SMS logs
    if cur.execute("SELECT COUNT(*) FROM sms_logs").fetchone()[0] == 0:
        cur.executemany(
            "INSERT INTO sms_logs (client_name, phone, message, status, sent_at) "
            "VALUES (?, ?, ?, ?, ?)",
            [(*row, now) for row in _DEFAULT_SMS],
        )

    # Seed ML runs
    if cur.execute("SELECT COUNT(*) FROM ml_runs").fetchone()[0] == 0:
        cur.executemany(
            "INSERT INTO ml_runs (dataset_size, model_type, accuracy, status, started_at) "
            "VALUES (?, ?, ?, ?, ?)",
            [(*row, now) for row in _DEFAULT_ML_RUNS],
        )

    # Seed farm
    if cur.execute("SELECT COUNT(*) FROM farms").fetchone()[0] == 0:
        cur.execute(
            "INSERT INTO farms (lat, lng, acres, soil_type, water_source, selected_crop, insights, updated_at) "
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (-1.2921, 36.8219, 5.0, "Loam", "Rainfed", "Maize (Drought-Resistant)",
             json.dumps(_DEFAULT_INSIGHTS), now),
        )

    conn.commit()
    conn.close()
