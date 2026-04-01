---
---
## TABLE OF CONTENTS

1. [Transaction System](https://claude.ai/chat/171e538e-8ef9-4961-ae03-68ed1ef41d58#1-transaction-system)
2. [ACID Properties](https://claude.ai/chat/171e538e-8ef9-4961-ae03-68ed1ef41d58#2-acid-properties)
3. [Transaction Operations](https://claude.ai/chat/171e538e-8ef9-4961-ae03-68ed1ef41d58#3-transaction-operations)
4. [Transaction States](https://claude.ai/chat/171e538e-8ef9-4961-ae03-68ed1ef41d58#4-transaction-states)
5. [Logs and Recovery](https://claude.ai/chat/171e538e-8ef9-4961-ae03-68ed1ef41d58#5-logs-and-recovery)
6. [Rollback Mechanism](https://claude.ai/chat/171e538e-8ef9-4961-ae03-68ed1ef41d58#6-rollback-mechanism)

# 2. ACID PROPERTIES

## 2.1 Overview

**ACID** = Four fundamental properties ensuring reliable transaction processing

```
A → Atomicity
C → Consistency  
I → Isolation
D → Durability
```


## 2.3 CONSISTENCY (Integrity Maintained)

### Definition

Transaction must take database from one **consistent state** to another consistent state.

### Consistency Rules

- All integrity constraints satisfied
- Data follows all defined rules
- Business logic maintained

### Example

**Business Rule:** Total money in bank = constant

| Stage                                    | Account A | Account B | Total   |
| ---------------------------------------- | --------- | --------- | ------- |
| **Before Transaction**                   | $1000     | $500      | $1500   |
| **Operation:** Transfer $200 from A to B |           |           |         |
| **After Transaction**                    | $800      | $700      | $1500 ✓ |

**Consistency Maintained!** Total remains $1500

**Violation Example:**

- Account A: $800
- Account B: $500
- Total: $1300 ✗ (Inconsistent!)

### Responsibility

**Application Programmer** ensures consistency.


## 2.5 DURABILITY (Changes Persist)

### Definition

Once a transaction is **committed**, its effects are **permanent** in the database, surviving system failures.

### Example

**Transaction:** Update Employee Salary

| Time  | Event                                   |
| ----- | --------------------------------------- |
| 10:00 | BEGIN TRANSACTION                       |
| 10:01 | Read Employee record (Salary = $50,000) |
| 10:02 | Update Salary = $55,000                 |
| 10:03 | Write to buffer (in RAM)                |
| 10:04 | **COMMIT**                              |
| 10:05 | Write to disk (permanent storage)       |
| 10:06 | **SYSTEM CRASH**                        |

**After Recovery:**

- Salary = $55,000 ✓
- Change is permanent, not lost

**If crash happened BEFORE commit:**

- Salary = $50,000
- Transaction rolled back

### Responsibility

**Recovery Management Component** ensures durability.


# 3. TRANSACTION OPERATIONS

## 3.1 READ(X)

### Definition

Read data item X from database into a program variable.

### Process

1. Check if X is in buffer
2. If YES → Read from buffer
3. If NO → Read from disk to buffer, then to variable

### Syntax

```sql
READ(X)
```

### Example

```sql
READ(Account_A)
-- Reads balance of Account A into memory
```


## 3.3 UPDATE

### Definition

Modify the value of a data item.

**Note:** UPDATE = READ + Modify + WRITE

### Process for: A = A + 100

```
Step 1: READ(A)       → Read current value
Step 2: A = A + 100   → Modify in memory
Step 3: WRITE(A)      → Write back to database
```


## 3.5 ROLLBACK (ABORT)

### Definition

Unsuccessful termination of transaction. All changes undone.

### Characteristics

- Database returns to state before transaction
- All modifications reversed
- Locks released

### Syntax

```sql
ROLLBACK
```

### Example

```sql
BEGIN TRANSACTION
    READ(A)
    A = A - 100
    WRITE(A)
    -- ERROR OCCURS
ROLLBACK  ← Undo all changes, A returns to original value
```


## 4.2 State Descriptions

### 1. ACTIVE State

**Definition:** Initial state when transaction begins execution.

**Characteristics:**

- Transaction currently executing
- Performing read/write operations
- Can move to Partially Committed or Failed state

**Example:**

```sql
BEGIN TRANSACTION
READ(A)          ← ACTIVE state
A = A - 100      ← ACTIVE state
WRITE(A)         ← ACTIVE state
```


### 3. COMMITTED State

**Definition:** Transaction completed successfully. All changes permanently saved to disk.

**Characteristics:**

- Changes written to disk
- Transaction cannot be undone
- Database in new consistent state
- **Final success state**

**Example:**

```sql
BEGIN TRANSACTION
READ(A)
A = A - 100
WRITE(A)
COMMIT           ← COMMITTED state
-- Changes are permanent now
```


### 5. ABORTED State

**Definition:** Transaction rolled back. Database restored to state before transaction.

**Characteristics:**

- All changes undone
- Database restored to previous consistent state
- **Final failure state**
- Transaction can be:
    - **Restarted** (if failure was temporary)
    - **Killed** (if failure was logical error)

**Example:**

```sql
BEGIN TRANSACTION
READ(A)
A = A - 100
WRITE(A)
-- ERROR OCCURS
ROLLBACK         ← ABORTED state
-- A returns to original value
```


### Scenario 2: Failed Transaction

|Time|State|Action|
|---|---|---|
|t1|BEGIN|START transaction|
|t2|ACTIVE|READ(A)|
|t3|ACTIVE|A = A - 100|
|t4|ACTIVE|WRITE(A)|
|t5|ACTIVE|READ(B)|
|t6|FAILED|SYSTEM CRASH|
|t7|ABORTED|ROLLBACK executed|
|||A restored to original value|


## 5.2 Log Record Structure

### Basic Format

```
[Transaction_ID, Data_Item, Old_Value, New_Value]
```

### Components

|Component|Description|
|---|---|
|**Transaction ID**|Unique identifier for transaction|
|**Data Item**|Which data was modified (e.g., Account_A)|
|**Old Value**|Value before modification|
|**New Value**|Value after modification|


## 5.4 Complete Log Example

### Transaction: Transfer $100 from A to B

**Initial State:**

- A = 1000
- B = 500

**Log Records:**

```
[T1, START]
[T1, READ, A]
[T1, A, 1000, 900]      ← Write operation
[T1, READ, B]
[T1, B, 500, 600]       ← Write operation
[T1, COMMIT]
```

**Final State:**

- A = 900
- B = 600


## 5.6 Recovery Operations

### UNDO Operation

**Purpose:** Rollback uncommitted transactions

**Process:**

1. Scan log backwards from end
2. For each transaction without COMMIT:
    - Find all write operations
    - Restore old_value
3. Mark transaction as ABORTED

**Example:**

```
LOG:
[T1, START]
[T1, A, 1000, 900]
[T1, B, 500, 600]
-- CRASH (No COMMIT record)

UNDO Process:
├── Restore A = 1000 (old value)
└── Restore B = 500 (old value)
```


# 6. ROLLBACK MECHANISM

## 6.1 When Does Rollback Occur?

|Scenario|Description|
|---|---|
|**1. Explicit Rollback**|User/Application calls ROLLBACK command|
|**2. System Failure**|Power failure, Hardware crash, Software crash|
|**3. Transaction Failure**|Deadlock detected, Timeout, Resource unavailable|
|**4. Integrity Constraint Violation**|Primary key violation, Foreign key violation, Check constraint violation|
|**5. Logical Error**|Division by zero, Invalid data type, Business rule violation|


## 6.3 Where Does Rollback Revert Changes?

### Memory Hierarchy

```
┌─────────────────────────────────────────┐
│  PRIMARY MEMORY (RAM)                   │
│  - Buffer Pool                          │
│  - Transaction Workspace                │
│  - Volatile (Lost on crash)             │
└─────────────────────────────────────────┘
                 ↓ Write
┌─────────────────────────────────────────┐
│  SECONDARY MEMORY (Disk)                │
│  - Database Files                       │
│  - Log Files                            │
│  - Non-volatile (Survives crash)        │
└─────────────────────────────────────────┘
```


### Detailed Examples

#### Case 1: Changes Only in PRIMARY MEMORY

```
Transaction T1:
├── READ(A) from disk to buffer (RAM)
├── A = A - 100 (modify in RAM)
├── WRITE(A) to buffer (still in RAM)
└── CRASH before writing to disk

Rollback Action:
└── Discard buffer contents
    No disk restore needed
    Changes never reached disk
```

#### Case 2: Changes in SECONDARY MEMORY

```
Transaction T1:
├── READ(A) from disk
├── A = A - 100
├── WRITE(A) to buffer
├── Buffer flushed to disk (A modified on disk)
└── CRASH before COMMIT

Rollback Action:
├── Read log: [T1, A, old_value, new_value]
└── Restore old_value to DISK
    Must physically write old value back
```

