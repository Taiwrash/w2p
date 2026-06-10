"""
routers/farm.py
---------------
Endpoints related to individual farm setup and AI-driven analysis.
"""

from __future__ import annotations

import json
import os
from datetime import datetime

from fastapi import APIRouter, HTTPException

from database import get_db
from schemas import AnalysisResponse, FarmAnalysisRequest, FarmStatusResponse
from services import (
    call_gemini_farm_analysis,
    fetch_weather_summary,
    generate_fallback_insights,
)

router = APIRouter(prefix="/api", tags=["Farm"])


@router.get(
    "/farm-status",
    response_model=FarmStatusResponse,
    summary="Fetch the most-recently saved farm configuration.",
)
def get_farm_status() -> dict:
    with get_db() as conn:
        row = conn.execute(
            "SELECT * FROM farms ORDER BY id DESC LIMIT 1"
        ).fetchone()

    if not row:
        raise HTTPException(status_code=404, detail="No farm data found.")

    return {
        "lat":          row["lat"],
        "lng":          row["lng"],
        "acres":        row["acres"],
        "soil_type":    row["soil_type"],
        "water_source": row["water_source"],
        "selected_crop": row["selected_crop"],
        "insights":     json.loads(row["insights"]),
        "updated_at":   row["updated_at"],
    }


@router.post(
    "/analyze-farm",
    response_model=AnalysisResponse,
    summary="Run micro-climate sync and Gemini AI analysis for the supplied farm.",
)
def analyze_farm(payload: FarmAnalysisRequest) -> dict:
    api_key = os.environ.get("GEMINI_API_KEY")

    # 1. Fetch live weather data
    weather_summary = fetch_weather_summary(payload.lat, payload.lng)

    # 2. Try Gemini; fall back to heuristics
    insights = None
    if api_key:
        insights = call_gemini_farm_analysis(
            lat=payload.lat,
            lng=payload.lng,
            acres=payload.acres,
            soil_type=payload.soil_type,
            water_source=payload.water_source,
            selected_crop=payload.selected_crop,
            weather_summary=weather_summary,
            api_key=api_key,
        )

    if not insights:
        insights = generate_fallback_insights(
            lat=payload.lat,
            lng=payload.lng,
            soil_type=payload.soil_type,
            water_source=payload.water_source,
            selected_crop=payload.selected_crop,
        )

    # 3. Persist
    now = datetime.now().isoformat()
    with get_db() as conn:
        conn.execute(
            "INSERT INTO farms "
            "(lat, lng, acres, soil_type, water_source, selected_crop, insights, updated_at) "
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (
                payload.lat, payload.lng, payload.acres,
                payload.soil_type, payload.water_source,
                payload.selected_crop, json.dumps(insights), now,
            ),
        )

    return {
        "status":       "success",
        "lat":          payload.lat,
        "lng":          payload.lng,
        "acres":        payload.acres,
        "soil_type":    payload.soil_type,
        "water_source": payload.water_source,
        "selected_crop": payload.selected_crop,
        "insights":     insights,
        "updated_at":   now,
    }
