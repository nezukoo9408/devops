import requests
import time
import json

# Configuration
BACKEND_URL = "http://localhost:5010"
LATENCY_THRESHOLD = 1.5  # seconds
ERROR_THRESHOLD = 5     # consecutive errors

def check_health():
    try:
        start_time = time.time()
        response = requests.get(f"{BACKEND_URL}/health", timeout=5)
        latency = time.time() - start_time
        
        if response.status_code == 200:
            return True, latency, None
        else:
            return False, latency, f"Status Code: {response.status_code}"
    except Exception as e:
        return False, 0, str(e)

def monitor():
    print(f"--- AI-Driven Monitoring Agent Started ---")
    print(f"Target: {BACKEND_URL}")
    print(f"Thresholds: Latency > {LATENCY_THRESHOLD}s")
    
    consecutive_failures = 0
    
    while True:
        success, latency, error = check_health()
        
        timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
        
        if not success:
            consecutive_failures += 1
            print(f"[{timestamp}] 🔴 ANOMALY DETECTED: Service Unreachable | Error: {error}")
            if consecutive_failures >= ERROR_THRESHOLD:
                print(f"[{timestamp}] ⚠️ SELF-HEALING TRIGGERED: Initiating service restart simulation...")
                # In a real scenario, this would call K8s API or a webhook
                consecutive_failures = 0
        elif latency > LATENCY_THRESHOLD:
            print(f"[{timestamp}] 🟡 ANOMALY DETECTED: High Latency | Latency: {latency:.2f}s")
        else:
            consecutive_failures = 0
            print(f"[{timestamp}] 🟢 Service Healthy | Latency: {latency:.2f}s")
            
        time.sleep(5)

if __name__ == "__main__":
    monitor()
