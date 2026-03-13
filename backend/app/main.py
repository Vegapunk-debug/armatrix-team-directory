from fastapi import FastAPI
from dotenv import load_dotenv

from . import models
from .database import engine

load_dotenv()

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Armatrix Team Directory API",
    description="Core backend services and database management for Armatrix.",
    version="1.0.0"
)

@app.get("/")
def health_check():
    return {
        "status": "online",
        "project": "Armatrix Team Directory",
        "version": "1.0.0"
    }