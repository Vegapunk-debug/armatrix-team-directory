from fastapi import FastAPI
from .core.cors import setup_cors
from .api.team_routes import router as team_router
from .db.init_db import init_db, seed_database
from .db.database import SessionLocal

app = FastAPI(
    title="Armatrix Team Directory API",
    description="Core backend services and database management for Armatrix.",
    version="1.0.0"
)#instance fastapi

setup_cors(app)

app.include_router(team_router)


@app.on_event("startup")
def startup_event():
    init_db()
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()
    
@app.get("/")
def health_check():
    return {
        "status": "online",
        "project": "Armatrix Team Directory",
        "version": "1.0.0"
    }