# Multi-Cloud Terraform Provisioning

This directory contains the Infrastructure as Code (IaC) templates needed to build out the full Multi-Cloud environment on AWS and Azure.

## Prerequisites
1. [Terraform CLI](https://developer.hashicorp.com/terraform/downloads) installed locally.
2. AWS CLI configured (`aws configure`) with Admin access.
3. Azure CLI configured (`az login`) with a valid subscription.

## 1. Deploying AWS Infrastructure (EKS + RDS)

1. Navigate to the AWS directory:
   ```bash
   cd aws
   ```
2. Initialize Terraform and download the required AWS providers:
   ```bash

   C:\terraform after this use those cmds 

   
   terraform init
   ```
3. Preview the changes:
   ```bash
   terraform plan
   ```
4. Apply the infrastructure:
   ```bash
   terraform apply
   ```
   *Note: You will be prompted to enter a `db_password` for the centralized MySQL RDS instance. Make sure it is strong.*

   password:Asus940821

5. **Save the Output:** Once applied, Terraform will output `rds_endpoint`. Make note of this, as your Kubernetes clusters will need it to connect to the database!
6. **Connect your `kubectl`:** 
   ```bash
   aws eks update-kubeconfig --region us-east-1 --name devops-eks-cluster
   ```

## 2. Deploying Azure Infrastructure (AKS)

1. Navigate to the Azure directory:
   ```bash
   cd ../azure
   ```
2. Initialize and deploy:
   ```bash
   terraform init
   terraform apply
   ```
3. **Connect your `kubectl`:**
   ```bash
   az aks get-credentials --resource-group devops-multi-cloud-rg --name devops-aks-cluster
   ```

## 3. Injecting RDS Credentials into Kubernetes

Before applying your Kubernetes files to your newly created clusters, you must create the K8s Secret containing the RDS details so the `devops-backend` can connect to the database.

Run this command against **both** clusters after successfully connecting via `kubectl`:

```bash
kubectl create secret generic db-credentials \
  --from-literal=db-host="<YOUR_RDS_ENDPOINT_FROM_TERRAFORM>" \
  --from-literal=db-root-password="<YOUR_DB_PASSWORD>" \
  -n devops-demo
```

Now you can run your pipeline or manually deploy the `k8s/` manifests!
