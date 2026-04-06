output "aks_cluster_name" {
  description = "AKS cluster name"
  value       = module.aks.aks_name
}

output "aks_resource_group_name" {
  description = "Resource Group for AKS"
  value       = azurerm_resource_group.rg.name
}
