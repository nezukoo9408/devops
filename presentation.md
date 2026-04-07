# DevOps E-Commerce Platform - Review 1 Presentation

---

## Slide 1: Title
**DevOps E-Commerce Platform**
*Review 1 Submission*

**Presenter:** Rehan (GitHub: nezukoo9408)

---

## Slide 2: Introduction
**What is the Project?**
- A full-stack E-Commerce web application built for marine and cargo products.
- **Core Functionality:** Enables users to browse products, manage their cart, and complete a full checkout process.
- **DevOps Core Concept:** The application is fully containerized. Nothing runs directly on the host machine; the entire architecture runs cleanly inside Docker containers.

---

## Slide 3: Tools Used
**Tech Stack & DevOps Tooling**
- **Frontend:** React.js initialized with Vite, styled with TailwindCSS, and served over Nginx.
- **Backend:** Node.js with Express REST API, secured using JWT Authentication.
- **Database:** MySQL 8.0, utilizing Docker volumes for persistent data storage.
- **DevOps & CI/CD:** 
  - **Git/GitHub:** Version Control.
  - **Docker & Docker Compose:** Containerization & Orchestration.
  - **Jenkins:** Automation server for the CI/CD pipeline.

---

## Slide 4: Implementation Details
**Architecture & Pipeline Flow**
- **3-Tier Container Architecture:**
  - *Presentation Layer:* React frontend on Port 3010
  - *Application Layer:* Node endpoint on Port 5010
  - *Data Layer:* MySQL on Port 3312
  - All services communicate securely within an isolated Docker internal network (`devops_default`).
- **CI/CD Pipeline (Jenkinsfile):**
  - Automates 4 continuous stages: *Checkout Code* -> *Build App* -> *Docker Build* -> *Deploy Container*.
- **Advanced DevOps Features:**
  - *Self-Healing:* Uses `restart: always` in Docker Compose to auto-restart crashed containers.
  - *Health Monitoring:* Custom `/health` and `/metrics` REST API endpoints.
  - *Fault Simulation:* Built-in endpoint to inject latency and simulate network faults.

---
