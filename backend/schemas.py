"""
schemas.py
----------
All Pydantic request / response models used across the API.
Keeping them here prevents circular imports and acts as the
single source of truth for the API contract.
"""

from __future__ import annotations

from typing import Any

from pydantic import BaseModel, Field


# ---------------------------------------------------------------------------
# Farm
# ---------------------------------------------------------------------------

class FarmAnalysisRequest(BaseModel):
    lat:          float = Field(..., description="Latitude of the farm")
    lng:          float = Field(..., description="Longitude of the farm")
    acres:        float = Field(..., gt=0, description="Farm size in acres")
    soil_type:    str   = Field(..., min_length=1)
    water_source: str   = Field(..., min_length=1)
    selected_crop: str  = Field(..., min_length=1)


class FarmStatusResponse(BaseModel):
    lat:          float
    lng:          float
    acres:        float
    soil_type:    str
    water_source: str
    selected_crop: str
    insights:     dict[str, Any]
    updated_at:   str


class AnalysisResponse(FarmStatusResponse):
    status: str = "success"


# ---------------------------------------------------------------------------
# Clients
# ---------------------------------------------------------------------------

class ClientCreateRequest(BaseModel):
    name:     str   = Field(..., min_length=1)
    phone:    str   = Field(..., min_length=1)
    crop:     str   = "Unassigned"
    location: str   = "Pending Setup"
    acres:    float = Field(0.0, ge=0)


class ClientResponse(BaseModel):
    id:         int
    name:       str
    phone:      str
    crop:       str
    location:   str
    acres:      float
    status:     str
    updated_at: str


# ---------------------------------------------------------------------------
# SMS
# ---------------------------------------------------------------------------

class SMSCreateRequest(BaseModel):
    client_name: str = Field(..., min_length=1)
    phone:       str = Field(..., min_length=1)
    message:     str = Field(..., min_length=1)


class SMSLogResponse(BaseModel):
    id:          int
    client_name: str
    phone:       str
    message:     str
    status:      str
    sent_at:     str


class SMSSendResponse(BaseModel):
    status:  str = "success"
    message: str


# ---------------------------------------------------------------------------
# ML Runs
# ---------------------------------------------------------------------------

class MLRunRequest(BaseModel):
    dataset_size: int = Field(..., gt=0)
    model_type:   str = Field(..., min_length=1)


class MLRunResponse(BaseModel):
    id:           int
    dataset_size: int
    model_type:   str
    accuracy:     float
    status:       str
    started_at:   str


class MLRunStartResponse(BaseModel):
    status:       str = "success"
    new_accuracy: float


# ---------------------------------------------------------------------------
# Market
# ---------------------------------------------------------------------------

class MarketPriceItem(BaseModel):
    crop:          str
    base_price:    int
    current_price: int
    change:        float


# ---------------------------------------------------------------------------
# Weather (embedded in farm insights)
# ---------------------------------------------------------------------------

class WeatherSummaryItem(BaseModel):
    max_temp:        float   # °C – predicted peak temperature over next 7 days
    wind_speed:      float   # km/h – average wind speed
    pest_risk_level: str     # 'Low' | 'Medium' | 'High'
    pest_risk_pct:   int     # 0-100 probability


# ---------------------------------------------------------------------------
# Regional Summary (aggregated from DB)
# ---------------------------------------------------------------------------

class RegionalZone(BaseModel):
    region:        str
    total_acreage: float
    risk_score:    int      # 0-100 derived from average yield_risk_alert
    client_count:  int


class RegionalSummaryResponse(BaseModel):
    total_acreage:  float
    total_agents:   int
    critical_region: str
    zones:          list[RegionalZone]
