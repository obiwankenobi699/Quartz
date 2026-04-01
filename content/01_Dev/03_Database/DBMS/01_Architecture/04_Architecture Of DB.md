---
---

```
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║   ██████╗ ██████╗ ███╗   ███╗███████╗███████╗                 ║
║   ██╔══██╗██╔══██╗████╗ ████║██╔════╝██╔════╝                 ║
║   ██║  ██║██████╔╝██╔████╔██║███████╗███████╗                 ║
║   ██║  ██║██╔══██╗██║╚██╔╝██║╚════██║╚════██║                 ║
║   ██████╔╝██████╔╝██║ ╚═╝ ██║███████║███████║                 ║
║   ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝╚══════╝                 ║
║                                                                ║
║        INTERNAL ARCHITECTURE OF DATABASE SYSTEM               ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
```


## 2. Query Processor

### Role

Converts **high-level SQL queries** into **low-level execution plans**.

### Responsibilities

- Syntax checking
    
- Semantic checking
    
- Query translation
    
- Query optimization (via optimizer)
    

### Components

- DDL Compiler
    
- DML Compiler
    
- Query Optimizer
    
- Execution Engine
    


## 4. Execution Engine

### Function

Executes the **query execution plan** produced by the optimizer.

### Responsibilities

- Executes relational operators (select, join, project)
    
- Calls storage manager for data access
    
- Returns result to user
    

```ascii
Execution Plan
     │
     ▼
┌───────────────┐
│ Execution     │
│ Engine        │
└───────────────┘
     │
     ▼
 Storage Manager
```


## 6. DDL Compiler

### Purpose

Processes **DDL statements** (`CREATE`, `ALTER`, `DROP`).

### Output

- Updates **Data Dictionary**
    
- Creates internal database schema
    

```ascii
CREATE TABLE student(...)
        │
        ▼
┌──────────────────────────┐
│      DDL COMPILER        │
└───────────┬─────────────┘
            ▼
    Data Dictionary
```


## 8. Scheduler

### Function

Controls **concurrent execution of transactions**.

### Ensures

- Serializability
    
- Isolation
    
- Deadlock prevention
    

### Uses

- Locking
    
- Timestamp ordering
    
- Validation techniques
    

```ascii
┌──────────────────────────┐
│        SCHEDULER         │
├──────────────────────────┤
│ Lock Management          │
│ Deadlock Handling        │
│ Transaction Ordering     │
└──────────────────────────┘
```


## 10. Recovery Manager

### Purpose

Ensures **database consistency after failures**.

### Handles

- System crashes
    
- Transaction failures
    
- Power loss
    

### Techniques

- Write-Ahead Logging (WAL)
    
- Checkpointing
    
- Undo / Redo operations
    

```ascii
┌──────────────────────────┐
│     RECOVERY MANAGER     │
├──────────────────────────┤
│ Logging                  │
│ Checkpointing            │
│ Crash Recovery           │
└──────────────────────────┘
```


## 12. Combined Multi-Level ASCII Architecture Diagram

```
╔══════════════════════════════════════════════════════════════╗
║                       DBMS ARCHITECTURE                      ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   USER / APPLICATION                                         ║
║           │                                                  ║
║           ▼                                                  ║
║   ┌──────────────────────────────┐                           ║
║   │        QUERY PROCESSOR       │                           ║
║   │  ┌────────────┐ ┌─────────┐  │                           ║
║   │  │ DDL        │ │ DML     │  │                           ║
║   │  │ Compiler   │ │ Compiler│  │                           ║
║   │  └────┬───────┘ └────┬────┘  │                           ║
║   │       ▼              ▼       │                           ║
║   │        QUERY OPTIMIZER       │                           ║
║   │               │              │                           ║
║   │        EXECUTION ENGINE      │                           ║
║   └───────────────┬──────────────┘                           ║
║                   ▼                                          ║
║   ┌──────────────────────────────┐                           ║
║   │        STORAGE MANAGER       │                           ║
║   │  Buffer Manager              │  |                        ║
║   │  Scheduler -------------------->|Transaction Schedular   ║
║   │  Recovery Manager            │  |                        ║
║   └───────────────┬──────────────┘                           ║
║                   ▼                                          ║
║   ┌──────────────────────────────┐                           ║
║   │     PHYSICAL STORAGE         │                           ║
║   │  Data Files | Index Files    │                           ║
║   │  Log Files                   │                           ║
║   └──────────────────────────────┘                           ║
║                                                              ║
║   Data Dictionary  ⇄  Used by all components                ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

