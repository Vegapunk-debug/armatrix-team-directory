from fastapi import FastAPI, Depends, HTTPException
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
    # allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000"),
    # "http://localhost:3000", "http://127.0.0.1:3000"],
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"]
)

def seed_database(db: Session):
    core_data = [
        {
            "name": "Pulkit Sinha", 
            "role": "Founding Engineer @ Armatrix",
            "bio": "Building the future of the Armatrix platform.",
            "photo_url": "https://i.postimg.cc/xjhYQFJZ/1771490340284.png",
            "linkedin_url": "https://www.linkedin.com/in/pulkit-sinha-803907200/",
            "github_url": "https://github.com/pulkit-sinha"
        },
        {
            "name": "Vishrant Dave",
            "role": "Co-Founder and CEO @ Armatrix",
            "bio": "Visionary lead at Armatrix.",
            "photo_url": "https://i.postimg.cc/kM8YVjYY/armatrix-ceo.jpg",
            "linkedin_url": "https://www.linkedin.com/in/vishrant-dave/",
            "github_url": "https://github.com/Vishrant-Dave"
        },
        {
            "name": "Prateesh Awasthi",
            "role": "Co-Founder @ Armatrix",
            "bio": "Strategic architect and co-lead.",
            "photo_url": "https://i.postimg.cc/8zr7D6zH/co-found.jpg",
            "linkedin_url": "https://in.linkedin.com/in/prateesh-awasthi-4a5215109/",
            "github_url": "https://github.com/Prateesh-Awasthi"
        },
        {
            "name": "Anushtup Nandy",
            "role": "Founding Engineer @ Armatrix",
            "bio": "Building robotic systems at that intersection",
            "photo_url": "https://i.postimg.cc/Z5VwtnVn/1726092747509.jpg",
            "linkedin_url": "https://www.linkedin.com/in/anushtup-nandy/",
            "github_url": "https://github.com/anushtup-nandy"
        },
        {
            "name": "Ayush Ranjan",
            "role": "Founding Engineer @ Armatrix",
            "bio": "Chief Technology Officer",
            "photo_url": "https://i.postimg.cc/BvzNbyW1/Chief-Technology-Officer.jpg",
            "linkedin_url": "https://www.linkedin.com/in/ayranjan/",
            "github_url": "https://github.com"
        }
        ]
        
    for data in core_data:
        db_member = db.query(models.TeamMember).filter(models.TeamMember.name == data["name"]).first()
        
        if db_member:
            print(f"Updating existing member: {data['name']}")
            for key, value in data.items():
                setattr(db_member, key, value)
        else:
            print(f"Creating new member: {data['name']}")
            new_member = models.TeamMember(**data)
            db.add(new_member)
        
    db.commit()

@app.on_event("startup")
def startup_event():
    models.Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()
    

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
    return db.query(models.TeamMember).order_by(models.TeamMember.id.asc()).all()


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

    protected_names = ["Pulkit Sinha", "Vishrant Dave", "Prateesh Awasthi", "Anushtup Nandy", "Ayush Ranjan"]
    if db_member.name in protected_names:
        raise HTTPException(
            status_code=403, 
            detail="System Protected: This core team member cannot be deleted."
        )
        
    db.delete(db_member)
    db.commit()
    return {"message": f"Team member {member_id} successfully deleted"}