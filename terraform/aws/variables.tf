variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "db_name" {
  description = "MySQL database name"
  type        = string
  default     = "devops_ecommerce"
}

variable "db_user" {
  description = "MySQL database admin username"
  type        = string
  default     = "admin"
}

variable "db_password" {
  description = "MySQL database admin password (must be strong)"
  type        = string
  sensitive   = true
}
