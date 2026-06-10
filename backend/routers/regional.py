"""
routers/regional.py
-------------------
Enterprise regional summary endpoint – aggregates live client and farm data
into zone-level statistics so the frontend has real, not hardcoded, numbers.
"""

from __future__ import annotations

import json
from collections import defaultdict

from fastapi import APIRouter

from database import get_db
from schemas import RegionalSummaryResponse, RegionalZone

router = APIRouter(prefix="/api", tags=["Regional"])

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

_LOCATION_TO_ZONE: dict[str, str] = {
    "kano":     "Northern Zone",
    "kaduna":   "Northern Zone",
    "sokoto":   "Northern Zone",
    "katsina":  "Northern Zone",
    "abuja":    "Central Belt",
    "niger":    "Central Belt",
    "benue":    "Central Belt",
    "kwara":    "Central Belt",
    "enugu":    "Eastern Highlands",
    "anambra":  "Eastern Highlands",
    "ebonyi":   "Eastern Highlands",
    "imo":      "Eastern Highlands",
    "rivers":   "Southern Rivers",
    "delta":    "Southern Rivers",
    "bayelsa":  "Southern Rivers",
    "lagos":    "Southern Rivers",
    "oyo":      "Southern Rivers",
}

def _location_to_zone(location: str) -> str:
    """Map a client location string to a broad regional zone."""
    loc_lower = location.lower()
    for keyword, zone in _LOCATION_TO_ZONE.items():
        if keyword in loc_lower:
            return zone
    return "Other Regions"


# ---------------------------------------------------------------------------
# Route
# ---------------------------------------------------------------------------

@router.get(
    "/regional-summary",
    response_model=RegionalSummaryResponse,
    summary="Aggregate live client and farm data into regional zone statistics.",
)
def get_regional_summary() -> dict:
    with get_db() as conn:
        clients = conn.execute("SELECT location, acres FROM clients").fetchall()
        farms   = conn.execute(
            "SELECT insights FROM farms ORDER BY id DESC"
        ).fetchall()

    # ── Zone aggregation ────────────────────────────────────────────────────
    zone_acreage: dict[str, float] = defaultdict(float)
    zone_clients: dict[str, int]   = defaultdict(int)

    for c in clients:
        zone = _location_to_zone(c["location"])
        zone_acreage[zone] += c["acres"]
        zone_clients[zone] += 1

    # ── Risk scores from farm insights ──────────────────────────────────────
    zone_risks: dict[str, list[int]] = defaultdict(list)
    for f in farms:
        try:
            ins  = json.loads(f["insights"])
            risk = int(ins.get("yield_risk_alert", 20))
            # Assign farm risk to all known zones (macro-level approximation)
            for zone in zone_acreage:
                zone_risks[zone].append(risk)
        except Exception:
            pass

    # ── Build zones list ────────────────────────────────────────────────────
    all_zones = set(zone_acreage) | set(zone_clients)
    if not all_zones:
        all_zones = {"Northern Zone", "Central Belt", "Eastern Highlands", "Southern Rivers"}

    zones = []
    for zone in sorted(all_zones):
        risks = zone_risks.get(zone, [20])
        avg_risk = int(sum(risks) / len(risks)) if risks else 20
        zones.append(RegionalZone(
            region       = zone,
            total_acreage= round(zone_acreage.get(zone, 0.0), 1),
            risk_score   = avg_risk,
            client_count = zone_clients.get(zone, 0),
        ))

    total_acreage  = round(sum(zone_acreage.values()), 1)
    total_agents   = sum(zone_clients.values())
    # Critical = zone with highest risk score that has clients
    critical_zone  = max(
        (z for z in zones if z.client_count > 0),
        key=lambda z: z.risk_score,
        default=RegionalZone(region="N/A", total_acreage=0, risk_score=0, client_count=0),
    )

    return {
        "total_acreage":  total_acreage,
        "total_agents":   total_agents,
        "critical_region": critical_zone.region,
        "zones":          zones,
    }
