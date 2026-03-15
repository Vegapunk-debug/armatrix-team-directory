from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from dotenv import load_dotenv
import os

from . import models, schemas
from .database import engine, SessionLocal

load_dotenv()

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Armatrix Team Directory API",
    description="Core backend services and database management for Armatrix.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000"),
    "http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def health_check():
    return {
        "status": "online",
        "project": "Armatrix Team Directory",
        "version": "1.0.0"
    }

@app.get("/api/team", response_model=List[schemas.TeamMemberResponse])
def get_team(db: Session = Depends(get_db)):
    return db.query(models.TeamMember).all()


@app.post("/api/team", response_model=schemas.TeamMemberResponse)
def create_team_member(member: schemas.TeamMemberCreate, db: Session = Depends(get_db)):
    db_member = models.TeamMember(**member.model_dump())
    db.add(db_member)
    db.commit()
    db.refresh(db_member)
    return db_member


@app.put("/api/team/{member_id}", response_model=schemas.TeamMemberResponse)
def update_team_member(member_id: int, member: schemas.TeamMemberCreate, db: Session = Depends(get_db)):
    db_member = db.query(models.TeamMember).filter(models.TeamMember.id == member_id).first()
    
    if not db_member:
        raise HTTPException(status_code=404, detail="Team member not found")
    
    for key, value in member.model_dump().items():
        setattr(db_member, key, value)
        
    db.commit()
    db.refresh(db_member)
    return db_member


@app.delete("/api/team/{member_id}")
def delete_team_member(member_id: int, db: Session = Depends(get_db)):
    db_member = db.query(models.TeamMember).filter(models.TeamMember.id == member_id).first()
    
    if not db_member:
        raise HTTPException(status_code=404, detail="Team member not found")
        
    db.delete(db_member)
    db.commit()
    return {"message": f"Team member {member_id} successfully deleted"}