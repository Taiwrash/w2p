"""
routers/mlops.py
----------------
Enterprise MLOps endpoints – ML run history and model re-training trigger.
"""

from __future__ import annotations

import random
from datetime import datetime
from typing import List

from fastapi import APIRouter

from database import get_db
from schemas import MLRunRequest, MLRunResponse, MLRunStartResponse

router = APIRouter(prefix="/api", tags=["MLOps"])


@router.get(
    "/ml-runs",
    response_model=List[MLRunResponse],
    summary="List all past ML training runs.",
)
def list_ml_runs() -> list:
    with get_db() as conn:
        rows = conn.execute(
            "SELECT * FROM ml_runs ORDER BY id DESC"
        ).fetchall()
    return [dict(r) for r in rows]


@router.post(
    "/ml-runs",
    response_model=MLRunStartResponse,
    summary="Trigger a new simulated ML training run.",
    status_code=201,
)
def start_ml_run(payload: MLRunRequest) -> dict:
    improvement  = random.uniform(0.1, 1.8)
    new_accuracy = round(min(99.4, 89.0 + improvement), 1)

    with get_db() as conn:
        conn.execute(
            "INSERT INTO ml_runs "
            "(dataset_size, model_type, accuracy, status, started_at) "
            "VALUES (?, ?, ?, ?, ?)",
            (
                payload.dataset_size, payload.model_type,
                new_accuracy, "Completed", datetime.now().isoformat(),
            ),
        )

    return {"status": "success", "new_accuracy": new_accuracy}
