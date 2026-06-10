"""
routers/sms.py
--------------
Vernacular SMS dispatch hub – log retrieval and AI-translated send.
"""

from __future__ import annotations

import os
from datetime import datetime
from typing import List

from fastapi import APIRouter

from database import get_db
from schemas import SMSCreateRequest, SMSLogResponse, SMSSendResponse
from services import call_gemini_translate

router = APIRouter(prefix="/api", tags=["SMS"])


@router.get(
    "/sms-logs",
    response_model=List[SMSLogResponse],
    summary="List all sent SMS log entries.",
)
def list_sms_logs() -> list:
    with get_db() as conn:
        rows = conn.execute(
            "SELECT * FROM sms_logs ORDER BY id DESC"
        ).fetchall()
    return [dict(r) for r in rows]


@router.post(
    "/sms",
    response_model=SMSSendResponse,
    summary="Send an advisory SMS, auto-translated to Hausa dialect via Gemini.",
    status_code=201,
)
def send_sms(payload: SMSCreateRequest) -> dict:
    api_key = os.environ.get("GEMINI_API_KEY")

    # Attempt AI translation; fall back to original message
    vernacular = payload.message
    if api_key:
        translated = call_gemini_translate(payload.message, api_key)
        if translated:
            vernacular = f"{payload.message} (Hausa: {translated})"

    with get_db() as conn:
        conn.execute(
            "INSERT INTO sms_logs (client_name, phone, message, status, sent_at) "
            "VALUES (?, ?, ?, ?, ?)",
            (
                payload.client_name, payload.phone,
                vernacular, "Delivered", datetime.now().isoformat(),
            ),
        )

    return {"status": "success", "message": vernacular}
