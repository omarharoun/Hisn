# Development Environment Configuration

terraform {
  required_version = ">= 1.6.0"
  
  backend "s3" {
    bucket         = "skillpath-terraform-state-dev"
    key            = "dev/terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "skillpath-terraform-locks"
  }
}

# Use the main configuration
module "skillpath" {
  source = "../../"

  # Environment specific variables
  project_name = "skillpath"
  environment  = "dev"
  aws_region   = "us-west-2"
  
  # Network configuration
  vpc_cidr = "10.0.0.0/16"
  
  # EKS configuration
  kubernetes_version = "1.28"
  
  # Node groups - smaller for dev
  node_groups = {
    general = {
      instance_types = ["t3.medium"]
      scaling_config = {
        desired_size = 1
        max_size     = 3
        min_size     = 1
      }
      update_config = {
        max_unavailable_percentage = 25
      }
      capacity_type = "ON_DEMAND"
      ami_type      = "AL2_x86_64"
      disk_size     = 30
      labels = {
        role = "general"
        environment = "dev"
      }
      taints = []
    }
    labs = {
      instance_types = ["t3.medium"]
      scaling_config = {
        desired_size = 0  # Scale to 0 when not in use
        max_size     = 2
        min_size     = 0
      }
      update_config = {
        max_unavailable_percentage = 25
      }
      capacity_type = "SPOT"  # Use spot instances for cost savings
      ami_type      = "AL2_x86_64"
      disk_size     = 50
      labels = {
        role = "labs"
        environment = "dev"
      }
      taints = [{
        key    = "labs"
        value  = "true"
        effect = "NO_SCHEDULE"
      }]
    }
  }
  
  # Monitoring - basic setup for dev
  enable_monitoring = true
  prometheus_storage_size = "20Gi"
  grafana_storage_size = "5Gi"
  
  # Application configuration
  app_replicas = 1
  app_resources = {
    limits = {
      cpu    = "500m"
      memory = "512Mi"
    }
    requests = {
      cpu    = "100m"
      memory = "128Mi"
    }
  }
  
  # External services (will be provided via environment variables)
  supabase_url = var.supabase_url
  supabase_anon_key = var.supabase_anon_key
  clerk_publishable_key = var.clerk_publishable_key
  openai_api_key = var.openai_api_key
  
  # Lab configuration
  lab_timeout_minutes = 60  # Shorter timeout for dev
  max_concurrent_labs = 2   # Fewer concurrent labs
  
  # Retention - shorter for dev
  backup_retention_days = 7
  log_retention_days = 7
}