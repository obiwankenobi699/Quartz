---
---
## Table of Contents

1. [What is Hadoop?](https://claude.ai/chat/a9f210c4-2570-4485-90f1-6755fa8f7fa6#what-is-hadoop)
2. [HDFS (Hadoop Distributed File System)](https://claude.ai/chat/a9f210c4-2570-4485-90f1-6755fa8f7fa6#hdfs)
3. [MapReduce](https://claude.ai/chat/a9f210c4-2570-4485-90f1-6755fa8f7fa6#mapreduce)
4. [YARN (Yet Another Resource Negotiator)](https://claude.ai/chat/a9f210c4-2570-4485-90f1-6755fa8f7fa6#yarn)
5. [Complete Workflow Example](https://claude.ai/chat/a9f210c4-2570-4485-90f1-6755fa8f7fa6#complete-workflow)


## HDFS (Hadoop Distributed File System)

### What is HDFS?

A **distributed file system** designed to store massive files across multiple machines reliably.

### Architecture:

```
                    HDFS ARCHITECTURE
                           
        ┌──────────────────────────────────────────┐
        │         NAMENODE (Master)                │
        │  • Manages file system metadata          │
        │  • Tracks where blocks are stored        │
        │  • Coordinates file operations           │
        │  • Single point of coordination          │
        └──────────────────────────────────────────┘
                      |
        ──────────────┼──────────────┬──────────────
                      |              |              
        ┌─────────────▼───┐  ┌───────▼──────┐  ┌──────▼──────┐
        │  DATANODE 1     │  │  DATANODE 2  │  │ DATANODE 3  │
        │  (Worker)       │  │  (Worker)    │  │ (Worker)    │
        │                 │  │              │  │             │
        │  Block A-1      │  │  Block A-2   │  │ Block A-3   │
        │  Block B-1      │  │  Block C-1   │  │ Block B-2   │
        │  Block C-2      │  │  Block B-3   │  │ Block C-3   │
        └─────────────────┘  └──────────────┘  └─────────────┘
```

### How HDFS Works:

#### 1. File Storage (Writing):

```
ORIGINAL FILE: largefile.txt (300 MB)
                    |
                    v
        ┌───────────────────────┐
        │  STEP 1: Split File   │
        │  into Blocks          │
        │  (Default: 128 MB)    │
        └───────────────────────┘
                    |
        ┌───────────┴───────────┬───────────┐
        v                       v           v
    Block 1                 Block 2     Block 3
    (128 MB)               (128 MB)     (44 MB)
        |                       |           |
        v                       v           v
┌───────────────────────────────────────────────────┐
│  STEP 2: Replicate Blocks (Default: 3 copies)    │
└───────────────────────────────────────────────────┘
        |
        v

    Block 1 Replicas:          Block 2 Replicas:
    ┌──────────────┐          ┌──────────────┐
    │ DataNode A   │          │ DataNode B   │
    │ DataNode C   │          │ DataNode A   │
    │ DataNode E   │          │ DataNode D   │
    └──────────────┘          └──────────────┘

                Block 3 Replicas:
                ┌──────────────┐
                │ DataNode C   │
                │ DataNode D   │
                │ DataNode E   │
                └──────────────┘
```

#### 2. File Retrieval (Reading):

```
CLIENT REQUEST: Read largefile.txt
        |
        v
┌────────────────────────────────┐
│ STEP 1: Contact NameNode       │
│ "Where are blocks for file X?" │
└────────────────────────────────┘
        |
        v
┌────────────────────────────────┐
│ NameNode Returns Map:          │
│ Block 1 → [DataNode A, C, E]   │
│ Block 2 → [DataNode B, A, D]   │
│ Block 3 → [DataNode C, D, E]   │
└────────────────────────────────┘
        |
        v
┌────────────────────────────────┐
│ STEP 2: Client Reads Directly  │
│ from DataNodes (parallel)      │
└────────────────────────────────┘
        |
    ┌───┴───┬────────┐
    v       v        v
Block 1  Block 2  Block 3
(from A) (from B) (from C)
    |       |        |
    └───┬───┴───┬────┘
        v       v
    Reassemble File
```

### Key Features:

**Replication (Fault Tolerance):**

```
If DataNode C fails:
Before:                      After:
┌─────────────┐             ┌─────────────┐
│ DataNode A  │             │ DataNode A  │
│ DataNode C  │ ← FAILED    │ DataNode E  │ ← Re-replicated
│ DataNode E  │             │ DataNode F  │ ← Re-replicated
└─────────────┘             └─────────────┘

NameNode detects failure and triggers re-replication
to maintain 3 copies automatically
```

**Rack Awareness:**

```
        Data Center
    ┌──────────────────┐
    │   Rack 1         │   Rack 2
    │  ┌─────┐         │  ┌─────┐
    │  │Node1│         │  │Node4│
    │  │Node2│         │  │Node5│
    │  │Node3│         │  │Node6│
    │  └─────┘         │  └─────┘
    └──────────────────┘

Block Replica Placement Strategy:
• Replica 1: Same node as writer
• Replica 2: Different rack
• Replica 3: Same rack as Replica 2

This protects against both node AND rack failures
```


## YARN (Yet Another Resource Negotiator)

### What is YARN?

YARN is the **resource management layer** that schedules jobs and allocates resources across the cluster.

### Why YARN?

**Hadoop 1.0 Problem:**

```
OLD (MapReduce v1):
┌────────────────────────┐
│  JobTracker            │  ← Single point managing
│  (Does Everything)     │     BOTH resources AND jobs
│                        │     (Bottleneck!)
└────────────────────────┘
           |
    ┌──────┴──────┬──────┐
    ▼             ▼      ▼
TaskTracker  TaskTracker  TaskTracker
```

**YARN Solution (Separation of Concerns):**

```
NEW (YARN):
┌────────────────────────┐
│  ResourceManager       │  ← Manages resources ONLY
└────────────────────────┘
           |
    ┌──────┴──────┬──────┐
    ▼             ▼      ▼
NodeManager  NodeManager  NodeManager

Per-Application:
┌────────────────────────┐
│  ApplicationMaster     │  ← Manages ONE job
└────────────────────────┘
```

### YARN Architecture:

```
                    YARN COMPONENTS

    ┌─────────────────────────────────────────────┐
    │         RESOURCEMANAGER (Master)            │
    │                                             │
    │  ┌──────────────┐    ┌──────────────────┐  │
    │  │  Scheduler   │    │ ApplicationsManager│ │
    │  │              │    │                    │ │
    │  │ • Allocates  │    │ • Accepts jobs    │ │
    │  │   resources  │    │ • Starts AppMaster│ │
    │  └──────────────┘    └──────────────────┘  │
    └─────────────────────────────────────────────┘
                     |
        ─────────────┼─────────────┬──────────────
                     |             |
        ┌────────────▼──────┐  ┌───▼──────────────┐
        │ NODEMANAGER 1     │  │ NODEMANAGER 2    │
        │ (Worker)          │  │ (Worker)         │
        │                   │  │                  │
        │ ┌───────────────┐ │  │ ┌──────────────┐│
        │ │ Container 1   │ │  │ │ Container 3  ││
        │ │ (2GB, 2 CPU)  │ │  │ │ (1GB, 1 CPU) ││
        │ └───────────────┘ │  │ └──────────────┘│
        │                   │  │                  │
        │ ┌───────────────┐ │  │ ┌──────────────┐│
        │ │ Container 2   │ │  │ │ Container 4  ││
        │ │ (4GB, 4 CPU)  │ │  │ │ (2GB, 2 CPU) ││
        │ └───────────────┘ │  │ └──────────────┘│
        └───────────────────┘  └──────────────────┘
```

### Key Components:

**1. ResourceManager (RM):**

- Global resource scheduler
- Tracks available resources across cluster
- Allocates containers to applications

**2. NodeManager (NM):**

- Per-machine agent
- Manages containers on that node
- Monitors resource usage (CPU, RAM, disk)
- Reports to ResourceManager

**3. ApplicationMaster (AM):**

- Per-application coordinator
- Negotiates resources with ResourceManager
- Works with NodeManagers to execute tasks
- Monitors task progress

**4. Container:**

- Unit of resource allocation
- Defined by: CPU cores, RAM, disk, network
- Runs application tasks

### Job Submission Flow:

```
STEP-BY-STEP: How a MapReduce Job Runs on YARN

STEP 1: Client Submits Job
───────────────────────────
    ┌────────┐
    │ Client │──────┐
    └────────┘      │ "Run my MapReduce job"
                    ▼
            ┌──────────────┐
            │ResourceManager│
            └──────────────┘

STEP 2: RM Allocates Container for ApplicationMaster
──────────────────────────────────────────────────────
    ┌──────────────┐
    │ResourceManager│────► "Start AM in Container"
    └──────────────┘              │
                                  ▼
                        ┌────────────────┐
                        │ NodeManager 1  │
                        │  ┌──────────┐  │
                        │  │ Container│  │
                        │  │   (AM)   │  │
                        │  └──────────┘  │
                        └────────────────┘

STEP 3: ApplicationMaster Requests Resources
─────────────────────────────────────────────
    ┌────────────────────┐
    │ ApplicationMaster  │──────► "Need 5 containers"
    │ (for MapReduce)    │        "for Map tasks"
    └────────────────────┘
                │
                ▼
    ┌──────────────┐
    │ResourceManager│──────► "Allocating..."
    └──────────────┘

STEP 4: RM Allocates Containers
────────────────────────────────
    ┌──────────────┐
    │ResourceManager│
    └──────────────┘
            │
        ┌───┴───┬───────┬───────┐
        ▼       ▼       ▼       ▼
    ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
    │ NM 1 │ │ NM 2 │ │ NM 3 │ │ NM 4 │
    │┌────┐│ │┌────┐│ │┌────┐│ │┌────┐│
    ││Cont││ ││Cont││ ││Cont││ ││Cont││
    │└────┘│ │└────┘│ │└────┘│ │└────┘│
    └──────┘ └──────┘ └──────┘ └──────┘

STEP 5: ApplicationMaster Launches Tasks
─────────────────────────────────────────
    ┌────────────────────┐
    │ ApplicationMaster  │───► Launch Map tasks
    └────────────────────┘     in containers
                │
        ┌───────┼───────┬───────┐
        ▼       ▼       ▼       ▼
    ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
    │Map 1 │ │Map 2 │ │Map 3 │ │Map 4 │
    │ Task │ │ Task │ │ Task │ │ Task │
    └──────┘ └──────┘ └──────┘ └──────┘

STEP 6: Monitor & Complete
───────────────────────────
    ┌────────────────────┐
    │ ApplicationMaster  │
    │                    │
    │ • Monitors tasks   │
    │ • Handles failures │
    │ • Reports progress │
    │ • Launches Reduce  │
    └────────────────────┘
                │
                ▼
    ┌──────────────┐
    │ResourceManager│◄─── "Job Complete"
    └──────────────┘
                │
                ▼
            ┌────────┐
            │ Client │◄─── Notification
            └────────┘
```

### Container Allocation Example:

```
Cluster Resources:
┌─────────────────────────────────────┐
│ Total: 100 GB RAM, 50 CPU cores     │
└─────────────────────────────────────┘

Job Submission:
┌─────────────────────────────────────┐
│ MapReduce Job Requests:             │
│ • 10 Map tasks (2GB, 1 CPU each)    │
│ • 5 Reduce tasks (4GB, 2 CPU each)  │
│ • 1 ApplicationMaster (2GB, 1 CPU)  │
└─────────────────────────────────────┘

YARN Allocation:
─────────────────
ApplicationMaster:  1 × (2GB, 1 CPU)  = 2GB,  1 CPU
Map Containers:    10 × (2GB, 1 CPU)  = 20GB, 10 CPU
Reduce Containers:  5 × (4GB, 2 CPU)  = 20GB, 10 CPU
                                      ───────────────
Total Used:                            42GB, 21 CPU

Remaining:                             58GB, 29 CPU
(Available for other jobs)
```


## Key Concepts Summary

### Data Locality (Critical for Performance):

```
BAD (No Data Locality):
────────────────────────
    ┌──────────┐                    ┌──────────┐
    │ Mapper   │◄───network────────►│  Data    │
    │ (Node A) │    transfer        │ (Node Z) │
    └──────────┘    (SLOW!)         └──────────┘

GOOD (Data Locality):
─────────────────────
    ┌──────────────────┐
    │  Same Node       │
    │  ┌──────────┐    │
    │  │ Mapper   │    │  ← No network!
    │  └────┬─────┘    │     (FAST!)
    │       │         │
    │  ┌────▼─────┐   │
    │  │   Data   │   │  ← Local read
    │  └──────────┘   │
    └──────────────────┘

Hadoop scheduler tries to run mappers on nodes
that already have the data blocks!
```

### Fault Tolerance Mechanisms:

```
SCENARIO: Node Failure During Job
──────────────────────────────────

Initial State (5 Mappers running):
┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐
│Map 1 │  │Map 2 │  │Map 3 │  │Map 4 │  │Map 5 │
│Node A│  │Node B│  │Node C│  │Node D│  │Node E│
└──────┘  └──────┘  └──────┘  └──────┘  └──────┘
  ✓         ✓         ✓         ✓         ✓

                    ↓
            Node C FAILS! ❌
                    ↓

┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐
│Map 1 │  │Map 2 │  │  ❌  │  │Map 4 │  │Map 5 │
│Done  │  │Done  │  │FAILED│  │Running│ │Running│
└──────┘  └──────┘  └──────┘  └──────┘  └──────┘

                    ↓
        ApplicationMaster Detects Failure
                    ↓
        Requests New Container for Map 3
                    ↓
┌──────────────────────────────────────┐
│ YARN allocates on Node F             │
│ Map 3 RESTARTS (reads from HDFS)     │
│ (Data still available - replicated!) │
└──────────────────────────────────────┘
                    ↓
                  ✓ RECOVERED
```

### Scalability:

```
SCALING EXAMPLE: Processing Time vs Cluster Size

Dataset: 1 TB
Task: Word Count

1 Node Cluster:
┌────┐
│ N1 │  Time: ~24 hours
└────┘

10 Node Cluster:
┌────┬────┬────┬────┬────┬────┬────┬────┬────┬────┐
│ N1 │ N2 │ N3 │ N4 │ N5 │ N6 │ N7 │ N8 │ N9 │N10 │
└────┴────┴────┴────┴────┴────┴────┴────┴────┴────┘
Time: ~2.5 hours (near-linear scaling)

100 Node Cluster:
┌────┬────┬────┬─  ─┬────┬────┐
│ N1 │ N2 │ N3 │....│N99 │N100│
└────┴────┴────┴─  ─┴────┴────┘
Time: ~20 minutes

Add more nodes → Process faster
(Horizontal Scaling)
```


## Advanced Concepts

### Combiners (Local Reduce)

```
WITHOUT COMBINER:
─────────────────
Mapper Output:
(hello, 1), (hello, 1), (hello, 1), ... (1000 times)
         ↓
All 1000 pairs sent over network
         ↓
Reducer receives 1000 values to sum

Network Traffic: HIGH
Reducer Load: HIGH


WITH COMBINER:
──────────────
Mapper Output:
(hello, 1), (hello, 1), (hello, 1), ... (1000 times)
         ↓
LOCAL COMBINER (mini-reduce on mapper node):
(hello, 1000)  ← Pre-aggregated!
         ↓
Only 1 pair sent over network
         ↓
Reducer receives 1 value (or few values from different mappers)

Network Traffic: LOW (99.9% reduction!)
Reducer Load: LOW

Combiner Code:
──────────────
function combine(key, values):
    return (key, sum(values))

Same as Reduce function for associative operations!
```

### Speculative Execution

```
PROBLEM: Straggler Tasks
────────────────────────

Normal execution:
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│Task1│ │Task2│ │Task3│ │Task4│ │Task5│
│ 5s  │ │ 5s  │ │ 5s  │ │ 5s  │ │120s │ ← Slow!
└─────┘ └─────┘ └─────┘ └─────┘ └─────┘
  ✓       ✓       ✓       ✓       ⏳

Job waits for slowest task → Total: 120s


SOLUTION: Speculative Execution
────────────────────────────────

When Task5 is detected as slow:
┌─────┐
│Task5│  Original (still running)
│ 60s │  ← Slow
└─────┘

┌─────┐
│Task5│  Duplicate launched on different node
│ 8s  │  ← Fast!
└─────┘
  ✓  First one to finish wins!

Total time: ~13s instead of 120s
```

### Custom InputFormat

```
DEFAULT: TextInputFormat
────────────────────────
Reads text files line by line
One line = one map input

CUSTOM: WholeFileInputFormat
────────────────────────────
Reads entire file as single input
Useful for processing images, videos, etc.

Example: Image Processing
─────────────────────────

Map Input: (filename, entire_file_bytes)
Map Processing:
    1. Parse image from bytes
    2. Apply filters/transformations
    3. Extract features
    4. Output: (image_id, features)

Reduce:
    Aggregate features, create thumbnails, etc.
```

### Partitioner (Control Reduce Distribution)

```
DEFAULT PARTITIONER:
────────────────────
hash(key) % num_reducers

Problem with skewed data:
────────────────────────
If keys are: A, A, A, A, ..., B, C
Most data goes to one reducer!

Reducer 1: (A, [millions of values])  ← Overloaded
Reducer 2: (B, [few values])          ← Idle
Reducer 3: (C, [few values])          ← Idle


CUSTOM PARTITIONER:
───────────────────
class CustomPartitioner:
    def getPartition(key, value, numReducers):
        if key == 'A':
            # Distribute 'A' across multiple reducers
            return hash(value) % (numReducers - 2)
        else:
            # Other keys to remaining reducers
            return numReducers - 2 + hash(key) % 2

Balanced load:
Reducer 1: (A_subset_1, [...])  ← Balanced
Reducer 2: (A_subset_2, [...])  ← Balanced
Reducer 3: (B, [...])           ← Balanced
Reducer 4: (C, [...])           ← Balanced
```


## Monitoring & Debugging

### Job Tracking

```
RESOURCEMANAGER WEB UI:
───────────────────────
http://resourcemanager:8088

┌────────────────────────────────────────┐
│  Running Applications                  │
├────────────────────────────────────────┤
│ App ID        | Name      | Progress   │
│ app_001       | WordCount | ████░░ 65% │
│ app_002       | ETL_Job   | ██░░░░ 25% │
└────────────────────────────────────────┘

Click on job → Detailed view:
┌────────────────────────────────────────┐
│ Map Progress:     ████████░░  80%      │
│ Reduce Progress:  ████░░░░░░  40%      │
│                                        │
│ Maps:     Total: 100  Running: 20      │
│           Complete: 80  Failed: 0      │
│                                        │
│ Reduces:  Total: 10   Running: 4       │
│           Complete: 6   Failed: 0      │
└────────────────────────────────────────┘

HDFS WEB UI:
────────────
http://namenode:50070

┌────────────────────────────────────────┐
│ Cluster Summary                        │
├────────────────────────────────────────┤
│ Total Storage:     500 TB              │
│ Used:              350 TB (70%)        │
│ Available:         150 TB (30%)        │
│                                        │
│ Live Nodes:        100                 │
│ Dead Nodes:        2  ← Check these!   │
│                                        │
│ Under-replicated Blocks: 150           │
└────────────────────────────────────────┘
```

### Common Issues & Solutions

```
ISSUE 1: Job Stuck at Map 100%, Reduce 0%
──────────────────────────────────────────
Symptom: Maps finish, reduces never start

Cause: Not enough memory/containers for reducers

Solution:
• Increase yarn.nodemanager.resource.memory-mb
• Reduce mapreduce.reduce.memory.mb
• Add more nodes


ISSUE 2: Tasks Keep Failing
────────────────────────────
Symptom: Tasks retry and fail repeatedly

Check logs:
$ yarn logs -applicationId app_001

Common causes:
• OutOfMemoryError → Increase heap
• Input split error → Check data format
• Disk full → Clean up temp space


ISSUE 3: Slow Performance
──────────────────────────
Symptom: Job takes much longer than expected

Debug steps:
1. Check data skew (one reducer gets most data)
   → Use custom partitioner
   
2. Check speculative execution enabled
   → mapreduce.map.speculative=true
   
3. Check data locality
   → View counters for rack-local vs node-local
   
4. Check compression enabled
   → io.compression.codecs


ISSUE 4: NameNode Out of Memory
────────────────────────────────
Symptom: NameNode crashes, HDFS unavailable

Cause: Too many small files (high metadata overhead)

Solution:
• Combine small files using HAR or SequenceFiles
• Increase NameNode heap (-Xmx)
• Archive old data
```


## Summary & Key Takeaways

```
═══════════════════════════════════════════════════════
                    HADOOP STACK
═══════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────┐
│                  APPLICATIONS                       │
│  MapReduce Jobs | Hive | Pig | Spark | HBase       │
└─────────────────────────────────────────────────────┘
                         ↕
┌─────────────────────────────────────────────────────┐
│                     YARN                            │
│  • Resource Management                              │
│  • Job Scheduling                                   │
│  • Container Allocation                             │
└─────────────────────────────────────────────────────┘
                         ↕
┌─────────────────────────────────────────────────────┐
│                     HDFS                            │
│  • Distributed Storage                              │
│  • Fault Tolerance (Replication)                    │
│  • Data Locality                                    │
└─────────────────────────────────────────────────────┘
                         ↕
┌─────────────────────────────────────────────────────┐
│              CLUSTER HARDWARE                       │
│  Node 1 | Node 2 | ... | Node N                    │
└─────────────────────────────────────────────────────┘
```

### Core Principles:

**1. HDFS:**

- Splits large files into blocks (128MB default)
- Replicates blocks across nodes (3× default)
- Provides fault tolerance through replication
- NameNode manages metadata, DataNodes store blocks

**2. MapReduce:**

- Map: Transform data → (key, value) pairs
- Shuffle & Sort: Group by key
- Reduce: Aggregate values per key
- Scales linearly with cluster size

**3. YARN:**

- Separates resource management from job execution
- ResourceManager allocates resources globally
- NodeManagers manage per-node resources
- ApplicationMasters manage individual jobs
- Containers provide resource isolation

### The Big Picture:

```
USER PERSPECTIVE:
─────────────────
"I have 10TB of data to process"
         ↓
Write MapReduce program (map + reduce functions)
         ↓
Submit job: hadoop jar myjob.jar
         ↓
Wait for results
         ↓
Access output in HDFS


HADOOP PERSPECTIVE:
───────────────────
Receive job → YARN
         ↓
Allocate resources → Containers
         ↓
Read data from HDFS → Data locality
         ↓
Execute Map tasks → Parallel
         ↓
Shuffle data → Network transfer
         ↓
Execute Reduce tasks → Parallel
         ↓
Write output to HDFS → Replicated
         ↓
Return success to user
```

### Why Hadoop Changed Everything:

**Before Hadoop:**

- Expensive proprietary systems (Oracle, Teradata)
- Vertical scaling (bigger, more expensive machines)
- Limited to structured data
- Complex to scale

**After Hadoop:**

- Open-source, runs on commodity hardware
- Horizontal scaling (add cheap machines)
- Handles any data type (structured, unstructured)
- Simple to scale (just add nodes)

### Modern Hadoop Ecosystem:

```
         ┌─── SQL: Hive, Impala
         │
HADOOP ──┼─── Streaming: Kafka, Storm
         │
         ├─── NoSQL: HBase, Cassandra
         │
         ├─── ML: Mahout, Spark MLlib
         │
         └─── Graph: Giraph, GraphX
```

**Hadoop is the foundation** for modern big data infrastructure, enabling organizations to store and process massive datasets economically and reliably.

═══════════════════════════════════════════════════════ END OF GUIDE ═══════════════════════════════════════════════════════
