from pydantic import BaseModel
from typing import Optional

class TeamMemberCreate(BaseModel):
    name: str
    role: str
    bio: str
    photo_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None 

class TeamMemberResponse(TeamMemberCreate):
    id: int

    class Config:
        from_attributes = True


        