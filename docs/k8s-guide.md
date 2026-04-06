# Kubernetes Setup Guide for Windows

If you don't have Kubernetes installed, follow these steps to enable it on your Windows machine using **Docker Desktop**. This is the most professional and easiest way for a DevOps portfolio.

## 1. Enable Kubernetes in Docker Desktop
1.  Open **Docker Desktop**.
2.  Click the **Settings** (gear icon) in the top right.
3.  Select **Kubernetes** from the left menu.
4.  Check the box: **Enable Kubernetes**.
5.  Click **Apply & Restart**.
6.  Docker will download the Kubernetes components. This may take 5-10 minutes.

## 2. Verify Installation
Open a terminal (PowerShell or CMD) and run:
```bash
kubectl get nodes
```
If you see `docker-desktop` with a status of `Ready`, you are good to go!

## 3. What is Kubernetes (K8s)?
Think of Docker like a single ship carrying a container. **Kubernetes** is the **Port Authority** or **Fleet Admiral**. It manages hundreds of ships (containers), ensuring that if one ship sinks (crashes), a new one replaces it instantly.

**In this project:**
- If you crash the backend (`/api/fault/crash`), Kubernetes sees that the "ship has sunk" and automatically starts a new one within seconds. This is called **Self-Healing**.

## 4. Helpful Tools (Optional but Recommended)
- **Lens Desktop**: A professional GUI to see your Kubernetes cluster in real-time. [Download here](https://k8slens.dev/).
