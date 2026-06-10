"""
routers/market.py
-----------------
Live (simulated) market-price intelligence endpoint.
"""

from __future__ import annotations

import random
from typing import List

from fastapi import APIRouter

from schemas import MarketPriceItem

router = APIRouter(prefix="/api", tags=["Market"])

_BASE_PRICES: dict[str, int] = {
    "Maize":   380,
    "Sorghum": 420,
    "Cassava": 250,
    "Beans":   620,
    "Millet":  490,
}


@router.get(
    "/market-prices",
    response_model=List[MarketPriceItem],
    summary="Fetch simulated live wholesale market prices.",
)
def get_market_prices() -> list:
    results = []
    for crop, base in _BASE_PRICES.items():
        change_pct = round(random.uniform(-4.0, 6.0), 1)
        current    = int(base * (1 + change_pct / 100))
        results.append(
            MarketPriceItem(
                crop=crop,
                base_price=base,
                current_price=current,
                change=change_pct,
            )
        )
    return results
