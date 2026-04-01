---
---


## Runtime, Engine, Images, Containers & OCI Standards


## 2. DOCKER ENGINE: The High-Level Orchestrator

### Interview Q: "Explain Docker Engine and its components"

**Your Answer:**

"Docker Engine is the **complete system for managing containers and images**. It's client-server architecture:

```
┌─────────────────────────────────────────┐
│        Docker Engine                    │
├─────────────────────────────────────────┤
│                                         │
│  Docker CLI    Docker API   Docker Hub │
│  (docker cmd) (REST API)    (registry)  │
│        │          │              │     │
│        └─────────┬──────────────┘     │
│                  ↓                     │
│        Docker Daemon (dockerd)         │
│        • Image management              │
│        • Container lifecycle           │
│        • Network management            │
│        • Volume management             │
│        • Build system                  │
│                  ↓                     │
│        containerd (runtime)            │
│                  ↓                     │
│        runc (OCI runtime)              │
│                  ↓                     │
│        Linux kernel                    │
└─────────────────────────────────────────┘
```

**Docker Engine Components:**

1. **Docker Daemon (dockerd)**
    
    - Background service running on host
    - Listens on Unix socket (default: /var/run/docker.sock)
    - Manages all Docker operations
    - Can listen on TCP (security risk without TLS)
2. **Docker CLI (docker command)**
    
    - Command-line tool you use
    - Sends requests to daemon via REST API
    - Example: `docker run ubuntu:20.04 /bin/bash`
3. **Docker API (REST)**
    
    - HTTP/REST API exposed by daemon
    - Used by CLI, Docker Desktop, Docker Compose
    - Allows remote management
4. **Image Management**
    
    - Builds images from Dockerfile
    - Pulls images from registries
    - Stores images in local filesystem
    - Manages image layers and caching
5. **Container Management**
    
    - Creates containers from images
    - Manages container lifecycle (start, stop, pause)
    - Handles container resource limits
    - Manages logging
6. **Network Management**
    
    - Bridge network (default)
    - Host network
    - Overlay network (for Swarm/multi-host)
    - Custom networks with DNS

**Real example:**

````bash
$ docker run -d -p 8080:3000 --name web-app my-image:latest

What happens:
1. CLI parses command
2. Sends request to daemon via /var/run/docker.sock
3. Daemon pulls image if not exists
4. Daemon creates container with constraints
5. Daemon calls containerd to execute container
6. containerd calls runc
7. runc reads OCI spec, creates namespaces/cgroups
8. Process starts in container
9. Daemon sets up networking (port 8080:3000 mapping)
10. Returns container ID
```"


## 4. ORCHESTRATION: Managing Containers at Scale

### Interview Q: "What is container orchestration? Why do we need it?"

**Your Answer:**

"Container orchestration = **Automated management of containers across multiple machines**.

**Problem without orchestration:**

- You have 100 containers to run
- Each needs CPU, memory, networking
- Some fail, need automatic restart
- Need to scale to 200 during peak load
- Need to push updates to all containers
- Manual management = impossible

**Orchestration solves:**

1. **Placement**: Which container on which server?
2. **Scaling**: Start/stop containers based on load
3. **Health**: Restart failed containers
4. **Updates**: Rolling deployment (no downtime)
5. **Networking**: Service discovery, load balancing
6. **Storage**: Persistent volumes across machines

**Popular Orchestrators:**

|Tool|Use Case|Status|
|---|---|---|
|**Kubernetes**|Production, complex apps, cloud-native|Industry standard|
|**Docker Swarm**|Simple, built-in, easy to learn|Less used, simpler|
|**Nomad**|Multi-workload (containers + VMs + batch)|HashiCorp, flexible|
|**ECS**|AWS-only, integrated with AWS services|AWS users|

**Real example: Without orchestration**

```bash
# Manual way (nightmare)
docker run -d my-app:1.0  # Server 1
docker run -d my-app:1.0  # Server 2
docker run -d my-app:1.0  # Server 3
# App crashes on Server 1 → manually restart
docker run -d my-app:1.0  # Server 1 again
# Need to update to v2.0 → stop all, restart all
# Traffic spike → need 10 more containers → manual on 5 new servers
# Networking nightmare → manual port management
```

**With Kubernetes (automated)**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3  # Always 3 running
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: app
        image: my-app:2.0
        resources:
          limits:
            memory: "512Mi"
            cpu: "1"
```

**What Kubernetes does:**

- Starts 3 containers automatically
- If one dies → automatically restarts
- Load increases → scales to 10
- Load decreases → scales back to 3
- Update image to v2.0 → rolling update (1 at a time, no downtime)
- Service discovery → other apps find 'my-app' via DNS
- All automatic with declarative config"

### Follow-Up: "Kubernetes vs Docker Swarm?"

**Your Answer:**

|Aspect|Kubernetes|Docker Swarm|
|---|---|---|
|**Learning curve**|Steep|Easy|
|**Setup**|Complex (clusters, RBAC, etcd)|Built into Docker|
|**Scalability**|5000+ nodes|Hundreds of nodes|
|**Features**|Advanced (StatefulSets, Operators, etc)|Basic (Replicas, Services)|
|**Production ready**|Yes (industry standard)|Limited|
|**Community**|Massive|Small|
|**Production use**|95%+|Rarely|

**Real scenario:** I started with Docker Compose for dev, moved to Swarm for simple prod, scaled to Kubernetes for multi-region, high-availability."


## 6. COMPLETE WORKFLOW: Production Example

### Interview Q: "Walk me through your development to production workflow"

**Your Answer:**

```
┌─────────────────────────────────┐
│ STEP 1: Local Development       │
│ • Write Python code             │
│ • Test locally with docker run  │
│ • Works ✓                       │
└─────────────────────────────────┘
                ↓
┌─────────────────────────────────┐
│ STEP 2: Write Dockerfile        │
│ • Define image (FROM, RUN, COPY)│
│ • Optimize layers               │
│ • Multi-stage if needed         │
└─────────────────────────────────┘
                ↓
┌─────────────────────────────────┐
│ STEP 3: Build Image             │
│ $ docker build -t my-app:1.0 .  │
│ • Creates OCI image             │
│ • Size: 200MB                   │
│ • Ready to distribute           │
└─────────────────────────────────┘
                ↓
┌─────────────────────────────────┐
│ STEP 4: Test Image              │
│ $ docker run my-app:1.0         │
│ • Container runs locally        │
│ • Final check before push       │
└─────────────────────────────────┘
                ↓
┌─────────────────────────────────┐
│ STEP 5: Push to Registry        │
│ $ docker push gcr.io/my-app:1.0 │
│ • Uploads OCI image to GCR      │
│ • Available for production      │
│ • Can pull from any machine     │
└─────────────────────────────────┘
                ↓
┌─────────────────────────────────┐
│ STEP 6: Production (Kubernetes) │
│ • Kubectl applies deployment    │
│ • K8s scheduler picks nodes     │
│ • containerd pulls image        │
│ • runc creates containers       │
│ • Load balancer routes traffic  │
│ • App running ✓                 │
└─────────────────────────────────┘
                ↓
┌─────────────────────────────────┐
│ STEP 7: Monitoring              │
│ • Prometheus scrapes metrics    │
│ • Alerts on failures            │
│ • Auto-restart on crash         │
│ • Logs aggregated (ELK)         │
└─────────────────────────────────┘
                ↓
┌─────────────────────────────────┐
│ STEP 8: Update (v2.0)           │
│ • Update code, rebuild          │
│ • $ docker build -t my-app:2.0  │
│ • Push to registry              │
│ • Update K8s deployment         │
│ • Rolling update (no downtime)  │
│ • Old containers → new ones     │
└─────────────────────────────────┘
```

**Real GitOps workflow (CI/CD):**

```
Developer pushes code to GitHub
        ↓
GitHub Actions triggered
        ↓
Docker build + test
        ↓
docker push gcr.io/my-app:sha-abc123
        ↓
Helm / Kustomize generates K8s manifests
        ↓
ArgoCD detects new image
        ↓
kubectl apply -f deployment.yaml (automated)
        ↓
K8s pulls image from GCR
        ↓
Containers run in production
        ↓
Production = Source of truth (declarative)
```


## 8. QUICK REFERENCE COMMANDS

```bash
# Build image
docker build -t my-app:1.0 -f Dockerfile .

# Run container
docker run -d -p 8080:3000 --name my-container my-app:1.0

# View running containers
docker ps

# View image layers
docker history my-app:1.0

# Inspect image
docker inspect my-app:1.0

# Push to registry
docker tag my-app:1.0 gcr.io/my-app:1.0
docker push gcr.io/my-app:1.0

# Check image size
docker images my-app

# View image config
docker image inspect --format='{{json .ContainerConfig}}' my-app:1.0 | jq

# OCI runtime info
docker info | grep -i runtime
```

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                USER LAYER                                 │
├──────────────────────────────────────────────────────────────────────────┤
│                          Docker CLI (Client)                               │
│        docker run | docker build | docker pull | docker ps                 │
└──────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                           SERVICE MANAGEMENT                               │
├──────────────────────────────────────────────────────────────────────────┤
│                        docker.service (systemd)                            │
│              - Starts / stops dockerd                                      │
│              - Manages daemon lifecycle                                    │
└──────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌══════════════════════════════════════════════════════════════════════════┐
║                         DOCKER ENGINE LAYER                               ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║   ┌──────────────────────────┐      ┌──────────────────────────┐         ║
║   │   Docker Daemon           │<---->│       containerd        │         ║
║   │        (dockerd)          │ gRPC │   (Container Runtime)   │         ║
║   │--------------------------│       │-------------------------│         ║
║   │ - REST API                │      │ - Image management      │         ║
║   │ - Build / Pull / Push     │      │ - Snapshotting          │         ║
║   │ - Network mgmt            │      │ - Con5tainer lifecycle   │         ║
║   │ - Volume mgmt             │      │ - CRI for Kubernetes    │         ║
║   └──────────────────────────┘      └──────────────┬───────────┘         ║
║                                                      │ OCI               ║
╚══════════════════════════════════════════════════════╧═══════════════════╝
                                                       │
                                                       ▼
┌══════════════════════════════════════════════════════════════════════════┐
║                          RUNTIME EXECUTION LAYER                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║   ┌──────────────────────────┐      ┌──────────────────────────┐        ║
║   │          runc             │      │     containerd-shim       │        ║
║   │      (OCI Runtime)        │      │--------------------------│        ║
║   │--------------------------│      │ - Keeps container alive   │        ║
║   │ - Create namespaces       │      │ - Handles STDIO          │        ║
║   │ - Apply cgroups           │      │ - Signal forwarding      │        ║
║   │ - Mount rootfs            │      │ - Exit status reporting  │        ║
║   │ - Start process           │      │                          │        ║
║   │ - Exits after start       │      │                          │        ║
║   └──────────────────────────┘      └──────────────────────────┘        ║
╚══════════════════════════════════════════════════════════════════════════╝
                                     │
                                     ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                              KERNEL LAYER                                 │
├──────────────────────────────────────────────────────────────────────────┤
│  Linux Kernel Features                                                     │
│  ────────────────────                                                     │
│  Namespaces : pid | net | mnt | uts | ipc | user                            │
│  cgroups    : cpu | memory | io | pids                                     │
│  FS         : OverlayFS                                                    │
└──────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                             HARDWARE LAYER                                │
├──────────────────────────────────────────────────────────────────────────┤
│                  CPU | RAM | Disk | Network                                │
└──────────────────────────────────────────────────────────────────────────┘

```
