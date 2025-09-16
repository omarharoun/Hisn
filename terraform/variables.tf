# Variables for SkillPath Platform Infrastructure

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "skillpath"
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  validation {
    condition = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be one of: dev, staging, prod."
  }
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "kubernetes_version" {
  description = "Kubernetes version for EKS cluster"
  type        = string
  default     = "1.28"
}

variable "node_groups" {
  description = "EKS node groups configuration"
  type = map(object({
    instance_types = list(string)
    scaling_config = object({
      desired_size = number
      max_size     = number
      min_size     = number
    })
    update_config = object({
      max_unavailable_percentage = number
    })
    capacity_type = string
    ami_type      = string
    disk_size     = number
    labels        = map(string)
    taints = list(object({
      key    = string
      value  = string
      effect = string
    }))
  }))
  default = {
    general = {
      instance_types = ["t3.medium"]
      scaling_config = {
        desired_size = 2
        max_size     = 10
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
      }
      taints = []
    }
    labs = {
      instance_types = ["t3.large"]
      scaling_config = {
        desired_size = 1
        max_size     = 5
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
      }
      taints = [{
        key    = "labs"
        value  = "true"
        effect = "NO_SCHEDULE"
      }]
    }
  }
}

variable "enable_monitoring" {
  description = "Enable monitoring stack (Prometheus, Grafana)"
  type        = bool
  default     = true
}

variable "prometheus_storage_size" {
  description = "Storage size for Prometheus"
  type        = string
  default     = "50Gi"
}

variable "grafana_storage_size" {
  description = "Storage size for Grafana"
  type        = string
  default     = "10Gi"
}

# Application-specific variables
variable "image_tag" {
  description = "Docker image tag for the application"
  type        = string
  default     = "latest"
}

variable "app_replicas" {
  description = "Number of application replicas"
  type        = number
  default     = 2
}

variable "app_resources" {
  description = "Resource limits and requests for the application"
  type = object({
    limits = object({
      cpu    = string
      memory = string
    })
    requests = object({
      cpu    = string
      memory = string
    })
  })
  default = {
    limits = {
      cpu    = "1000m"
      memory = "1Gi"
    }
    requests = {
      cpu    = "100m"
      memory = "256Mi"
    }
  }
}

# External service configurations
variable "supabase_url" {
  description = "Supabase URL"
  type        = string
  sensitive   = true
}

variable "supabase_anon_key" {
  description = "Supabase anonymous key"
  type        = string
  sensitive   = true
}

variable "clerk_publishable_key" {
  description = "Clerk publishable key"
  type        = string
  sensitive   = true
}

variable "openai_api_key" {
  description = "OpenAI API key"
  type        = string
  sensitive   = true
  default     = ""
}

# Domain and SSL
variable "domain_name" {
  description = "Domain name for the application"
  type        = string
  default     = ""
}

variable "certificate_arn" {
  description = "ACM certificate ARN for HTTPS"
  type        = string
  default     = ""
}

# Lab environment configuration
variable "lab_timeout_minutes" {
  description = "Default timeout for lab sessions in minutes"
  type        = number
  default     = 120
}

variable "max_concurrent_labs" {
  description = "Maximum concurrent lab sessions per user"
  type        = number
  default     = 3
}

# Backup and retention
variable "backup_retention_days" {
  description = "Number of days to retain backups"
  type        = number
  default     = 30
}

variable "log_retention_days" {
  description = "CloudWatch log retention in days"
  type        = number
  default     = 14
}