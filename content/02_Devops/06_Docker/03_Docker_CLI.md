---
---
# Docker & systemd - DevOps Interview Reference

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   ██████╗  ██████╗  ██████╗██╗  ██╗███████╗██████╗          ║
║   ██╔══██╗██╔═══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗         ║
║   ██║  ██║██║   ██║██║     █████╔╝ █████╗  ██████╔╝         ║
║   ██║  ██║██║   ██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗         ║
║   ██████╔╝╚██████╔╝╚██████╗██║  ██╗███████╗██║  ██║         ║
║   ╚═════╝  ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝         ║
║                                                               ║
║            + systemd Integration Guide                       ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```


## Docker + systemd Architecture

### System Components Overview

```markmap
# Docker systemd Integration
## systemd Units
### docker.service
- Docker daemon (dockerd)
- Full service runtime
- Resource-intensive
### docker.socket
- Socket activation listener
- Monitors /var/run/docker.sock
- Auto-starts docker.service
- Lightweight alternative
## Boot Strategies
### Production
- Enable docker.service
- Always-on daemon
- Immediate availability
### Development
- Enable docker.socket only
- On-demand activation
- Resource efficient
## Benefits
### Performance
- Reduced memory footprint
- Lower CPU usage at idle
- Faster boot times
### Operational
- Transparent to users
- Same CLI experience
- systemd managed lifecycle
```

### Service Activation Flow

```mermaid
sequenceDiagram
    participant User
    participant Socket as docker.socket
    participant systemd
    participant Daemon as docker.service
    participant Container

    Note over Socket: Listening on /var/run/docker.sock
    User->>Socket: docker ps
    Socket->>systemd: Socket activation triggered
    systemd->>Daemon: Start docker.service
    Daemon->>systemd: Service ready
    systemd->>Socket: Forward request
    Socket->>Daemon: Execute command
    Daemon->>Container: Query containers
    Container->>Daemon: Return status
    Daemon->>User: Display results
    Note over Daemon: Remains active until idle timeout
```

### Architecture Diagram

```mermaid
graph TB
    subgraph "systemd Layer"
        A[systemd] --> B[docker.socket]
        A --> C[docker.service]
    end
    
    subgraph "Docker Daemon"
        C --> D[dockerd]
        D --> E[containerd]
        E --> F[runc]
    end
    
    subgraph "Runtime"
        F --> G[Container 1]
        F --> H[Container 2]
        F --> I[Container N]
    end
    
    B -.->|Socket Activation| C
    J[User CLI] -->|docker commands| B
    
    style A fill:#326CE5
    style D fill:#2496ED
    style G fill:#00D8FF
    style H fill:#00D8FF
    style I fill:#00D8FF
```


## Docker Commands Reference

### Build Commands

```ascii
┌─────────────────────────────────────────────────────────┐
│                    DOCKER BUILD                         │
├─────────────────────────────────────────────────────────┤
│  Purpose: Create Docker images from Dockerfile         │
└─────────────────────────────────────────────────────────┘
```

```bash
# Basic image build
docker build -t my-image .{dir where Dockefile prsent}

# Specify custom Dockerfile
docker build -t my-image -f Dockerfile.dev .

# Build without cache (force rebuild)
docker build --no-cache -t my-image .

# Pass build arguments
docker build -t my-image --build-arg NODE_ENV=production .

# Multi-architecture build (buildx)
docker buildx build -t my-image --platform linux/amd64,linux/arm64 .

# Build with specific target stage
docker build -t my-image --target production .

# Build with labels
docker build -t my-image --label version=1.0.0 .
```

**Key Flags:**

- `-t, --tag`: Name and optionally tag the image (format: name:tag)
- `-f, --file`: Specify Dockerfile location
- `--no-cache`: Do not use cache when building
- `--build-arg`: Set build-time variables
- `--platform`: Target platform for multi-arch builds

### Run Commands

```ascii
┌─────────────────────────────────────────────────────────┐
│                    DOCKER RUN                           │
├─────────────────────────────────────────────────────────┤
│  Purpose: Create and start a new container             │
└─────────────────────────────────────────────────────────┘
```

```bash
# Foreground execution (view logs)
docker run my-image

# Detached mode (background)
docker run -d my-image

# Port mapping (host:container)
docker run -d -p 3000:3000 my-image

# Named container
docker run -d -p 3000:3000 --name my-container my-image

# Volume mounting (persistent storage)
docker run -d -p 3000:3000 -v ./data:/app/data my-image

# Auto-remove after exit
docker run --rm my-image

# Interactive terminal
docker run -it my-image /bin/bash

# Environment variables
docker run -d -e DATABASE_URL=postgres://... my-image

# Resource limits
docker run -d --memory="512m" --cpus="1.0" my-image

# Network configuration
docker run -d --network my-network my-image
```

**Key Flags:**

- `-d, --detach`: Run container in background
- `-p, --publish`: Publish container port to host (HOST:CONTAINER)
- `--name`: Assign a name to the container
- `-v, --volume`: Mount host directory or volume
- `--rm`: Automatically remove container when it exits
- `-it`: Interactive terminal (combines -i and -t)
- `-e, --env`: Set environment variables
   sleep 1000 forever background container
### Container Lifecycle Management

```mermaid
stateDiagram-v2
    [*] --> Created: docker create
    Created --> Running: docker start
    Running --> Paused: docker pause
    Paused --> Running: docker unpause
    Running --> Stopped: docker stop
    Stopped --> Running: docker start
    Running --> [*]: docker rm (--force)
    Stopped --> [*]: docker rm
    Created --> [*]: docker rm
```

```bash
# List containers
docker ps                    # Running containers only
docker ps -a                 # All containers (including stopped)
docker ps -q                 # Container IDs only
docker ps -a --format "table {{.Names}}\t{{.Status}}"  # Custom format

# Start/stop individual containers
docker start my-container
docker stop my-container
docker restart my-container
docker kill my-container     # Force stop (SIGKILL)

# Bulk operations
docker stop $(docker ps -q)              # Stop all running containers
docker start $(docker ps -aq)            # Start all stopped containers
docker rm $(docker ps -aq)               # Remove all containers
docker rm $(docker ps -aq -f status=exited)  # Remove exited containers only

# Container inspection
docker inspect my-container
docker logs my-container
docker logs -f my-container  # Follow log output
docker stats my-container    # Resource usage statistics
docker top my-container      # Running processes in container

# Execute commands in running container
docker exec -it my-container /bin/bash
docker exec my-container ls /app
```

### Image Management

```bash
# List images
docker images
docker images -a             # Include intermediate images
docker images -q             # Image IDs only

# Remove images
docker rmi my-image
docker rmi $(docker images -q)  # Remove all images
docker image prune           # Remove dangling images
docker image prune -a        # Remove all unused images

# Image inspection
docker inspect my-image
docker history my-image      # Layer history

# Tag and push
docker tag my-image registry.example.com/my-image:v1.0
docker push registry.example.com/my-image:v1.0

# Pull images
docker pull nginx:latest
docker pull --platform linux/amd64 nginx:latest
```

### Network and Volume Operations

```bash
# Network management
docker network ls
docker network create my-network
docker network inspect my-network
docker network rm my-network
docker network prune         # Remove unused networks

# Volume management
docker volume ls
docker volume create my-volume
docker volume inspect my-volume
docker volume rm my-volume
docker volume prune          # Remove unused volumes

# System cleanup
docker system df             # Show disk usage
docker system prune          # Remove all unused data
docker system prune -a       # Remove all unused data including images
```


## Interview Key Points

### Technical Concepts to Master

```ascii
╔════════════════════════════════════════════════════════════╗
║              INTERVIEW PREPARATION CHECKLIST               ║
╠════════════════════════════════════════════════════════════╣
║  [ ] Docker architecture (daemon, containerd, runc)       ║
║  [ ] Container vs VM differences                          ║
║  [ ] systemd integration and socket activation           ║
║  [ ] Image layers and caching mechanism                   ║
║  [ ] Networking modes (bridge, host, overlay)             ║
║  [ ] Volume types (bind mounts, named volumes)            ║
║  [ ] Multi-stage builds                                   ║
║  [ ] Security best practices                              ║
║  [ ] Docker Compose orchestration                         ║
║  [ ] Registry operations                                  ║
╚════════════════════════════════════════════════════════════╝
```

### Container Lifecycle Deep Dive

```mermaid
graph LR
    A[Image Pull] --> B[Container Create]
    B --> C[Container Start]
    C --> D[Running State]
    D --> E[Container Stop]
    E --> F{Keep Container?}
    F -->|Yes| G[Container Exists]
    F -->|No| H[Container Remove]
    G --> C
    H --> I[Cleanup Complete]
    
    style A fill:#3498db
    style D fill:#2ecc71
    style E fill:#e74c3c
    style H fill:#95a5a6
```

### Common Interview Questions

**Q: Explain the difference between docker.service and docker.socket.**

A: docker.service is the full Docker daemon process that manages containers, while docker.socket is a systemd socket unit that listens on /var/run/docker.sock. The socket provides on-demand activation: when a Docker command is executed, systemd automatically starts docker.service. This approach reduces resource consumption on development machines while maintaining full functionality.

**Q: How do you optimize Docker image size?**

A: Key strategies include:

- Use Alpine-based images
- Implement multi-stage builds
- Combine RUN commands to reduce layers
- Use .dockerignore to exclude unnecessary files
- Remove package manager caches
- Run as non-root user for security
- Leverage build cache effectively

**Q: Explain Docker networking modes.**

A:

- **Bridge**: Default mode, isolated network with NAT
- **Host**: Container shares host network stack
- **Overlay**: Multi-host networking for Swarm
- **Macvlan**: Assigns MAC address to container
- **None**: Disables networking

**Q: What is the difference between CMD and ENTRYPOINT?**

A: CMD provides default arguments that can be overridden at runtime, while ENTRYPOINT defines the executable that cannot be easily overridden. Best practice: use ENTRYPOINT for the main command and CMD for default arguments.

### Production Deployment Considerations

```mermaid
mindmap
  root((Production Docker))
    Resource Management
      CPU limits
      Memory limits
      Disk I/O constraints
      Network bandwidth
    High Availability
      Container orchestration
      Health checks
      Auto-restart policies
      Load balancing
    Security
      Non-root users
      Read-only filesystems
      Secret management
      Network policies
      Image scanning
    Monitoring
      Log aggregation
      Metrics collection
      Alerting
      Distributed tracing
    CI/CD Integration
      Automated builds
      Registry management
      Rolling updates
      Rollback strategies
```

### Performance Optimization

```bash
# View resource usage
docker stats

# Set resource limits
docker run -d \
  --memory="512m" \
  --memory-swap="1g" \
  --cpus="1.5" \
  --cpu-shares=1024 \
  my-image

# Disk usage analysis
docker system df -v

# Clean up unused resources
docker system prune -a --volumes
```



