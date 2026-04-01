---
---

```
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║    ██████╗ ██████╗ ███╗   ███╗██████╗  ██████╗ ███████╗      ║
║   ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██╔═══██╗██╔════╝      ║
║   ██║     ██║   ██║██╔████╔██║██████╔╝██║   ██║███████╗      ║
║   ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║   ██║╚════██║      ║
║   ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ╚██████╔╝███████║      ║
║    ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝      ╚═════╝ ╚══════╝      ║
║                                                                ║
║          Multi-Container Orchestration Tool                   ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
```

# Dockerfile

A Dockerfile is a declarative text file containing instructions to build a Docker image.

**Core Principle:**

```
Dockerfile  --[docker build]-->  Image  --[docker run]-->  Container
```

**Why Dockerfile exists:**

|Problem|Dockerfile Solution|
|---|---|
|Manual server setup|Automated, repeatable builds|
|Configuration drift|Version-controlled infrastructure|
|Platform differences|Consistent environment everywhere|
|Dependency management|All dependencies in one file|

### Dockerfile vs Image vs Container

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  Dockerfile (blueprint)                             │
│  ├── FROM python:3.11                               │
│  ├── COPY app.py /app/                              │
│  └── CMD ["python", "/app/app.py"]                  │
│      │                                               │
│      │ docker build -t myapp .                       │
│      ↓                                               │
│  Image (template)                                   │
│  ├── Layer: python:3.11 base                        │
│  ├── Layer: app.py copied                           │
│  └── Layer: CMD instruction                         │
│      │                                               │
│      │ docker run myapp                              │
│      ↓                                               │
│  Container (running instance)                       │
│  └── Process: python /app/app.py                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Basic Dockerfile Instructions

**Mandatory and common instructions:**

|Instruction|Purpose|When Executed|Example|
|---|---|---|---|
|`FROM`|Base image|Build time|`FROM node:18`|
|`WORKDIR`|Set working directory|Build time|`WORKDIR /app`|
|`COPY`|Copy files into image|Build time|`COPY . .`|
|`RUN`|Execute commands|Build time|`RUN npm install`|
|`EXPOSE`|Document port|Informational|`EXPOSE 3000`|
|`CMD`|Default container command|Run time|`CMD ["npm", "start"]`|
|`ENTRYPOINT`|Fixed container command|Run time|`ENTRYPOINT ["python"]`|

### Build Time vs Run Time

```
Build Time (happens once)          Run Time (every container start)
━━━━━━━━━━━━━━━━━━━━━━━━━━        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FROM python:3.11                    
RUN apt-get update                  
RUN pip install -r requirements.txt
COPY app.py /app/                   
                                    CMD ["python", "/app/app.py"]
                                    ↓
Result: Image layers cached         Result: Running container
```

### Image Layers and Caching

**How layers work:**

```
Dockerfile Instruction              Layer Created
─────────────────────────────────   ─────────────
FROM python:3.11              --->  Layer 0 (base)
WORKDIR /app                  --->  Layer 1
COPY requirements.txt .       --->  Layer 2
RUN pip install -r req...     --->  Layer 3 (heavy)
COPY . .                      --->  Layer 4
CMD ["python", "app.py"]      --->  Metadata only
```

**Cache optimization principle:**

```
BAD ORDER (rebuilds often):          GOOD ORDER (cache efficient):
─────────────────────────           ──────────────────────────────
FROM python:3.11                    FROM python:3.11
COPY . .                ←─ Changes  WORKDIR /app
RUN pip install ...     ←─ Rebuild  COPY requirements.txt .
                                    RUN pip install ...     ←─ Cached
                                    COPY . .                ←─ Changes
```

### Minimal Working Dockerfile

```dockerfile
FROM alpine:latest
CMD ["echo", "Hello World"]
```

**Build and run:**

```bash
docker build -t hello .
docker run hello
# Output: Hello World
```

## What is Docker Compose

### Definition

Docker Compose is a declarative orchestration tool for defining and running multi-container Docker applications using a single YAML configuration file.

**Core Purpose:**

- Replace multiple `docker run` commands with single configuration
- Automate network creation and service discovery
- Manage multi-container application lifecycle
- Enable reproducible development environments
- Simplify complex deployment scenarios
```
docker-compose.yml
        │
        ├──▶ uses Dockerfile
        │
        └──▶ docker build (implicitly)
                │
                └──▶ Image
                        │
                        └──▶ Container

```

``
### The Problem Docker Compose Solves

```ascii
┌────────────────────────────────────────────────────────────┐
│              WITHOUT DOCKER COMPOSE                        │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  # Create network                                          │
│  docker network create app_net                             │
│                                                            │
│  # Start database                                          │
│  docker run -d --name mysql --network app_net \           │
│    -e MYSQL_ROOT_PASSWORD=secret \                        │
│    -e MYSQL_DATABASE=appdb mysql:8                        │
│                                                            │
│  # Wait for database to be ready                           │
│  sleep 30                                                  │
│                                                            │
│  # Start application                                       │
│  docker run -d --name app --network app_net \             │
│    -e DB_HOST=mysql \                                     │
│    -e DB_USER=root \                                      │
│    -e DB_PASSWORD=secret \                                │
│    -p 5000:5000 myapp:latest                              │
│                                                            │
│  Problems:                                                 │
│  ❌ Manual network management                              │
│  ❌ No dependency ordering                                 │
│  ❌ Environment variable repetition                        │
│  ❌ Error-prone startup sequence                           │
│  ❌ Difficult to reproduce                                 │
│                                                            │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│               WITH DOCKER COMPOSE                          │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  # docker-compose.yml                                      │
│  version: "3.9"                                            │
│  services:                                                 │
│    mysql:                                                  │
│      image: mysql:8                                        │
│      environment:                                          │
│        MYSQL_ROOT_PASSWORD: secret                         │
│        MYSQL_DATABASE: appdb                               │
│    app:                                                    │
│      build: .                                              │
│      ports:                                                │
│        - "5000:5000"                                       │
│      depends_on:                                           │
│        - mysql                                             │
│                                                            │
│  # Single command                                          │
│  docker compose up -d                                      │
│                                                            │
│  Benefits:                                                 │
│  ✓ Automatic network creation                             │
│  ✓ Dependency management                                  │
│  ✓ Centralized configuration                              │
│  ✓ Reproducible deployments                               │
│  ✓ Easy to version control                                │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### Docker Compose Architecture

```mermaid
graph TB
    A[docker-compose.yml] --> B[Docker Compose CLI]
    C[.env] --> B
    D[Dockerfile] --> B
    
    B --> E[Docker Engine]
    
    E --> F[Create Networks]
    E --> G[Create Volumes]
    E --> H[Build Images]
    E --> I[Start Containers]
    
    F --> J[Default Network]
    G --> K[Named Volumes]
    H --> L[Custom Images]
    I --> M[Service Containers]
    
    M --> N[Service 1]
    M --> O[Service 2]
    M --> P[Service N]
    
    style A fill:#f39c12
    style B fill:#3498db
    style E fill:#2ecc71
```

### Compose vs Manual Docker

```markmap
# Docker Compose vs Manual
## Manual Docker Commands
### Imperative approach
### Multiple commands required
### Manual network management
### No dependency handling
### Error-prone
### Hard to reproduce
### Good for learning
## Docker Compose
### Declarative approach
### Single command deployment
### Automatic network creation
### Built-in dependencies
### Reproducible
### Version controllable
### Production-ready
## Use Cases
### Manual: Learning, debugging, CI steps
### Compose: Development, testing, staging
### Production: Kubernetes, Docker Swarm
```


## Compose File Structure

### File Anatomy

```yaml
# docker-compose.yml structure breakdown

version: "3.9"                    # Compose file format version

services:                         # Container definitions
  service_name:                   # Service identifier
    image: image:tag              # Image to use
    build: ./path                 # Build configuration
    container_name: name          # Container name
    ports:                        # Port mappings
      - "host:container"
    environment:                  # Environment variables
      KEY: value
    volumes:                      # Volume mounts
      - volume_name:/path
    networks:                     # Network attachments
      - network_name
    depends_on:                   # Service dependencies
      - other_service

networks:                         # Network definitions
  network_name:
    driver: bridge

volumes:                          # Volume definitions
  volume_name:
    driver: local
```

### Version History

```ascii
┌────────────────────────────────────────────────────────────┐
│              COMPOSE FILE VERSION GUIDE                    │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Version  │ Docker Engine  │ Status       │ Notes         │
│  ─────────────────────────────────────────────────────     │
│                                                            │
│  3.9      │ 19.03.0+       │ Recommended  │ Latest stable │
│  3.8      │ 19.03.0+       │ Stable       │ Production    │
│  3.7      │ 18.06.0+       │ Stable       │ Widely used   │
│  3.0-3.6  │ 1.13.0+        │ Legacy       │ Still works   │
│  2.x      │ 1.10.0+        │ Deprecated   │ Avoid         │
│  1.x      │ 1.9.1+         │ Obsolete     │ Don't use     │
│                                                            │
│  Recommendation: Use version "3.9" for new projects       │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### Basic File Example

```yaml
version: "3.9"

services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
    networks:
      - frontend

  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
    networks:
      - frontend
      - backend
    depends_on:
      - database

  database:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: myapp
    volumes:
      - db_data:/var/lib/postgresql/data
    networks:
      - backend

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true

volumes:
  db_data:
```

### Project Structure

```
project-root/
│
├── docker-compose.yml          # Main orchestration file
├── .env                        # Environment variables
├── .dockerignore               # Build exclusions
│
├── services/
│   ├── frontend/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── src/
│   │
│   ├── backend/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   └── app/
│   │
│   └── database/
│       └── init.sql
│
├── config/
│   ├── nginx.conf
│   └── postgres.conf
│
└── scripts/
    ├── deploy.sh
    └── backup.sh
```


## Environment Variables

### Inline Environment Variables

```yaml
services:
  app:
    image: myapp
    environment:
      NODE_ENV: production
      DB_HOST: database
      DB_PORT: 5432
      DEBUG: "false"
```

### Environment from .env File

```yaml
# docker-compose.yml
services:
  app:
    image: myapp
    environment:
      - NODE_ENV
      - DB_HOST
      - DB_USER
      - DB_PASSWORD
```

```bash
# .env file
NODE_ENV=production
DB_HOST=postgres
DB_USER=admin
DB_PASSWORD=secretpass
```

### Environment File

```yaml
services:
  app:
    image: myapp
    env_file:
      - ./config/common.env       # Common variables
      - ./config/production.env   # Environment-specific
```

```bash
# common.env
NODE_ENV=production
LOG_LEVEL=info

# production.env
DB_HOST=postgres-prod.example.com
DB_PORT=5432
```

### Variable Substitution

```yaml
# docker-compose.yml
services:
  app:
    image: myapp:${APP_VERSION:-latest}    # Default to 'latest'
    ports:
      - "${APP_PORT:-3000}:3000"           # Default to 3000
    environment:
      DATABASE_URL: postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}
```

```bash
# .env
APP_VERSION=1.0.0
APP_PORT=8080
DB_USER=admin
DB_PASS=secret
DB_HOST=postgres
DB_NAME=myapp
```

### Environment Priority

```ascii
┌────────────────────────────────────────────────────────────┐
│           ENVIRONMENT VARIABLE PRIORITY                    │
│                   (Highest to Lowest)                      │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  1. Shell environment variables                            │
│     export DB_HOST=override                                │
│     docker compose up                                      │
│                                                            │
│  2. environment: section in docker-compose.yml             │
│     environment:                                           │
│       DB_HOST: postgres                                    │
│                                                            │
│  3. env_file: in docker-compose.yml                        │
│     env_file:                                              │
│       - .env.production                                    │
│                                                            │
│  4. .env file in project root                              │
│     DB_HOST=postgres                                       │
│                                                            │
│  5. Dockerfile ENV instruction                             │
│     ENV DB_HOST=localhost                                  │
│                                                            │
└────────────────────────────────────────────────────────────┘
```


## Health Checks and Dependencies

### Health Check Configuration

```yaml
services:
  database:
    image: postgres:15
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s             # Check every 10 seconds
      timeout: 5s               # Timeout after 5 seconds
      retries: 5                # Fail after 5 retries
      start_period: 30s         # Grace period on startup

  mysql:
    image: mysql:8
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 3

  web:
    image: nginx
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/health"]
      interval: 30s
      timeout: 3s
      retries: 3
```

### Service Dependencies

```yaml
services:
  app:
    image: myapp
    depends_on:
      - database              # Wait for database to start
      - cache
    
  database:
    image: postgres:15
    
  cache:
    image: redis:7
```

### Health-Based Dependencies (Compose V2.1+)

```yaml
version: "3.9"

services:
  app:
    image: myapp
    depends_on:
      database:
        condition: service_healthy    # Wait for health check
      cache:
        condition: service_started    # Wait for start only

  database:
    image: postgres:15
    healthcheck:
      test: ["CMD-SHELL", "pg_isready"]
      interval: 5s
      timeout: 3s
      retries: 5

  cache:
    image: redis:7
```

### Wait-for-it Pattern

```yaml
services:
  app:
    image: myapp
    command: >
      sh -c "
        while ! nc -z database 5432; do
          echo 'Waiting for database...';
          sleep 2;
        done;
        echo 'Database is ready!';
        python app.py
      "
    depends_on:
      - database

  database:
    image: postgres:15
```

### Health Check Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Starting: Container starts
    Starting --> Healthy: Health check passes (start_period + interval)
    Starting --> Unhealthy: Health check fails (retries exhausted)
    Healthy --> Unhealthy: Health check fails
    Unhealthy --> Healthy: Health check passes
    Unhealthy --> [*]: Container stopped/removed
    Healthy --> [*]: Container stopped
    
    note right of Starting
        Grace period: start_period
        First check after: interval
    end note
    
    note right of Unhealthy
        After retries * interval
        Container may restart
        based on policy
    end note
```


## Complete Examples

### Example 1: Flask + MySQL Application

```yaml
# docker-compose.yml
version: "3.9"

services:
  mysql:
    image: mysql:8
    container_name: mysql
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${MYSQL_DATABASE}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
    volumes:
      - mysql_data:/var/lib/mysql
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    networks:
      - backend
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-p${MYSQL_ROOT_PASSWORD}"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 60s

  flaskapp:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: flaskapp
    restart: unless-stopped
    ports:
      - "${FLASK_PORT:-5000}:5000"
    environment:
      FLASK_HOST: 0.0.0.0
      FLASK_PORT: 5000
      DB_HOST: mysql
      DB_USER: ${MYSQL_USER}
      DB_PASSWORD: ${MYSQL_PASSWORD}
      DB_NAME: ${MYSQL_DATABASE}
    volumes:
      - app_logs:/app/logs
    networks:
      - backend
    depends_on:
      mysql:
        condition: service_healthy
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:5000/health || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 3
      start_period: 30s

networks:
  backend:
    driver: bridge

volumes:
  mysql_data:
    driver: local
  app_logs:
    driver: local
```

```bash
# .env
MYSQL_ROOT_PASSWORD=rootpass123
MYSQL_DATABASE=appdb
MYSQL_USER=appuser
MYSQL_PASSWORD=apppass123
FLASK_PORT=5000
```

```sql
-- init.sql
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email) VALUES 
    ('Admin User', 'admin@example.com'),
    ('Test User', 'test@example.com');
```

### Example 2: Full-Stack Application

```yaml
# docker-compose.yml - Complete full-stack setup
version: "3.9"

services:
  # Database
  postgres:
    image: postgres:15-alpine
    container_name: postgres_db
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    networks:
      - backend
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER}"]
      interval: 5s
      timeout: 3s
      retries: 5

  # Cache
  redis:
    image: redis:7-alpine
    container_name: redis_cache
    restart: unless-stopped
    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    networks:
      - backend
    healthcheck:
      test: ["CMD", "redis-cli", "--raw", "incr", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5

  # Backend API
  api:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: backend_api
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      PORT: 3000
      DATABASE_URL: postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/${DB_NAME}
      REDIS_URL: redis://:${REDIS_PASSWORD}@redis:6379
      JWT_SECRET: ${JWT_SECRET}
    volumes:
      - api_logs:/app/logs
    networks:
      - frontend
      - backend
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 10s
      timeout: 5s
      retries: 3

  # Frontend
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      args:
        REACT_APP_API_URL: http://localhost:3000/api
    container_name: frontend_app
    restart: unless-stopped
    ports:
      - "80:80"
    networks:
      - frontend
    depends_on:
      - api
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/"]
      interval: 30s
      timeout: 3s
      retries: 3

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    container_name: nginx_proxy
    restart: unless-stopped
    ports:
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
    networks:
      - frontend
    depends_on:
      - frontend
      - api

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true

volumes:
  postgres_data:
  redis_data:
  api_logs:
```

### Example 3: Microservices Architecture

```yaml
# docker-compose.yml - Microservices setup
version: "3.9"

services:
  # API Gateway
  gateway:
    build: ./gateway
    ports:
      - "8080:8080"
    environment:
      - USER_SERVICE_URL=http://user-service:3001
      - ORDER_SERVICE_URL=http://order-service:3002
      - PRODUCT_SERVICE_URL=http://product-service:3003
    networks:
      - frontend
      - backend
    depends_on:
      - user-service
      - order-service
      - product-service

  # User Service
  user-service:
    build: ./services/user
    environment:
      - DB_HOST=postgres
      - DB_NAME=users
      - REDIS_HOST=redis
    networks:
      - backend
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started

  # Order Service
  order-service:
    build: ./services/order
    environment:
      - DB_HOST=postgres
      - DB_NAME=orders
      - RABBITMQ_URL=amqp://rabbitmq:5672
    networks:
      - backend
    depends_on:
      postgres:
        condition: service_healthy
      rabbitmq:
        condition: service_healthy

  # Product Service
  product-service:
    build: ./services/product
    environment:
      - DB_HOST=postgres
      - DB_NAME=products
      - REDIS_HOST=redis
    networks:
      - backend
    depends_on:
      postgres:
        condition: service_healthy

  # PostgreSQL Database
  postgres:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init:/docker-entrypoint-initdb.d
    networks:
      - backend
    healthcheck:
      test: ["CMD-SHELL", "pg_isready"]
      interval: 5s
      timeout: 3s
      retries: 5

  # Redis Cache
  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    networks:
      - backend

  # RabbitMQ Message Broker
  rabbitmq:
    image: rabbitmq:3-management-alpine
    ports:
      - "15672:15672"  # Management UI
    environment:
      RABBITMQ_DEFAULT_USER: ${RABBITMQ_USER}
      RABBITMQ_DEFAULT_PASS: ${RABBITMQ_PASSWORD}
    volumes:
      - rabbitmq_data:/var/lib/rabbitmq
    networks:
      - backend
    healthcheck:
      test: ["CMD", "rabbitmq-diagnostics", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

networks:
  frontend:
  backend:
    internal: true

volumes:
  postgres_data:
  redis_data:
  rabbitmq_data:
```


## Production Patterns

### Environment-Specific Configuration

```bash
# Development
docker-compose.yml
docker-compose.override.yml    # Auto-merged

# Production
docker-compose.yml
docker-compose.prod.yml

# Usage
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

**Benefits:**

- DRY principle (Don't Repeat Yourself)
- Environment-specific settings
- Easier configuration management
- Version control friendly

**Example structure:**

```yaml
# docker-compose.yml (base)
services:
  app:
    image: myapp
    
# docker-compose.override.yml (dev - auto-loaded)
services:
  app:
    volumes:
      - ./src:/app/src    # Live reload
    ports:
      - "3000:3000"
      
# docker-compose.prod.yml (production)
services:
  app:
    restart: always
    environment:
      NODE_ENV: production
```

### Decision Tree: Compose vs Kubernetes

```mermaid
graph TD
    A[Container Orchestration Need] --> B{Number of hosts?}
    B -->|Single host| C{Scale requirement?}
    B -->|Multi-host| D[Kubernetes]
    
    C -->|< 10 containers| E{Complexity?}
    C -->|> 10 containers| D
    
    E -->|Simple| F[Docker Compose]
    E -->|Complex| G{Budget/Team size?}
    
    G -->|Small/Limited| F
    G -->|Enterprise| D
    
    F --> H[Development/Testing]
    D --> I[Production]
    
    style F fill:#2ecc71
    style D fill:#3498db
    style I fill:#e74c3c
```

### Compose Workflow Best Practices

```markmap
# Docker Compose Best Practices
## File Organization
### docker-compose.yml in project root
### .env for environment variables
### .dockerignore for build optimization
### Separate configs per environment
## Service Design
### One process per container
### Use health checks always
### Set restart policies
### Define resource limits
## Security
### Run as non-root user
### Use read-only filesystems
### Drop unnecessary capabilities
### Never commit secrets
## Development
### Use volumes for live reload
### Override files for dev config
### Named volumes for data
### Bind mounts for code
## Production
### Use specific image tags
### Set memory/CPU limits
### Enable logging drivers
### Implement monitoring
### Use secrets management
```

### Common Pitfalls and Solutions

```ascii
┌────────────────────────────────────────────────────────────┐
│              COMMON DOCKER COMPOSE MISTAKES                │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  1. Using 'latest' tag in production                       │
│     ❌ image: postgres:latest                              │
│     ✓ image: postgres:15.3                                 │
│                                                            │
│  2. Not using health checks                                │
│     ❌ depends_on: - database                              │
│     ✓ depends_on:                                          │
│         database:                                          │
│           condition: service_healthy                       │
│                                                            │
│  3. Hardcoding secrets in compose file                     │
│     ❌ environment:                                         │
│         DB_PASSWORD: hardcoded123                          │
│     ✓ environment:                                         │
│         DB_PASSWORD: ${DB_PASSWORD}                        │
│                                                            │
│  4. Not using volumes for data persistence                 │
│     ❌ Database without volumes                            │
│     ✓ volumes:                                             │
│         - postgres_data:/var/lib/postgresql/data           │
│                                                            │
│  5. Exposing unnecessary ports                             │
│     ❌ ports:                                              │
│         - "5432:5432"  # Database publicly exposed        │
│     ✓ No ports: - only expose application layer           │
│                                                            │
│  6. Using bind mounts in production                        │
│     ❌ volumes:                                            │
│         - ./data:/app/data                                 │
│     ✓ volumes:                                             │
│         - app_data:/app/data                               │
│                                                            │
│  7. Not setting restart policies                          │
│     ❌ No restart policy                                   │
│     ✓ restart: unless-stopped                              │
│                                                            │
└────────────────────────────────────────────────────────────┘
```


## Summary

### Key Takeaways

```ascii
╔════════════════════════════════════════════════════════════╗
║           DOCKER COMPOSE ESSENTIAL CONCEPTS                ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  1. Declarative multi-container orchestration             ║
║     Single YAML file replaces multiple docker commands    ║
║                                                            ║
║  2. Automatic networking and service discovery            ║
║     Services communicate via service names                 ║
║                                                            ║
║  3. Environment-based configuration                       ║
║     .env files and multiple compose files                  ║
║                                                            ║
║  4. Health checks enable reliable dependencies            ║
║     Wait for services to be ready, not just started        ║
║                                                            ║
║  5. Volumes provide data persistence                      ║
║     Named volumes survive container lifecycle              ║
║                                                            ║
║  6. Single-host limitation                                ║
║     Use Kubernetes for multi-host production               ║
║                                                            ║
║  7. Perfect for development and testing                   ║
║     Reproducible environments, version controlled          ║
║                                                            ║
║  8. Production requires additional considerations         ║
║     Security, monitoring, secrets management               ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

### When to Use What

|Scenario|Tool|Reason|
|---|---|---|
|Local development|Docker Compose|Easy setup, reproducible|
|Integration testing|Docker Compose|Multiple services, isolated|
|Small staging env|Docker Compose|Quick deployment, cost-effective|
|Single-host production|Docker Compose|Simple apps, limited scale|
|Multi-host production|Kubernetes|Auto-scaling, high availability|
|Microservices at scale|Kubernetes|Service mesh, load balancing|
|Learning containers|Manual Docker|Understanding fundamentals|
|CI/CD pipelines|Docker Compose|Consistent test environments|

### Migration Path

```mermaid
graph LR
    A[Manual Docker Commands] --> B[Docker Compose]
    B --> C[Docker Swarm]
    B --> D[Kubernetes]
    
    subgraph "Learning Phase"
        A
    end
    
    subgraph "Development"
        B
    end
    
    subgraph "Production Options"
        C
        D
    end
    
    style A fill:#e74c3c
    style B fill:#f39c12
    style D fill:#2ecc71
    
    note1[Manual: Understanding basics]
    note2[Compose: Team development]
    note3[K8s: Enterprise production]
    
    A -.-> note1
    B -.-> note2
    D -.-> note3
```

### Production Deployment Checklist

```ascii
┌────────────────────────────────────────────────────────────┐
│         PRODUCTION DOCKER COMPOSE CHECKLIST                │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  [ ] Use specific image tags (not 'latest')                │
│  [ ] Implement health checks for all services             │
│  [ ] Set restart policies (restart: unless-stopped)       │
│  [ ] Configure resource limits (CPU, memory)              │
│  [ ] Use named volumes for persistence                    │
│  [ ] Externalize all secrets (.env, not in compose file)  │
│  [ ] Set up logging drivers and rotation                  │
│  [ ] Run containers as non-root users                     │
│  [ ] Enable read-only filesystems where possible          │
│  [ ] Implement monitoring and alerting                    │
│  [ ] Set up automated backups for volumes                 │
│  [ ] Document deployment procedures                       │
│  [ ] Test disaster recovery process                       │
│  [ ] Use internal networks for backend services           │
│  [ ] Implement proper error handling                      │
│  [ ] Version control compose files                        │
│  [ ] Set up CI/CD pipelines                               │
│  [ ] Plan for zero-downtime updates                       │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### Interview One-Liners

```ascii
┌────────────────────────────────────────────────────────────┐
│            DOCKER COMPOSE INTERVIEW ONE-LINERS             │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  • "Docker Compose is a declarative tool for defining     │
│    and running multi-container applications"               │
│                                                            │
│  • "Compose automates network creation and provides       │
│    DNS-based service discovery"                            │
│                                                            │
│  • "depends_on controls start order, health checks        │
│    ensure service readiness"                               │
│                                                            │
│  • "Use Compose for development; use Kubernetes for       │
│    production multi-host deployments"                      │
│                                                            │
│  • "Multiple compose files enable environment-specific    │
│    configurations without duplication"                     │
│                                                            │
│  • "Named volumes provide data persistence independent    │
│    of container lifecycle"                                 │
│                                                            │
│  • "Environment variables follow strict precedence:       │
│    shell > compose > env_file > .env > Dockerfile"        │
│                                                            │
│  • "Health checks are critical for reliable service       │
│    dependencies and zero-downtime deployments"             │
│                                                            │
└────────────────────────────────────────────────────────────┘
```


**Document Version:** 1.0  
**Last Updated:** December 2025  
**Target Audience:** DevOps Engineers, Backend Developers, System Administrators  
**Complexity Level:** Beginner to Advanced  
**Focus Areas:** Multi-container orchestration, Development workflows, Production deployment  
**Related Topics:** Docker networking, Volumes, Kubernetes migration  
**Recommended Review:** Before multi-container projects, team standardization, DevOps interviewsyml up -d

````

```yaml
# docker-compose.yml (base)
version: "3.9"
services:
  app:
    image: myapp
    environment:
      NODE_ENV: development

# docker-compose.override.yml (development - auto-loaded)
version: "3.9"
services:
  app:
    volumes:
      - ./src:/app/src    # Live code reloading
    ports:
      - "3000:3000"       # Expose for debugging

# docker-compose.prod.yml (production)
version: "3.9"
services:
  app:
    restart: always
    environment:
      NODE_ENV: production
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
````

### Multi-Stage Deployment

```yaml
# docker-compose.staging.yml
version: "3.9"

services:
  app:
    image: myapp:${VERSION}
    environment:
      DATABASE_URL: ${STAGING_DB_URL}
      REDIS_URL: ${STAGING_REDIS_URL}
    networks:
      - staging
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

networks:
  staging:
    driver: bridge
```

### Production Security

```yaml
version: "3.9"

services:
  app:
    image: myapp:latest
    read_only: true               # Read-only root filesystem
    security_opt:
      - no-new-privileges:true    # Prevent privilege escalation
    cap_drop:
      - ALL                       # Drop all capabilities
    cap_add:
      - NET_BIND_SERVICE          # Add only needed capabilities
    user: "1000:1000"             # Run as non-root
    tmpfs:
      - /tmp                      # Writable temp storage
    environment:
      - DB_PASSWORD_FILE=/run/secrets/db_password
    secrets:
      - db_password

secrets:
  db_password:
    file: ./secrets/db_password.txt
```

### Monitoring and Logging

```yaml
version: "3.9"

services:
  app:
    image: myapp
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "5"
        labels: "production,myapp"
    labels:
      - "prometheus.scrape=true"
      - "prometheus.port=9090"

  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prometheus_data:/prometheus
    ports:
      - "9090:9090"
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'

  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_PASSWORD}
    volumes:
      - grafana_data:/var/lib/grafana
    depends_on:
      - prometheus

volumes:
  prometheus_data:
  grafana_data:
```

