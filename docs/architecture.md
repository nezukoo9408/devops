# Architecture Overview

## System Diagram

```mermaid
graph TD
    User((User)) -->|HTTPS| Ingress[Nginx Ingress Controller]
    Ingress -->|Route / | Frontend[React Frontend - Nginx]
    Ingress -->|Route /api| Backend[Node.js Express API]
    
    subgraph Kubernetes Cluster
        Frontend -->|API Calls| Backend
        Backend -->|Query/Write| MySQL[(MySQL Database)]
        
        subgraph Monitoring
            Agent[ML Anomaly Detector] -->|Poll /metrics| Backend
            Agent -->|Flag| AnomalyLog((Anomaly Events))
        end
    end
    
    subgraph Multi-Cloud
        AWS[AWS EKS]
        Azure[Azure AKS]
    end
    
    Developer -->|Push| GitHub[GitHub Repo]
    GitHub -->|Workflow| Actions[GitHub Actions]
    Actions -->|Push Image| DockerHub[DockerHub]
    Actions -->|Deploy| AWS
    Actions -->|Deploy| Azure
```

## Key Components

### 1. Frontend (React/Vite)
- Modern SPA served via Nginx.
- Responsive design with Tailwind CSS.
- Client-side routing.

### 2. Backend (Node.js/Express)
- RESTful API with JWT authentication.
- Integrated metrics and health check endpoints.
- Fault simulation logic for self-healing demos.

### 3. Database (MySQL)
- Relational data modeling with Sequelize.
- Persistent volume storage in Kubernetes.

### 4. Orchestration (Kubernetes)
- Multi-replica deployments for high availability.
- Automated rolling updates.
- Liveness and Readiness probes for self-healing.

### 5. AI/ML Module
- Python-based anomaly detection.
- Simple logic to identify performance degradation or service failure.
