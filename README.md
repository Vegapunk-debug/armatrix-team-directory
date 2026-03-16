<div align="center">

# **Armatrix Team Directory**
**A high-performance, full-stack team management interface engineered for the innovators in deep-tech robotics.** *Designed and implemented as a modern `/team` page for [Armatrix](https://armatrix.in/).*

  <p>
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" alt="FastAPI" />
    <img src="https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
  </p>
</div>

---

## Quick Links

| Resource | Link |
| :--- | :--- |
| **Frontend Live (Vercel)** | https://armatrix-team-directory.vercel.app/ |
| **Backend API (Render)** | https://armatrix-api-8p2f.onrender.com |
| **API Docs (Swagger)**| https://armatrix-api-8p2f.onrender.com/docs |

---

##  Notable Design Decisions & Architecture

The project uses a monorepo structure to keep client and server code tightly coupled for easier review. Beyond standard CRUD requirements, I implemented several specific architecture decisions to ensure a robust, production-grade user experience:

* **Cloud PostgreSQL Persistence:** Overcame Render's 15-minute ephemeral disk wipes by integrating a fully managed **Neon PostgreSQL** database, complete with a local SQLite fallback for seamless development.
  
* **Leadership Hierarchy & Protection:** Engineered custom sorting to permanently pin the 5 core founders to the top of the grid, conditionally hiding their delete buttons to protect data integrity without requiring auth.
  
* **"Premium SaaS" Aesthetic:** Leveraged `framer-motion` and custom interactive radial glows using Armatrix's signature `#D4FF00` neon accent to deliver a high-end, deep-tech user experience.
---

## Requirements Fulfillment Matrix

I designed this project to strictly adhere to the assignment parameters while adding production-ready polish and backend resilience.

| Armatrix Requirement | My Implementation |
| :--- | :--- |
| **REST endpoints (Fetch, Add, Edit, Delete)** | Fully implemented via FastAPI with standard HTTP methods (GET, POST, PUT, DELETE). |
| **Flexible Team Member Schema** | Built using Pydantic models. Includes `id`, `name`, `role`, `bio`, `photo_url`, `github_url`, and `linkedin_url`. |
| **Data Storage (In-memory or DB)** | Exceeded baseline: Implemented a relational **SQLite database** using SQLAlchemy for actual data persistence. |
| **Frontend React + Next.js `/team` page** | Built a modular Next.js application with a dedicated `/team` route to fetch and render the API data. |
| **Brand Feel & Quality Taste** | Extracted exact typography and brand colors directly from `armatrix.in` for native consistency. |
| **Responsive Design** | 100% responsive using Tailwind CSS (Mobile, Tablet, and Desktop breakpoints). |
| **Creative Flourishes** | Integrated `framer-motion` for smooth, staggered card reveals and dynamic background breathing orbs. |
| **Free Tier Deployment** | Deployed seamlessly across **Vercel** (FE) and **Render** (BE). |

---

##  Local Setup Instructions

Follow these steps to run both the frontend and backend locally on your machine.

### Prerequisites
* Node.js (v18+)
* Python (3.9+)

### 1. Backend Setup (FastAPI)
Open a terminal and navigate to the backend directory:
```bash
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows: venv\Scripts\activate
# On Mac/Linux: source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload
```

### 2. Frontend Setup (React + Nextjs)
Open a terminal and navigate to the frontend directory:
```bash
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

# Thank You 
