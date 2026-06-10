"""
routers/clients.py
------------------
Farmer-client enrollment and portfolio listing.
"""

from __future__ import annotations

from datetime import datetime
from typing import List

from fastapi import APIRouter

from database import get_db
from schemas import ClientCreateRequest, ClientResponse

router = APIRouter(prefix="/api", tags=["Clients"])


@router.get(
    "/clients",
    response_model=List[ClientResponse],
    summary="List all enrolled farmer-clients.",
)
def list_clients() -> list:
    with get_db() as conn:
        rows = conn.execute(
            "SELECT * FROM clients ORDER BY id DESC"
        ).fetchall()
    return [dict(r) for r in rows]


@router.post(
    "/clients",
    response_model=dict,
    summary="Enroll a new farmer-client.",
    status_code=201,
)
def enroll_client(payload: ClientCreateRequest) -> dict:
    status = (
        "Print Delivery"
        if payload.phone.strip().lower() == "offline"
        else "Active SMS"
    )
    with get_db() as conn:
        conn.execute(
            "INSERT INTO clients "
            "(name, phone, crop, location, acres, status, updated_at) "
            "VALUES (?, ?, ?, ?, ?, ?, ?)",
            (
                payload.name, payload.phone, payload.crop,
                payload.location, payload.acres,
                status, datetime.now().isoformat(),
            ),
        )
    return {"status": "success"}
