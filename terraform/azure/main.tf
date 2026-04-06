terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

# ----------------------------------------------------
# 1. Resource Group
# ----------------------------------------------------
resource "azurerm_resource_group" "rg" {
  name     = "devops-multi-cloud-rg"
  location = var.azure_location
}

# ----------------------------------------------------
# 2. Azure Kubernetes Service (AKS)
# ----------------------------------------------------
module "aks" {
  source  = "Azure/aks/azurerm"
  version = "~> 7.0"

  prefix              = "devops"
  cluster_name        = "devops-aks-cluster"
  kubernetes_version  = "1.28"
  resource_group_name = azurerm_resource_group.rg.name
  
  network_plugin      = "azure"
  
  agents_count        = 2
  agents_size         = "Standard_D2s_v3"
  
  identity_type       = "SystemAssigned"
}
