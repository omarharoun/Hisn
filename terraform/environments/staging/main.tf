# Staging Environment Configuration

terraform {
  required_version = ">= 1.6.0"
  
  backend "s3" {
    bucket         = "skillpath-terraform-state-staging"
    key            = "staging/terraform.tfstate"
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
  environment  = "staging"
  aws_region   = "us-west-2"
  
  # Network configuration
  vpc_cidr = "10.1.0.0/16"
  
  # EKS configuration
  kubernetes_version = "1.28"
  
  # Node groups - medium size for staging
  node_groups = {
    general = {
      instance_types = ["t3.large"]
      scaling_config = {
        desired_size = 2
        max_size     = 5
        min_size     = 1
      }
      update_config = {
        max_unavailable_percentage = 25
      }
      capacity_type = "ON_DEMAND"
      ami_type      = "AL2_x86_64"
      disk_size     = 50
      labels = {
        role = "general"
        environment = "staging"
      }
      taints = []
    }
    labs = {
      instance_types = ["t3.large"]
      scaling_config = {
        desired_size = 1
        max_size     = 3
        min_size     = 0
      }
      update_config = {
        max_unavailable_percentage = 25
      }
      capacity_type = "SPOT"
      ami_type      = "AL2_x86_64"
      disk_size     = 100
      labels = {
        role = "labs"
        environment = "staging"
      }
      taints = [{
        key    = "labs"
        value  = "true"
        effect = "NO_SCHEDULE"
      }]
    }
  }
  
  # Monitoring - full setup for staging
  enable_monitoring = true
  prometheus_storage_size = "50Gi"
  grafana_storage_size = "10Gi"
  
  # Application configuration
  app_replicas = 2
  app_resources = {
    limits = {
      cpu    = "1000m"
      memory = "1Gi"
    }
    requests = {
      cpu    = "250m"
      memory = "256Mi"
    }
  }
  
  # External services
  supabase_url = var.supabase_url
  supabase_anon_key = var.supabase_anon_key
  clerk_publishable_key = var.clerk_publishable_key
  openai_api_key = var.openai_api_key
  
  # Domain configuration
  domain_name = "staging.skillpath.dev"
  
  # Lab configuration
  lab_timeout_minutes = 120
  max_concurrent_labs = 5
  
  # Retention - medium for staging
  backup_retention_days = 14
  log_retention_days = 14
}