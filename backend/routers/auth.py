from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

from database import get_db
from schemas import LoginRequest, RegisterRequest, AuthResponse

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/login", response_model=AuthResponse)
def login(req: LoginRequest):
    conn = get_db()
    cur = conn.cursor()
    # Find user by email
    row = cur.execute("SELECT * FROM users WHERE email = ?", (req.email,)).fetchone()
    conn.close()

    if not row or row["password"] != req.password:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    return AuthResponse(
        status="success",
        user={
            "id": row["id"],
            "email": row["email"],
            "name": row["name"],
            "role": row["role"]
        }
    )

@router.post("/register", response_model=AuthResponse)
def register(req: RegisterRequest):
    conn = get_db()
    cur = conn.cursor()
    
    # Check if user already exists
    if cur.execute("SELECT id FROM users WHERE email = ?", (req.email,)).fetchone():
        conn.close()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
        
    try:
        cur.execute(
            "INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)",
            (req.email, req.password, req.name, "farmer")
        )
        conn.commit()
        new_id = cur.lastrowid
    except Exception as e:
        conn.rollback()
        conn.close()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to register user")
        
    conn.close()
    
    return AuthResponse(
        status="success",
        user={
            "id": new_id,
            "email": req.email,
            "name": req.name,
            "role": "farmer"
        }
    )
