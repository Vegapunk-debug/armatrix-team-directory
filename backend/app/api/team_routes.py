from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..models import models
from ..schemas import schemas
from ..db.dependencies import get_db

router = APIRouter()


@router.get("/api/team", response_model=List[schemas.TeamMemberResponse])
def get_team(db: Session = Depends(get_db)):
    return db.query(models.TeamMember).order_by(models.TeamMember.id.asc()).all()


@router.post("/api/team", response_model=schemas.TeamMemberResponse)
def create_team_member(member: schemas.TeamMemberCreate, db: Session = Depends(get_db)):
    db_member = models.TeamMember(**member.model_dump())
    db.add(db_member)
    db.commit()
    db.refresh(db_member)
    return db_member


@router.put("/api/team/{member_id}", response_model=schemas.TeamMemberResponse)
def update_team_member(member_id: int, member: schemas.TeamMemberCreate, db: Session = Depends(get_db)):
    db_member = db.query(models.TeamMember).filter(models.TeamMember.id == member_id).first()
    
    if not db_member:
        raise HTTPException(status_code=404, detail="Team member not found")
    
    for key, value in member.model_dump().items():
        setattr(db_member, key, value)
        
    db.commit()
    db.refresh(db_member)
    return db_member


@router.delete("/api/team/{member_id}")
def delete_team_member(member_id: int, db: Session = Depends(get_db)):
    db_member = db.query(models.TeamMember).filter(models.TeamMember.id == member_id).first()
    
    if not db_member:
        raise HTTPException(status_code=404, detail="Team member not found")

    if db_member.is_protected:
        raise HTTPException(status_code=403, detail="System Protected: This core team member cannot be deleted.")
        
    db.delete(db_member)
    db.commit()
    return {"message": f"Team member {member_id} successfully deleted"}