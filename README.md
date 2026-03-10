<div align="center">

  # **Armatrix Team Directory**
  <p><strong>A high-performance, full-stack team management interface engineered for the innovators in deep-tech robotics.</strong></p>

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
| **Frontend Live** | `[Vercel URL]` |
| **Backend API** | `[Render URL]` |
| **API Docs (Swagger)**| `[Render URL /docs]` |

---

## Requirements Fulfillment Matrix

I designed this project to strictly adhere to the assignment parameters while adding production-ready polish.

| Armatrix Requirement | My Implementation |
| :--- | :--- |
| **REST endpoints (Fetch, Add, Edit, Delete)** | Fully implemented via FastAPI with standard HTTP methods (GET, POST, PUT, DELETE). |
| **Flexible Team Member Schema** | Built using Pydantic models. Includes `id`, `name`, `role`, `bio`, `photo_url`, and `linkedin_url`. |
| **Data Storage (In-memory or DB)** | Exceeded baseline: Implemented a relational **SQLite database** using SQLAlchemy for actual data persistence. |
| **Frontend React + Next.js `/team` page** | Built a modular Next.js application with a dedicated `/team` route to fetch and render the API data. |
| **Brand Feel & Quality Taste** | Extracted exact typography and brand colors directly from `armatrix.in` for native consistency. |
| **Responsive Design** | 100% responsive using Tailwind CSS (Mobile, Tablet, and Desktop breakpoints). |
| **Creative Flourishes** | Integrated `framer-motion` for smooth, staggered card reveals and premium hover interactions. |
| **Free Tier Deployment** | Deployed seamlessly across **Vercel** (FE) and **Render** (BE). |

---

## System Architecture


The project uses a **Monorepo** structure to keep client and server code tightly coupled for easier review. 
* **Frontend:** Next.js (App Router), Tailwind CSS, Framer Motion, Axios.
* **Backend:** Python, FastAPI

---

