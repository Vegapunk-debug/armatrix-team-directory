from fastapi import FastAPI

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