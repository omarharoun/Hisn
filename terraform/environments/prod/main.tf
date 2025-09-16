# Production Environment Configuration

terraform {
  required_version = ">= 1.6.0"
  
  backend "s3" {
    bucket         = "skillpath-terraform-state-prod"
    key            = "prod/terraform.tfstate"
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
  environment  = "prod"
  aws_region   = "us-west-2"
  
  # Network configuration
  vpc_cidr = "10.2.0.0/16"
  
  # EKS configuration
  kubernetes_version = "1.28"
  
  # Node groups - production scale
  node_groups = {
    general = {
      instance_types = ["m5.xlarge"]
      scaling_config = {
        desired_size = 3
        max_size     = 10
        min_size     = 2
      }
      update_config = {
        max_unavailable_percentage = 25
      }
      capacity_type = "ON_DEMAND"
      ami_type      = "AL2_x86_64"
      disk_size     = 100
      labels = {
        role = "general"
        environment = "prod"
      }
      taints = []
    }
    labs = {
      instance_types = ["m5.xlarge", "m5.2xlarge"]
      scaling_config = {
        desired_size = 2
        max_size     = 10
        min_size     = 1
      }
      update_config = {
        max_unavailable_percentage = 25
      }
      capacity_type = "MIXED"  # Mix of on-demand and spot
      ami_type      = "AL2_x86_64"
      disk_size     = 200
      labels = {
        role = "labs"
        environment = "prod"
      }
      taints = [{
        key    = "labs"
        value  = "true"
        effect = "NO_SCHEDULE"
      }]
    }
    monitoring = {
      instance_types = ["m5.large"]
      scaling_config = {
        desired_size = 2
        max_size     = 3
        min_size     = 1
      }
      update_config = {
        max_unavailable_percentage = 25
      }
      capacity_type = "ON_DEMAND"
      ami_type      = "AL2_x86_64"
      disk_size     = 100
      labels = {
        role = "monitoring"
        environment = "prod"
      }
      taints = [{
        key    = "monitoring"
        value  = "true"
        effect = "NO_SCHEDULE"
      }]
    }
  }
  
  # Monitoring - full production setup
  enable_monitoring = true
  prometheus_storage_size = "200Gi"
  grafana_storage_size = "50Gi"
  
  # Application configuration - production scale
  app_replicas = 5
  app_resources = {
    limits = {
      cpu    = "2000m"
      memory = "2Gi"
    }
    requests = {
      cpu    = "500m"
      memory = "512Mi"
    }
  }
  
  # External services
  supabase_url = var.supabase_url
  supabase_anon_key = var.supabase_anon_key
  clerk_publishable_key = var.clerk_publishable_key
  openai_api_key = var.openai_api_key
  
  # Domain configuration
  domain_name = "skillpath.com"
  certificate_arn = var.certificate_arn
  
  # Lab configuration - production limits
  lab_timeout_minutes = 180  # 3 hours max
  max_concurrent_labs = 10   # Higher limit for production
  
  # Retention - longer for production
  backup_retention_days = 30
  log_retention_days = 30
}