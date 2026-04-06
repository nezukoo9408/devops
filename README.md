# AI-Driven Self-Healing Multi-Cloud DevOps Platform

A production-ready full-stack application designed to showcase advanced DevOps, SRE, and Platform Engineering capabilities.

## 🚀 Overview

This repository contains a modern e-commerce application ("DevOpsShop") built with a modular architecture, ready for containerization, orchestration, and automated fault recovery.

### Key Features
- **Full-Stack App**: React (Frontend) + Express (Backend) + MySQL (Database).
- **Dockerized**: Multi-stage builds for optimized images.
- **K8s Orchestrated**: Deployments, Services, and Health Checks.
- **Self-Healing Demo**: Integrated fault injection (crash/latency) to test K8s recovery and ML monitoring.
- **Multi-Cloud Ready**: Agnostic manifests for EKS, AKS, or GKE.
- **Observability**: Built-in `/metrics` and `/health` endpoints.

---

## 🏗️ Project Structure

```text
/backend      - Node.js Express API
/frontend     - React (Vite) + Tailwind CSS
/k8s          - Kubernetes Manifests (Deployments, Services)
/docker       - Dockerfiles for environment consistency
/ci-cd        - GitHub Actions Workflow boilerplate
/ml-module    - Python Anomaly Detection script
/docs         - Architecture and design documentation
```

---

## 🛠️ Quick Start

### Prerequisites
- Node.js (v20+)
- Docker & Docker Compose
- Python 3.x (for ML module)

### Local Development (Docker Compose)
1. Clone the repository.
2. Run the full stack:
   ```bash
   docker-compose up --build
   ```
3. Access the app:
   - Frontend: `http://localhost:80`
   - Backend API: `http://localhost:5000`

### Kubernetes Deployment
1. Create a namespace: `kubectl create ns devops-demo`
2. Apply manifests: `kubectl apply -f k8s/ -n devops-demo`
3. Verify pods: `kubectl get pods -n devops-demo`

---

## 🤖 Self-Healing & Fault Simulation Demo

This project is built to demonstrate Kubernetes' self-healing capabilities using integrated fault-injection endpoints.

> **Note:** The commands below assume you are running Kubernetes and have the backend port-forwarded:
> `kubectl port-forward service/backend-service 9001:5000`

### Scenario 1: Total Pod Crash (Liveness Probe Test)
This tests Kubernetes' ability to detect a dead process and restart the pod automatically.
1. Open a terminal and watch your pods live:
   ```bash
   kubectl get pods -w
   ```
2. Trigger a fatal crash via the backend fault endpoint (forces `process.exit(1)`):
   ```bash
   curl.exe -X POST http://localhost:9001/api/fault/crash
   ```
3. **Observe**: In your `kubectl get pods -w` terminal, you will see the backend pod transition to `Error` and then immediately restart. The `RESTARTS` count will increase by 1, demonstrating zero-downtime recovery.

### Scenario 2: High Latency (Readiness Probe Test)
This tests Kubernetes' ability to stop sending traffic to a struggling pod until it recovers.
1. Trigger the latency fault (adds 1-3 seconds of artificial delay to all requests):
   ```bash
   curl.exe -X POST http://localhost:9001/api/fault/latency
   ```
2. Check the Events of the backend pod:
   ```bash
   kubectl describe pod -l app=backend
   ```
3. **Observe**: Kubernetes will detect that the `/health` endpoint is taking too long (exceeding the probe's 1-second timeout limit). It will mark the pod as `Unready` (changing from `1/1` to `0/1` READY state). Nginx will temporarily stop routing traffic to this struggling pod.
4. Run the curl command again to **disable** the latency simulation and watch the pod become `Ready` again!

## 🛡️ Multi-Cloud Scaling
To scale the application across clouds, use a Global Load Balancer (like AWS Route53 or Azure Front Door) pointing to the respective Ingress IPs provided in the `/k8s` configuration.

---

## 📜 License
MIT License. Built for Portfolio and DevOps Demonstrations.



cd "C:\Users\USER\Downloads\devops (2)\devops"
#Build and start the containers
docker-compose up --build
open new terminal then 
docker exec devops-backend-service-1 node seed.js
curl.exe http://localhost:5001/health   # to chech backend health
curl.exe http://localhost:5001/api/products  # to chechk products are loaded or not 
http://localhost  go to this link for frontend 


# Test the Self-Healing Demo (Bonus)
# Since everything is working, you can now demo the K8s self-healing fault simulation locally. In your terminal:
# Toggle Latency (adds 1-3 sec delay to all requests):


curl.exe -X POST http://localhost:5001/api/fault/latency



# Run it again to turn it off.
# Crash the backend (Docker auto-restarts it in seconds):

curl.exe -X POST http://localhost:5001/api/fault/crash

to resotr 
docker ps



Testing the AI Monitoring Module
1. Open a new terminal and run the script:

# bash
cd "C:\Users\USER\Downloads\devops (2)\devops\ml-module"
pip install requests
python anomaly_detector.py


You will see it start printing: [2026-04-03 20:25:00] 🟢 Service Healthy | Latency: 0.02s Leave this terminal open and running.

2. Trigger the Latency Fault (Yellow Anomaly) Go to your original terminal and turn on latency:

# bash
curl.exe -X POST http://localhost:5001/api/fault/latency

Watch the Python terminal! You will see it suddenly realize the server is behaving badly: [2026-04-03 20:25:10] 🟡 ANOMALY DETECTED: High Latency | Latency: 2.15s

3. Trigger the Crash Fault (Red Anomaly) Now completely crash the server:

# bash
curl.exe -X POST http://localhost:5001/api/fault/crash

Watch the Python terminal. It will instantly catch that the backend fell offline: [2026-04-03 20:25:20] 🔴 ANOMALY DETECTED: Service Unreachable | Error: ...

(In a real production environment, this Python script would then send a webhook to Kubernetes or PagerDuty to page an engineer or forcefully reboot a frozen server cluster).


