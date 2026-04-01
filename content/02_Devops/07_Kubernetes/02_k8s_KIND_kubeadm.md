---
---
## Understanding the Architecture

### What is Kubeadm?

Kubeadm is a tool that helps you bootstrap a production-grade Kubernetes cluster. Unlike Minikube (single-node, automated) or Kind (Docker-based, simulated multi-node), kubeadm creates a **real, distributed multi-machine cluster**.

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                          AWS VPC                                 │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              CONTROL PLANE (MASTER NODE)                   │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │  Control Plane Components (Static Pods)             │  │ │
│  │  │  ├─ kube-apiserver (Port 6443)                      │  │ │
│  │  │  ├─ etcd (Cluster Database)                         │  │ │
│  │  │  ├─ kube-scheduler                                   │  │ │
│  │  │  └─ kube-controller-manager                          │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │  Node Components                                      │  │ │
│  │  │  ├─ kubelet (Port 10250)                             │  │ │
│  │  │  └─ containerd (Container Runtime)                   │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                  WORKER NODE 1                             │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │  ├─ kubelet (Port 10250)                             │  │ │
│  │  │  ├─ containerd (Container Runtime)                   │  │ │
│  │  │  └─ Pods (Your Applications)                         │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                  WORKER NODE 2                             │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │  ├─ kubelet (Port 10250)                             │  │ │
│  │  │  ├─ containerd (Container Runtime)                   │  │ │
│  │  │  └─ Pods (Your Applications)                         │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Key Differences from Minikube and Kind

|Feature|Kubeadm|Minikube|Kind|
|---|---|---|---|
|**Setup Complexity**|Manual (You install everything)|Automated|Automated|
|**Container Runtime**|You install (containerd/Docker)|Pre-installed|Uses host Docker|
|**Multi-Node**|Real separate machines|Single VM|Simulated (Docker containers)|
|**Production Use**|Yes|No (dev only)|No (testing only)|
|**Networking**|You install CNI plugin|Pre-configured|Pre-configured|
|**Resource Usage**|Multiple VMs/machines|Single VM|Single machine|

**Why Manual Setup?**

- Production environments need customization
- You control every component
- Understanding how Kubernetes actually works
- Security and compliance requirements


## Setup Flow Diagram

```
START
  │
  ├─→ AWS Infrastructure Setup (All Nodes)
  │    ├─→ Create Security Group
  │    ├─→ Configure Inbound Rules
  │    └─→ Launch EC2 Instances
  │
  ├─→ Common Setup (All Nodes: Master + Workers)
  │    ├─→ Disable Swap
  │    ├─→ Load Kernel Modules
  │    ├─→ Configure Sysctl Parameters
  │    ├─→ Install Container Runtime (containerd)
  │    └─→ Install Kubernetes Components (kubelet, kubeadm, kubectl)
  │
  ├─→ Master Node Only Setup
  │    ├─→ Initialize Cluster (kubeadm init)
  │    ├─→ Configure kubectl
  │    ├─→ Install Network Plugin (Calico)
  │    └─→ Generate Join Command
  │
  └─→ Worker Nodes Only Setup
       ├─→ Reset Previous Configurations
       └─→ Join Cluster (kubeadm join)
```


## STEP 2: Common Setup (Execute on ALL Nodes)

> **Critical**: Run these commands as root or with sudo on BOTH Master and Worker nodes

### 2.1 Disable Swap

**Why**: Kubernetes requires swap to be disabled because:

- kubelet refuses to start if swap is enabled
- Memory management conflicts with cgroups
- Unpredictable pod performance

**Command**:

```bash
sudo swapoff -a
```

**Explanation**:

- `swapoff -a` disables all swap devices temporarily
- Changes revert after reboot

**Make Permanent**:

```bash
sudo sed -i '/ swap / s/^/#/' /etc/fstab
```

**Explanation**:

- `sed` edits `/etc/fstab` file
- Comments out any line containing "swap"
- Prevents swap from re-enabling on reboot

**Verify**:

```bash
free -h
```

Look for "Swap: 0B" in output


### 2.3 Configure Sysctl Parameters

**Why**: Configure kernel networking parameters for Kubernetes:

**Parameters Explained**:

```
net.bridge.bridge-nf-call-iptables  = 1
→ Allow iptables to process bridge traffic (Pod networking)

net.bridge.bridge-nf-call-ip6tables = 1
→ Allow ip6tables for IPv6 bridge traffic

net.ipv4.ip_forward = 1
→ Enable IP forwarding (required for pod-to-pod communication)
```

**Step 1: Create Sysctl Configuration**:

```bash
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF
```

**Step 2: Apply Settings**:

```bash
sudo sysctl --system
```

**Explanation**:

- Reloads all sysctl configuration files
- Applies changes immediately

**Step 3: Verify Settings**:

```bash
sysctl net.bridge.bridge-nf-call-iptables
sysctl net.bridge.bridge-nf-call-ip6tables
sysctl net.ipv4.ip_forward
```

**Expected Output**:

```
net.bridge.bridge-nf-call-iptables = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward = 1
```


### 2.5 Install Kubernetes Components

**Components to Install**:

- **kubelet**: Node agent that runs on each node
- **kubeadm**: Tool to bootstrap cluster
- **kubectl**: Command-line tool to interact with cluster

**Installation Flow**:

```
Update System → Add Kubernetes GPG Key → Add Kubernetes Repository → Install Components → Hold Versions
```

**Step 1: Install Prerequisites**:

```bash
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl gpg
```

**Explanation**:

- `apt-transport-https`: Download packages over HTTPS
- `gpg`: GNU Privacy Guard for key management

**Step 2: Download Kubernetes GPG Key**:

```bash
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.29/deb/Release.key | \
sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
```

**Explanation**:

- Downloads Kubernetes v1.29 repository key
- `gpg --dearmor`: Converts ASCII key to binary format
- Stores in `/etc/apt/keyrings/`

**Step 3: Add Kubernetes Repository**:

```bash
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] \
https://pkgs.k8s.io/core:/stable:/v1.29/deb/ /' | \
sudo tee /etc/apt/sources.list.d/kubernetes.list
```

**Explanation**:

- Adds Kubernetes v1.29 repository
- `signed-by`: Specifies GPG key for verification

**Step 4: Update Package Index**:

```bash
sudo apt-get update
```

**Step 5: Install Kubernetes Components**:

```bash
sudo apt-get install -y kubelet kubeadm kubectl
```

**Component Roles**:

- **kubelet**: Runs on every node, manages pods and containers
- **kubeadm**: Initializes and manages cluster
- **kubectl**: CLI for cluster management (optional on workers)

**Step 6: Hold Package Versions**:

```bash
sudo apt-mark hold kubelet kubeadm kubectl
```

**Why Hold Versions?**

- Prevents automatic updates
- Cluster components must be same version
- Manual upgrade control
- Avoids version mismatch issues

**Verify Installation**:

```bash
kubeadm version
kubelet --version
kubectl version --client
```

**Expected Output**:

```
kubeadm version: v1.29.x
kubelet version: v1.29.x
kubectl version: v1.29.x
```


### 3.2 Configure kubectl Access

**Why**: kubectl needs credentials to communicate with API server

**Step 1: Create .kube Directory**:

```bash
mkdir -p "$HOME"/.kube
```

**Explanation**:

- Creates hidden directory in user's home
- `-p`: creates parent directories if needed
- `$HOME`: environment variable for home directory

**Step 2: Copy Admin Configuration**:

```bash
sudo cp -i /etc/kubernetes/admin.conf "$HOME"/.kube/config
```

**Explanation**:

- Copies cluster admin credentials
- `-i`: prompts before overwriting existing file
- `admin.conf`: full cluster administrator access

**Step 3: Change File Ownership**:

```bash
sudo chown "$(id -u)":"$(id -g)" "$HOME"/.kube/config
```

**Explanation**:

- `$(id -u)`: current user's UID
- `$(id -g)`: current user's GID
- Makes file owned by current user (not root)

**Verify Configuration**:

```bash
kubectl cluster-info
```

**Expected Output**:

```
Kubernetes control plane is running at https://<master-ip>:6443
CoreDNS is running at https://<master-ip>:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
```

**Check Node Status** (will be NotReady until CNI installed):

```bash
kubectl get nodes
```

**Expected Output**:

```
NAME         STATUS     ROLES           AGE   VERSION
k8s-master   NotReady   control-plane   1m    v1.29.x
```


### 3.4 Generate Join Command for Worker Nodes

**Command**:

```bash
kubeadm token create --print-join-command
```

**What This Does**:

- Creates a new bootstrap token (valid for 24 hours)
- Generates complete join command with token and CA cert hash
- Prints command that worker nodes will use

**Example Output**:

```bash
kubeadm join 172.31.10.15:6443 --token abcdef.1234567890abcdef \
--discovery-token-ca-cert-hash sha256:1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

**Command Breakdown**:

- `172.31.10.15:6443`: Master node's private IP and API server port
- `--token`: Authentication token for joining
- `--discovery-token-ca-cert-hash`: Verifies API server's CA certificate

**Important**:

- Save this entire command
- You'll need it for worker nodes
- Token expires in 24 hours
- Generate new token if expired: `kubeadm token create --print-join-command`


### 4.2 Join Worker Node to Cluster

**Command Template**:

```bash
sudo kubeadm join <MASTER_PRIVATE_IP>:6443 \
--token <TOKEN> \
--discovery-token-ca-cert-hash sha256:<HASH> \
--cri-socket unix:///run/containerd/containerd.sock \
--v=5
```

**Flag Explanations**:

|Flag|Purpose|Value|
|---|---|---|
|`<MASTER_PRIVATE_IP>`|Master node's private IP|e.g., 172.31.10.15|
|`--token`|Authentication token|From join command|
|`--discovery-token-ca-cert-hash`|Verify master's CA cert|From join command|
|`--cri-socket`|Container runtime socket|`unix:///run/containerd/containerd.sock`|
|`--v=5`|Verbose logging level|Helps with troubleshooting|

**Why --cri-socket is Needed**:

- Tells kubelet which container runtime to use
- Required when multiple runtimes are present
