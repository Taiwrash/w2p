"""
services.py
-----------
All external-API calls (Open-Meteo weather, Gemini AI) and the
fallback heuristic generator live here, isolated from route handlers.
"""

from __future__ import annotations

import json
import logging
import os
from typing import Any

import requests

logger = logging.getLogger(__name__)

GEMINI_URL = (
    "https://generativelanguage.googleapis.com/v1beta"
    "/models/gemini-2.5-flash:generateContent"
)
WEATHER_URL = "https://api.open-meteo.com/v1/forecast"


# ---------------------------------------------------------------------------
# Weather
# ---------------------------------------------------------------------------

def fetch_weather_summary(lat: float, lng: float) -> str:
    """
    Fetch 7-day forecast from Open-Meteo.
    Returns a human-readable summary string.
    Falls back to a placeholder message on any error.
    """
    try:
        params = {
            "latitude":  lat,
            "longitude": lng,
            "daily":     "precipitation_sum,temperature_2m_max",
            "timezone":  "auto",
        }
        res = requests.get(WEATHER_URL, params=params, timeout=5)
        res.raise_for_status()
        daily = res.json().get("daily", {})
        times  = daily.get("time", [])
        precips = daily.get("precipitation_sum", [])
        temps   = daily.get("temperature_2m_max", [])
        return "; ".join(
            f"{times[i]}: max {temps[i]}°C, rain {precips[i]} mm"
            for i in range(min(len(times), 7))
        )
    except Exception as exc:
        logger.warning("Open-Meteo unavailable: %s", exc)
        return "Open-Meteo API not reachable. Falling back to local heuristic forecasts."


# ---------------------------------------------------------------------------
# Gemini – farm analysis
# ---------------------------------------------------------------------------

_FARM_SCHEMA_EXAMPLE = """{
  "crop_suitability": [
    {"name": "Maize (Drought-Resistant)", "likelihood": 92, "risk": 8,  "fill": "#00E396"},
    {"name": "Sorghum",                  "likelihood": 85, "risk": 15, "fill": "#008FFB"},
    {"name": "Cassava",                  "likelihood": 78, "risk": 22, "fill": "#FFB020"},
    {"name": "Beans",                    "likelihood": 65, "risk": 35, "fill": "#FF5630"},
    {"name": "Millet",                   "likelihood": 50, "risk": 50, "fill": "#8A2BE2"}
  ],
  "rainfall_onset_date": "Mar 15",
  "rainfall_onset_confidence": 88,
  "germination_risk": 8,
  "soil_moisture_est": 42,
  "yield_risk_alert": 22,
  "weather_data": {
    "max_temp": 31.0,
    "wind_speed": 12.5,
    "pest_risk_level": "High",
    "pest_risk_pct": 72
  },
  "rainfall_forecast": [
    {"date": "Mar 01", "lstmPredict": 12, "historical": 10, "confidence": 90},
    {"date": "Mar 08", "lstmPredict": 25, "historical": 18, "confidence": 85},
    {"date": "Mar 15", "lstmPredict": 45, "historical": 35, "confidence": 88},
    {"date": "Mar 22", "lstmPredict": 50, "historical": 40, "confidence": 82},
    {"date": "Mar 29", "lstmPredict": 30, "historical": 45, "confidence": 75},
    {"date": "Apr 05", "lstmPredict": 15, "historical": 30, "confidence": 70},
    {"date": "Apr 12", "lstmPredict":  8, "historical": 20, "confidence": 65}
  ],
  "yield_projections": [
    {"stage": "Germination",    "projectedRisk": 12, "historicalRisk": 25},
    {"stage": "Vegetative",     "projectedRisk": 18, "historicalRisk": 30},
    {"stage": "Flowering",      "projectedRisk": 35, "historicalRisk": 50},
    {"stage": "Yield Formation","projectedRisk": 20, "historicalRisk": 40},
    {"stage": "Ripening",       "projectedRisk": 10, "historicalRisk": 15}
  ],
  "action_plan_phases": [
    {"phase_num": 1, "title": "Land Clearing & Prep",        "description": "...", "status": "In Progress",   "dates": "Mar 01 - Mar 10"},
    {"phase_num": 2, "title": "Sow <crop> Seeds",            "description": "...", "status": "High Priority", "dates": "Mar 15 - Mar 20"},
    {"phase_num": 3, "title": "First Top-Dressing Fertilizer","description": "...", "status": "Scheduled",    "dates": "Apr 05 - Apr 12"}
  ]
}"""


def call_gemini_farm_analysis(
    lat: float, lng: float, acres: float,
    soil_type: str, water_source: str, selected_crop: str,
    weather_summary: str,
    api_key: str,
) -> dict[str, Any] | None:
    """
    Ask Gemini for farm-specific planting insights.
    Returns parsed JSON dict or None on failure.
    """
    prompt = (
        f"You are an expert agronomist AI for W2P.\n"
        f"Coordinates: Lat {lat}, Lng {lng}\n"
        f"Acreage: {acres}\nSoil Type: {soil_type}\n"
        f"Water Source: {water_source}\nTarget Crop: {selected_crop}\n"
        f"7-day Weather Forecast: {weather_summary}\n\n"
        f"Respond ONLY in valid JSON matching this exact schema "
        f"(no markdown, no extra text):\n{_FARM_SCHEMA_EXAMPLE}\n\n"
        f"Adjust dates and risk values based on current season for "
        f"Lat {lat}, Lng {lng}."
    )
    try:
        res = requests.post(
            GEMINI_URL,
            params={"key": api_key},
            headers={"Content-Type": "application/json"},
            json={
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {"responseMimeType": "application/json"},
            },
            timeout=15,
        )
        res.raise_for_status()
        raw = res.json()["candidates"][0]["content"]["parts"][0]["text"].strip()
        # Strip accidental markdown fences
        if raw.startswith("```"):
            raw = raw.split("```", 2)[-1].lstrip("json").strip().rstrip("`")
        return json.loads(raw)
    except Exception as exc:
        logger.warning("Gemini farm-analysis error: %s", exc)
        return None


def call_gemini_translate(message: str, api_key: str) -> str | None:
    """
    Translate an agricultural advisory message into Hausa dialect.
    Returns the translated string or None on failure.
    """
    prompt = (
        "Translate the following agricultural advisory message into "
        "local Hausa dialect.\n"
        f"Advisory: {message}\n\n"
        "Return ONLY the translated string. No markdown, no explanations."
    )
    try:
        res = requests.post(
            GEMINI_URL,
            params={"key": api_key},
            headers={"Content-Type": "application/json"},
            json={"contents": [{"parts": [{"text": prompt}]}]},
            timeout=10,
        )
        res.raise_for_status()
        return res.json()["candidates"][0]["content"]["parts"][0]["text"].strip()
    except Exception as exc:
        logger.warning("Gemini translation error: %s", exc)
        return None


# ---------------------------------------------------------------------------
# Fallback heuristic generator (no Gemini key / Gemini unavailable)
# ---------------------------------------------------------------------------

def generate_fallback_insights(
    lat: float, lng: float,
    soil_type: str, water_source: str, selected_crop: str,
) -> dict[str, Any]:
    """
    Deterministic, coordinate-seeded insight generator used when
    Gemini is not available.
    """
    lat_h = int(abs(lat) * 1000) % 100
    lng_h = int(abs(lng) * 1000) % 100
    base  = 70 + (lat_h + lng_h) % 25

    # Derive weather metrics from coordinates deterministically
    max_temp     = round(25.0 + (lat_h % 15), 1)
    wind_speed   = round(8.0  + (lng_h % 12), 1)
    pest_risk_pct = 30 + (lat_h % 50)
    if pest_risk_pct >= 65:
        pest_risk_level = "High"
    elif pest_risk_pct >= 35:
        pest_risk_level = "Medium"
    else:
        pest_risk_level = "Low"

    return {
        "crop_suitability": [
            {"name": "Maize (Drought-Resistant)", "likelihood": min(98, base),      "risk": max(2, 100 - base),      "fill": "#00E396"},
            {"name": "Sorghum",                  "likelihood": min(95, base - 5),   "risk": max(5, 105 - base),      "fill": "#008FFB"},
            {"name": "Cassava",                  "likelihood": min(90, base - 10),  "risk": max(10, 110 - base),     "fill": "#FFB020"},
            {"name": "Beans",                    "likelihood": min(85, base - 20),  "risk": max(15, 120 - base),     "fill": "#FF5630"},
            {"name": "Millet",                   "likelihood": min(80, base - 25),  "risk": max(20, 125 - base),     "fill": "#8A2BE2"},
        ],
        "rainfall_onset_date":       "Nov 12" if lat < 0 else "Jun 20",
        "rainfall_onset_confidence": 75 + (lat_h % 20),
        "germination_risk":          5  + (lng_h % 25),
        "soil_moisture_est":         30 + (lat_h % 40),
        "yield_risk_alert":          10 + (lng_h % 30),
        "weather_data": {
            "max_temp":        max_temp,
            "wind_speed":      wind_speed,
            "pest_risk_level": pest_risk_level,
            "pest_risk_pct":   pest_risk_pct,
        },
        "rainfall_forecast": [
            {"date": "Week 1", "lstmPredict": 10 + (lat_h % 10), "historical": 12, "confidence": 90},
            {"date": "Week 2", "lstmPredict": 20 + (lng_h % 15), "historical": 18, "confidence": 85},
            {"date": "Week 3", "lstmPredict": 40 + (lat_h % 20), "historical": 35, "confidence": 88},
            {"date": "Week 4", "lstmPredict": 48 + (lng_h % 10), "historical": 40, "confidence": 82},
            {"date": "Week 5", "lstmPredict": 28 + (lat_h % 12), "historical": 45, "confidence": 75},
            {"date": "Week 6", "lstmPredict": 12 + (lng_h % 8),  "historical": 30, "confidence": 70},
            {"date": "Week 7", "lstmPredict":  6 + (lat_h % 5),  "historical": 20, "confidence": 65},
        ],
        "yield_projections": [
            {"stage": "Germination",    "projectedRisk":  8 + (lat_h % 10), "historicalRisk": 25},
            {"stage": "Vegetative",     "projectedRisk": 12 + (lng_h % 12), "historicalRisk": 30},
            {"stage": "Flowering",      "projectedRisk": 25 + (lat_h % 15), "historicalRisk": 50},
            {"stage": "Yield Formation","projectedRisk": 18 + (lng_h % 10), "historicalRisk": 40},
            {"stage": "Ripening",       "projectedRisk":  8 + (lat_h % 8),  "historicalRisk": 15},
        ],
        "action_plan_phases": [
            {
                "phase_num":   1,
                "title":       "Land Clearing & Prep",
                "description": f"Clear acreage and prepare beds. Since you are working with {soil_type} soil, deep beds capture moisture effectively.",
                "status":      "In Progress",
                "dates":       "Day 01 - Day 10",
            },
            {
                "phase_num":   2,
                "title":       f"Sow {selected_crop} Seeds",
                "description": f"Optimal sowing window predicted by the models. Plant seeds to leverage your {water_source} source.",
                "status":      "High Priority",
                "dates":       "Day 15 - Day 20",
            },
            {
                "phase_num":   3,
                "title":       "First Top-Dressing Fertilizer",
                "description": "Timed prior to predicted precipitation increase to maximise root uptake.",
                "status":      "Scheduled",
                "dates":       "Day 40 - Day 47",
            },
        ],
    }
