# Outputs for Monitoring Module

output "prometheus_endpoint" {
  description = "Prometheus endpoint URL"
  value       = var.enable_prometheus ? "http://prometheus.monitoring.svc.cluster.local:9090" : null
}

output "grafana_endpoint" {
  description = "Grafana endpoint URL (LoadBalancer)"
  value       = var.enable_grafana ? "http://grafana.monitoring.svc.cluster.local" : null
}

output "grafana_admin_password" {
  description = "Grafana admin password"
  value       = var.enable_grafana ? random_password.grafana_admin_password[0].result : null
  sensitive   = true
}

output "alertmanager_endpoint" {
  description = "Alertmanager endpoint URL"
  value       = var.enable_alertmanager ? "http://alertmanager.monitoring.svc.cluster.local:9093" : null
}

output "loki_endpoint" {
  description = "Loki endpoint URL"
  value       = var.enable_prometheus ? "http://loki.monitoring.svc.cluster.local:3100" : null
}

output "monitoring_namespace" {
  description = "Kubernetes namespace for monitoring components"
  value       = kubernetes_namespace.monitoring.metadata[0].name
}

output "prometheus_service_monitor_selector" {
  description = "Label selector for ServiceMonitors"
  value = {
    app = "skillpath"
  }
}

output "grafana_dashboards" {
  description = "List of Grafana dashboards configured"
  value = var.enable_grafana ? [
    "kubernetes-cluster-monitoring",
    "kubernetes-node-exporter", 
    "skillpath-application"
  ] : []
}

output "alert_rules" {
  description = "List of configured alert rules"
  value = var.enable_prometheus ? [
    "SkillPathHighErrorRate",
    "SkillPathHighLatency",
    "SkillPathLabSessionsHigh",
    "SkillPathDatabaseConnections"
  ] : []
}