from sqlalchemy.orm import Session
from .database import engine
from ..models import models

def init_db():
    models.Base.metadata.create_all(bind=engine)#Constructor - table create

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