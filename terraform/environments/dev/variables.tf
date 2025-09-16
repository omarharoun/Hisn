# Development Environment Variables

variable "supabase_url" {
  description = "Supabase URL for development"
  type        = string
  sensitive   = true
}

variable "supabase_anon_key" {
  description = "Supabase anonymous key for development"
  type        = string
  sensitive   = true
}

variable "clerk_publishable_key" {
  description = "Clerk publishable key for development"
  type        = string
  sensitive   = true
}

variable "openai_api_key" {
  description = "OpenAI API key for development"
  type        = string
  sensitive   = true
  default     = ""
}

variable "image_tag" {
  description = "Docker image tag for the application"
  type        = string
  default     = "dev-latest"
}