# Monitoring Module for SkillPath Platform

terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.11"
    }
  }
}

# Monitoring Namespace
resource "kubernetes_namespace" "monitoring" {
  metadata {
    name = "monitoring"
    labels = {
      name = "monitoring"
    }
  }
}

# Prometheus
resource "helm_release" "prometheus" {
  count = var.enable_prometheus ? 1 : 0

  name       = "prometheus"
  repository = "https://prometheus-community.github.io/helm-charts"
  chart      = "kube-prometheus-stack"
  namespace  = kubernetes_namespace.monitoring.metadata[0].name
  version    = "55.5.0"

  values = [
    yamlencode({
      prometheus = {
        prometheusSpec = {
          storageSpec = {
            volumeClaimTemplate = {
              spec = {
                storageClassName = "gp3"
                accessModes      = ["ReadWriteOnce"]
                resources = {
                  requests = {
                    storage = var.prometheus_storage_size
                  }
                }
              }
            }
          }
          retention = "30d"
          resources = {
            limits = {
              cpu    = "2000m"
              memory = "4Gi"
            }
            requests = {
              cpu    = "1000m"
              memory = "2Gi"
            }
          }
        }
        service = {
          type = "ClusterIP"
        }
      }
      grafana = {
        enabled = var.enable_grafana
        adminPassword = random_password.grafana_admin_password[0].result
        persistence = {
          enabled = true
          size    = var.grafana_storage_size
          storageClassName = "gp3"
        }
        resources = {
          limits = {
            cpu    = "500m"
            memory = "1Gi"
          }
          requests = {
            cpu    = "250m"
            memory = "512Mi"
          }
        }
        service = {
          type = "LoadBalancer"
          annotations = {
            "service.beta.kubernetes.io/aws-load-balancer-type" = "nlb"
            "service.beta.kubernetes.io/aws-load-balancer-internal" = "false"
          }
        }
        dashboardProviders = {
          "dashboardproviders.yaml" = {
            apiVersion = 1
            providers = [{
              name = "default"
              orgId = 1
              folder = ""
              type = "file"
              disableDeletion = false
              editable = true
              options = {
                path = "/var/lib/grafana/dashboards/default"
              }
            }]
          }
        }
        dashboards = {
          default = {
            kubernetes-cluster-monitoring = {
              gnetId = 7249
              revision = 1
              datasource = "Prometheus"
            }
            kubernetes-node-exporter = {
              gnetId = 1860
              revision = 31
              datasource = "Prometheus"
            }
            skillpath-application = {
              json = jsonencode({
                dashboard = {
                  id = null
                  title = "SkillPath Application Metrics"
                  tags = ["skillpath", "application"]
                  timezone = "browser"
                  panels = [
                    {
                      id = 1
                      title = "HTTP Request Rate"
                      type = "graph"
                      targets = [{
                        expr = "rate(http_requests_total[5m])"
                        legendFormat = "{{method}} {{status}}"
                      }]
                    }
                    {
                      id = 2
                      title = "Response Time"
                      type = "graph"
                      targets = [{
                        expr = "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))"
                        legendFormat = "95th percentile"
                      }]
                    }
                    {
                      id = 3
                      title = "Active Lab Sessions"
                      type = "stat"
                      targets = [{
                        expr = "sum(skillpath_active_lab_sessions)"
                        legendFormat = "Active Sessions"
                      }]
                    }
                  ]
                  time = {
                    from = "now-1h"
                    to = "now"
                  }
                  refresh = "30s"
                }
              })
            }
          }
        }
      }
      alertmanager = {
        enabled = var.enable_alertmanager
        config = {
          global = {
            smtp_smarthost = "localhost:587"
            smtp_from = "alerts@skillpath.com"
          }
          route = {
            group_by = ["alertname"]
            group_wait = "10s"
            group_interval = "10s"
            repeat_interval = "1h"
            receiver = "web.hook"
          }
          receivers = [{
            name = "web.hook"
            webhook_configs = [{
              url = "http://localhost:5001/"
            }]
          }]
        }
        storage = {
          volumeClaimTemplate = {
            spec = {
              storageClassName = "gp3"
              accessModes      = ["ReadWriteOnce"]
              resources = {
                requests = {
                  storage = "10Gi"
                }
              }
            }
          }
        }
      }
      nodeExporter = {
        enabled = true
      }
      kubeStateMetrics = {
        enabled = true
      }
      defaultRules = {
        create = true
        rules = {
          alertmanager = true
          etcd = true
          general = true
          k8s = true
          kubeApiserver = true
          kubeApiserverAvailability = true
          kubeApiserverSlos = true
          kubelet = true
          kubePrometheusGeneral = true
          kubePrometheusNodeRecording = true
          kubernetesApps = true
          kubernetesResources = true
          kubernetesStorage = true
          kubernetesSystem = true
          node = true
          prometheus = true
          prometheusOperator = true
        }
      }
    })
  ]

  depends_on = [kubernetes_namespace.monitoring]
}

# Random password for Grafana admin
resource "random_password" "grafana_admin_password" {
  count = var.enable_grafana ? 1 : 0

  length  = 16
  special = true
}

# Kubernetes Secret for Grafana admin password
resource "kubernetes_secret" "grafana_admin" {
  count = var.enable_grafana ? 1 : 0

  metadata {
    name      = "grafana-admin-password"
    namespace = kubernetes_namespace.monitoring.metadata[0].name
  }

  data = {
    admin-password = random_password.grafana_admin_password[0].result
  }

  type = "Opaque"
}

# ServiceMonitor for SkillPath application metrics
resource "kubernetes_manifest" "skillpath_service_monitor" {
  count = var.enable_prometheus ? 1 : 0

  manifest = {
    apiVersion = "monitoring.coreos.com/v1"
    kind       = "ServiceMonitor"
    metadata = {
      name      = "skillpath-app"
      namespace = "monitoring"
      labels = {
        app = "skillpath"
      }
    }
    spec = {
      selector = {
        matchLabels = {
          app = "skillpath"
        }
      }
      endpoints = [{
        port = "metrics"
        path = "/api/metrics"
        interval = "30s"
      }]
      namespaceSelector = {
        matchNames = ["default", "skillpath"]
      }
    }
  }

  depends_on = [helm_release.prometheus]
}

# PrometheusRule for SkillPath application alerts
resource "kubernetes_manifest" "skillpath_prometheus_rules" {
  count = var.enable_prometheus ? 1 : 0

  manifest = {
    apiVersion = "monitoring.coreos.com/v1"
    kind       = "PrometheusRule"
    metadata = {
      name      = "skillpath-alerts"
      namespace = "monitoring"
      labels = {
        app = "skillpath"
      }
    }
    spec = {
      groups = [{
        name = "skillpath.rules"
        rules = [
          {
            alert = "SkillPathHighErrorRate"
            expr  = "rate(http_requests_total{status=~\"5..\"}[5m]) > 0.1"
            for   = "5m"
            labels = {
              severity = "critical"
            }
            annotations = {
              summary     = "High error rate detected"
              description = "SkillPath application is experiencing high error rates"
            }
          },
          {
            alert = "SkillPathHighLatency"
            expr  = "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 1"
            for   = "5m"
            labels = {
              severity = "warning"
            }
            annotations = {
              summary     = "High latency detected"
              description = "SkillPath application response time is above 1 second"
            }
          },
          {
            alert = "SkillPathLabSessionsHigh"
            expr  = "sum(skillpath_active_lab_sessions) > 100"
            for   = "2m"
            labels = {
              severity = "info"
            }
            annotations = {
              summary     = "High number of active lab sessions"
              description = "More than 100 lab sessions are currently active"
            }
          },
          {
            alert = "SkillPathDatabaseConnections"
            expr  = "sum(skillpath_db_connections) > 80"
            for   = "3m"
            labels = {
              severity = "warning"
            }
            annotations = {
              summary     = "High database connection count"
              description = "Database connection pool is near capacity"
            }
          }
        ]
      }]
    }
  }

  depends_on = [helm_release.prometheus]
}

# Loki for log aggregation
resource "helm_release" "loki" {
  count = var.enable_prometheus ? 1 : 0

  name       = "loki"
  repository = "https://grafana.github.io/helm-charts"
  chart      = "loki-stack"
  namespace  = kubernetes_namespace.monitoring.metadata[0].name
  version    = "2.9.11"

  values = [
    yamlencode({
      loki = {
        enabled = true
        persistence = {
          enabled = true
          size    = "50Gi"
          storageClassName = "gp3"
        }
        config = {
          auth_enabled = false
          server = {
            http_listen_port = 3100
          }
          ingester = {
            lifecycler = {
              address = "127.0.0.1"
              ring = {
                kvstore = {
                  store = "inmemory"
                }
                replication_factor = 1
              }
              final_sleep = "0s"
            }
            chunk_idle_period = "5m"
            chunk_retain_period = "30s"
          }
          schema_config = {
            configs = [{
              from = "2020-10-24"
              store = "boltdb"
              object_store = "filesystem"
              schema = "v11"
              index = {
                prefix = "index_"
                period = "168h"
              }
            }]
          }
          storage_config = {
            boltdb = {
              directory = "/tmp/loki/index"
            }
            filesystem = {
              directory = "/tmp/loki/chunks"
            }
          }
          limits_config = {
            enforce_metric_name = false
            reject_old_samples = true
            reject_old_samples_max_age = "168h"
          }
        }
      }
      promtail = {
        enabled = true
        config = {
          server = {
            http_listen_port = 3101
          }
          clients = [{
            url = "http://loki:3100/loki/api/v1/push"
          }]
          scrape_configs = [{
            job_name = "kubernetes-pods"
            kubernetes_sd_configs = [{
              role = "pod"
            }]
            relabel_configs = [
              {
                source_labels = ["__meta_kubernetes_pod_annotation_prometheus_io_scrape"]
                action = "keep"
                regex = "true"
              },
              {
                source_labels = ["__meta_kubernetes_pod_annotation_prometheus_io_path"]
                action = "replace"
                target_label = "__metrics_path__"
                regex = "(.+)"
              }
            ]
          }]
        }
      }
      fluent-bit = {
        enabled = false
      }
    })
  ]

  depends_on = [kubernetes_namespace.monitoring]
}