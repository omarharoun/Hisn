# Development Environment Outputs

output "cluster_name" {
  description = "EKS cluster name"
  value       = module.skillpath.cluster_name
}

output "cluster_endpoint" {
  description = "EKS cluster endpoint"
  value       = module.skillpath.cluster_endpoint
}

output "application_url" {
  description = "Application URL"
  value       = module.skillpath.application_url
}

output "grafana_endpoint" {
  description = "Grafana dashboard URL"
  value       = module.skillpath.grafana_endpoint
}

output "grafana_admin_password" {
  description = "Grafana admin password"
  value       = module.skillpath.grafana_admin_password
  sensitive   = true
}

output "kubectl_config_command" {
  description = "Command to configure kubectl"
  value       = "aws eks update-kubeconfig --region us-west-2 --name ${module.skillpath.cluster_name}"
}