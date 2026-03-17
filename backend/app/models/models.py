# Main Table  
from sqlalchemy import Column, Integer, String
from ..db.database import Base

class TeamMember(Base):

    __tablename__ = "team_members"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    role = Column(String)
    bio = Column(String)
    photo_url = Column(String, default="https://ui-avatars.com/api/?name=Team+Member&background=random")
    linkedin_url = Column(String, nullable=True)
    github_url = Column(String(500), nullable=True)