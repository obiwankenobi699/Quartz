---
---



## 1. Operating System Basics

### Definition of Operating System

An **Operating System** is a software program that acts as an intermediary between computer hardware and users. It manages hardware resources and provides services for application programs.

**Key Points:**

- Interface between user and hardware
- Resource manager and coordinator
- Enables program execution
- Provides user-friendly environment

### Functions of OS

1. **Process Management**: Creation, scheduling, termination
2. **Memory Management**: Allocation, deallocation, virtual memory
3. **File Management**: File creation, deletion, access control
4. **Device Management**: I/O operations, device drivers
5. **Security & Protection**: Authentication, authorization, access control
6. **Command Interpretation**: User interface (CLI/GUI)
7. **Error Detection**: Monitoring and handling errors
8. **Resource Allocation**: CPU, memory, I/O devices

### OS as Resource Manager

OS manages four main resources:

**1. CPU Management**

- Process scheduling
- Context switching
- CPU utilization optimization

**2. Memory Management**

- RAM allocation
- Virtual memory
- Memory protection

**3. I/O Device Management**

- Device allocation
- Buffering and caching
- Driver management

**4. Storage Management**

- File system organization
- Disk space allocation
- Access control

### Types of Operating Systems

#### Batch Operating System

**Characteristics:**

- Jobs collected in batches
- No direct user interaction
- Sequential execution
- CPU idle time reduced

**Advantages:**

- Efficient CPU utilization
- Can handle large workloads
- Shared computer resources

**Disadvantages:**

- No user interaction
- Difficult to debug
- Jobs can get stuck waiting

**Examples**: IBM mainframe systems, payroll systems


#### Multitasking OS (Time-Sharing)

**Concept**: CPU switches between tasks so quickly that users can interact with each program

**Key Features:**

- Time quantum/time slice allocated
- Rapid context switching
- Multiple users can work simultaneously
- Interactive environment

**Difference from Multiprogramming:**

- Multiprogramming: Maximize CPU utilization
- Multitasking: Minimize response time

**Examples**: Windows, Linux, macOS


#### Distributed OS

**Concept**: Multiple independent computers appear as single system

**Characteristics:**

- Connected via network
- Resource sharing
- Computation speedup
- Transparency to users

**Types:**

- Client-Server systems
- Peer-to-Peer systems
- N-tier architectures

**Examples**: Google's infrastructure, Apache Hadoop


## 2. OS Structure & Design

### OS Services

Operating systems provide various services to users and programs:

**1. User Interface Services**

- CLI (Command Line Interface)
- GUI (Graphical User Interface)
- Batch interface

**2. Program Execution**

- Load programs into memory
- Run programs
- Terminate execution

**3. I/O Operations**

- File I/O
- Device I/O
- Buffering and caching

**4. File System Manipulation**

- Create, delete files/directories
- Search, list files
- Permission management

**5. Communications**

- Inter-process communication (IPC)
- Network communication
- Shared memory, message passing

**6. Error Detection**

- Hardware errors (CPU, memory, I/O)
- Software errors (divide by zero, invalid memory access)
- Logging and debugging

**7. Resource Allocation**

- CPU scheduling
- Memory allocation
- I/O device allocation

**8. Protection and Security**

- Access control
- User authentication
- Defend against external threats

### System Calls

**Definition**: Interface between user programs and OS kernel

**Purpose:**

- Request OS services
- Controlled access to hardware
- Mode switching (user → kernel mode)

**Types of System Calls:**

**1. Process Control**

- `fork()` - Create process
- `exit()` - Terminate process
- `wait()` - Wait for process
- `exec()` - Execute program
- `kill()` - Send signal

**2. File Management**

- `open()` - Open file
- `read()` - Read from file
- `write()` - Write to file
- `close()` - Close file
- `lseek()` - Reposition file pointer

**3. Device Management**

- `ioctl()` - Device control
- `read()` - Read from device
- `write()` - Write to device

**4. Information Maintenance**

- `getpid()` - Get process ID
- `time()` - Get system time
- `sleep()` - Suspend execution

**5. Communication**

- `pipe()` - Create pipe
- `socket()` - Create socket
- `send()`, `recv()` - Network communication

**System Call Mechanism:**

```
User Program
    ↓ (system call)
Trap to Kernel Mode
    ↓
System Call Handler
    ↓
Execute Kernel Code
    ↓
Return to User Mode
    ↓
Continue User Program
```

### OS Structures

#### Monolithic Kernel

**Architecture:**

- All OS services in single large kernel
- Everything runs in kernel mode
- Tightly integrated

**Advantages:**

- Fast performance (no mode switching overhead)
- Direct access to hardware
- Efficient communication between modules

**Disadvantages:**

- Large kernel size
- Difficult to maintain
- Single point of failure
- Hard to debug

**Examples**: Traditional Unix, Linux (technically modular monolithic)


#### Microkernel

**Concept**: Minimal kernel with only essential services

**Kernel Contains Only:**

- Basic IPC (Inter-Process Communication)
- Basic memory management
- Low-level process management
- Basic I/O

**User Space Contains:**

- File system
- Device drivers
- Network stack
- Higher-level services

**Advantages:**

- Easy to extend
- More reliable (less code in kernel)
- More secure
- Portable

**Disadvantages:**

- Performance overhead (frequent mode switching)
- Complex IPC mechanisms

**Examples**: Minix, QNX, L4


### User Mode vs Kernel Mode

**Purpose**: Protection mechanism to prevent user programs from damaging OS

#### User Mode (Unprivileged Mode)

**Characteristics:**

- Limited access to hardware
- Cannot execute privileged instructions
- Cannot access kernel memory
- Most application code runs here

**Restrictions:**

- No direct hardware access
- No memory management operations
- No interrupt handling
- Must use system calls for OS services


**Mode Switching:**

```
User Mode Program
    ↓
System Call / Interrupt / Exception
    ↓
Switch to Kernel Mode
    ↓
Execute Kernel Code
    ↓
Switch back to User Mode
    ↓
Resume User Program
```

**Why Two Modes?**

1. **Protection**: Prevent user programs from crashing OS
2. **Security**: Isolate user programs from each other
3. **Stability**: Bugs in user programs don't affect kernel
4. **Resource Management**: Controlled access to resources


# **Types of File Systems (OS – Core CSE)**

A **file system** defines how data is stored, organized, accessed, and managed on storage devices.


## **2. Network File Systems**

Allow files to be accessed over a network as if they were local.

### **Types:**

- **NFS (Network File System)**
    
- **SMB / CIFS**
    
- **AFS**
    
- **DFS**
    

**Key Characteristics:**

- Client–server model
    
- Centralized storage
    
- Used in distributed systems
    


## **4. Virtual File Systems (VFS)**

An abstraction layer that provides a common interface to different file systems.

### **Examples:**

- **Linux VFS**
    
- **procfs (/proc)**
    
- **sysfs (/sys)**
    

**Key Characteristics:**

- Not real storage
    
- Kernel-level abstraction
    
- Allows multiple FS types to coexist
    


## **6. Flash File Systems**

Optimized for flash memory like SSDs and embedded devices.

### **Types:**

- **JFFS2**
    
- **YAFFS**
    
- **F2FS**
    

**Key Characteristics:**

- Wear leveling
    
- Low write amplification
    
- Used in embedded systems
    


## **8. Memory-Based File Systems**

Files are stored in RAM instead of disk.

### **Types:**

- **tmpfs**
    
- **ramfs**
    

**Key Characteristics:**

- Very fast
    
- Volatile (data lost on reboot)
    
- Used for temporary storage
    


# **Interview-Oriented Classification (Very Important)**

```
File Systems
│
├── Disk File Systems
├── Network File Systems
├── Distributed File Systems
├── Journaling File Systems
├── Virtual File Systems
├── Flash File Systems
├── Memory File Systems
├── Read-Only File Systems
└── Object-Based File Systems
```

