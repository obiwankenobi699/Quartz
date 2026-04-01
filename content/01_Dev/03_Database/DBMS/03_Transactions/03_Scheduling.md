---
---
## What is a Schedule?

**Definition:** A schedule is a **chronological sequence** of operations from multiple transactions.

**Purpose:** Shows the order in which operations from concurrent transactions are executed.


## Schedule Components

|Component|Description|
|---|---|
|**1. Operations**|READ(X), WRITE(X), COMMIT, ABORT|
|**2. Transactions**|Multiple transactions (T1, T2, T3, ...)|
|**3. Ordering**|Chronological sequence of operations|

        
			        Start with Schedule
                                |
                    Does it execute serially?
                        |              |
                       YES             NO
                        |              |
                   SERIAL          NON-SERIAL
                                        |
                        Is it equivalent to serial?
                                |              |
                               YES             NO
                                |              |
                         SERIALIZABLE    NON-SERIALIZABLE
                                |              (REJECT)
                        Test Precedence Graph
                                |
                        ┌───────┴───────┐
                    No Cycle        Has Cycle
                        |               |
                 CONFLICT SER.    Not Conflict Ser.
                                  (Test View Ser.)
                        |
            Does Tj commit before Ti
            when Tj reads from Ti?
                    |           |
                   YES          NO
                    |           |
            NON-RECOVERABLE  RECOVERABLE
               (REJECT)          |
                        Does Tj read uncommitted
                        data from Ti?
                            |           |
                           YES          NO
                            |           |
                       CASCADING    CASCADELESS
                                        |
                        Does Tj write to data
                        written by uncommitted Ti?
                                    |           |
                                   YES          NO
                                    |           |
                              CASCADELESS     STRICT
                                              (BEST)
```


### Example 1: Serial Schedule S1 (T1 → T2)

**Transactions:**

```
T1: READ(A), WRITE(A), READ(B), WRITE(B)
T2: READ(A), WRITE(A), READ(B), WRITE(B)
```

**Serial Schedule S1:**

|Time|T1|T2|
|---|---|---|
|t1|READ(A)||
|t2|WRITE(A)||
|t3|READ(B)||
|t4|WRITE(B)||
|t5||READ(A)|
|t6||WRITE(A)|
|t7||READ(B)|
|t8||WRITE(B)|

**Note:** T1 completes BEFORE T2 starts


## 8.2 Non-Serial Schedule

### Definition

Transactions execute **concurrently**, with overlapping operations.

### Characteristics

- ✓ Better performance (parallelism)
- ✓ Higher throughput
- ✓ Better resource utilization
- ✗ May produce incorrect results
- ✗ Requires careful management
- ✗ Can cause anomalies


## 8.3 Comparison

|Feature|Serial|Non-Serial|
|---|---|---|
|**Concurrency**|NO|YES|
|**Correctness**|Always Correct|May or may not be correct|
|**Performance**|Slow|Fast|
|**CPU Utilization**|Low|High|
|**Practical Use**|Not practical|Used in real systems|


## 9.2 Serializability Benefits

**Combines:**

- ✓ Correctness of serial schedules
- ✓ Performance of concurrent execution

**Example:**

```
If Result(Non-Serial Schedule S3) = Result(Serial Schedule S1)
Then S3 is serializable
```


# 10. CONFLICT SERIALIZABILITY

## 10.1 Understanding Conflicts

### What is a Conflict?

**Definition:** Two operations **conflict** if:

1. They belong to **different transactions**
2. They access the **same data item**
3. **At least one is a WRITE operation**


### Conflict Examples

#### 1. READ-WRITE Conflict

```
T1: READ(A)
T2: WRITE(A)
└─→ CONFLICT ✓
```

#### 2. WRITE-READ Conflict

```
T1: WRITE(A)
T2: READ(A)
└─→ CONFLICT ✓
```

#### 3. WRITE-WRITE Conflict

```
T1: WRITE(A)
T2: WRITE(A)
└─→ CONFLICT ✓
```

#### 4. READ-READ (No Conflict)

```
T1: READ(A)
T2: READ(A)
└─→ NO CONFLICT ✗
```


## 10.3 Precedence Graph Method

### Algorithm

```
Step 1: Create a node for each transaction

Step 2: For each conflict between Ti and Tj:
        Draw edge Ti → Tj if Ti's operation
        comes before Tj's conflicting operation

Step 3: Check for cycles
        ├─→ NO CYCLE: Conflict Serializable ✓
        └─→ CYCLE EXISTS: Not Conflict Serializable ✗
```


### Step 1: Find Conflicts

**Conflicts on A:**

- T1:WRITE(A) at t2 before T2:READ(A) at t3 → **T1 → T2**
- T1:WRITE(A) at t2 before T2:WRITE(A) at t4
  → **T1 → T2**

**Conflicts on B:**

- T1:WRITE(B) at t6 before T2:READ(B) at t7 → **T1 → T2**
- T1:WRITE(B) at t6 before T2:WRITE(B) at t8 → **T1 → T2**


### Step 3: Check for Cycle

**Result:** NO CYCLE → **Conflict Serializable** ✓

**Equivalent Serial Schedule:** T1 → T2


### Step 1: Find Conflicts

**Conflicts on A:**

- T1:READ(A) at t1 before T2:WRITE(A) at t3 → **T1 → T2**
- T2:READ(A) at t2 before T1:WRITE(A) at t4 → **T2 → T1**
- T2:WRITE(A) at t3 before T1:WRITE(A) at t4 → **T2 → T1**


### Step 3: Check for Cycle

**Result:** CYCLE EXISTS → **NOT Conflict Serializable** ✗


## 11.2 View Equivalence Conditions

Two schedules S and S' are **view equivalent** if all three conditions hold:

### Condition 1: Initial Read

If T1 reads **initial value** of X in S, then T1 must read **initial value** of X in S'

### Condition 2: Updated Read

If T1 reads value of X **written by T2** in S, then T1 must read value of X **written by T2** in S'

### Condition 3: Final Write

If T1 **writes final value** of X in S, then T1 must **write final value** of X in S'


## 11.4 Venn Diagram Representation

```
All Schedules
    |
    ├── Non-Serializable Schedules
    |
    └── Serializable Schedules
            |
            ├── View Serializable Only
            |   (View Serializable but NOT Conflict Serializable)
            |
            └── Conflict Serializable
                (Also View Serializable)
                    |
                    └── Serial Schedules
```

# 1. INTRODUCTION TO CONCURRENCY

## What is Concurrency?

**Definition:** Concurrency is when multiple transactions execute simultaneously on the same database.

### Why Allow Concurrency?

**Benefits:**

- Better CPU utilization
- Reduced waiting time
- Increased throughput
- Better response time

### Example Scenario:

```
Time    Transaction T1              Transaction T2
─────────────────────────────────────────────────────
t1      Read(A)
t2                                  Read(B)
t3      Write(A)
t4                                  Write(B)
t5      Commit                      
t6                                  Commit
```

Both transactions execute simultaneously instead of one waiting for the other.


## Types of Schedules

### 1. RECOVERABLE SCHEDULE

**Rule:** If Tj reads data written by Ti, then Ti must commit before Tj commits.

**Example: Recoverable Schedule**

```
Schedule R1:

Time    Transaction T1              Transaction T2
─────────────────────────────────────────────────────
t1      Read(A)
        A = 100
t2      A = A - 50
        A = 50
t3      Write(A)
t4                                  Read(A)
                                    A = 50
t5      Commit ✓                    
t6                                  A = A + 30
                                    A = 80
t7                                  Write(A)
t8                                  Commit ✓
```

**Analysis:**

- T2 reads A written by T1 at t4
- T1 commits at t5 (before T2 commits at t8)
- **Recoverable ✓**

**Why Recoverable?**

- If T1 aborts after t4, T2 would also abort
- But since T1 commits first, no problem
- Database remains consistent


### 3. CASCADING SCHEDULE (Cascading Rollback)

**Definition:** When one transaction aborts, it forces other transactions that read its data to also abort.

**Example: Cascading Rollback**

```
Schedule C1:

Time    T1              T2              T3
─────────────────────────────────────────────
t1      Read(A)
        A = 100
t2      A = A - 50
        A = 50
t3      Write(A)
t4                      Read(A)
                        A = 50
t5                      A = A * 2
                        A = 100
t6                      Write(A)
t7                                      Read(A)
                                        A = 100
t8                                      A = A + 50
                                        A = 150
t9                                      Write(A)
t10     ABORT
t11                     ABORT
                        (Must abort)
t12                                     ABORT
                                        (Must abort)
```

**Cascading Effect:**

```
T1 ABORT
  ↓
T2 must ABORT (read from T1)
  ↓
T3 must ABORT (read from T2)

CASCADE OF ABORTS!
```

**Problem:**

- Multiple transactions aborted
- Lots of work wasted
- Poor performance


### 5. STRICT SCHEDULE (Strictest)

**Rule:**

- No transaction can read OR write data written by uncommitted transaction
- Must wait for commit/abort before any access

**Example: Strict Schedule**

```
Schedule ST1:

Time    Transaction T1              Transaction T2
─────────────────────────────────────────────────────
t1      Read(A)
        A = 100
t2      A = A - 50
        A = 50
t3      Write(A)
t4      Read(B)
        B = 200
t5      B = B + 50
        B = 250
t6      Write(B)
t7      Commit ✓
t8                                  Read(A)
                                    (After T1 commits)
t9                                  Write(A)
t10                                 Commit ✓
```

**Analysis:**

- T2 cannot even WRITE A until T1 commits
- Strictest form of isolation
- **Strict Schedule ✓**


## Comparison Table

|Schedule Type|Reads Uncommitted?|Writes Uncommitted?|Cascading Abort?|Recoverable?|
|---|---|---|---|---|
|**Non-Recoverable**|Yes|Yes|Possible|**NO**|
|**Recoverable (Cascading)**|Yes|Yes|Yes|YES|
|**Cascadeless**|**NO**|Yes|**NO**|YES|
|**Strict**|**NO**|**NO**|**NO**|YES|


## Example 2: Identify Schedule Type

```
Schedule:

T1: R(A), W(A), Commit
T2: R(A), W(A), Commit

Interleaved:
T1: R(A)
T1: W(A)
T1: Commit
T2: R(A)
T2: W(A)
T2: Commit
```

**Analysis:**

**Step 1: Check if Recoverable**

- T2 reads A after T1 commits
- **Recoverable ✓**

**Step 2: Check if Cascadeless**

- T2 reads only committed data (T1 committed first)
- **Cascadeless ✓**

**Step 3: Check if Strict**

- T2 writes A after T1 commits
- No uncommitted reads or writes
- **Strict ✓**

**Result:** Strict Schedule (hence also Cascadeless and Recoverable)


## Example 4: Cascading vs Cascadeless

```
Cascading Schedule:

T1: R(A), W(A)
T2: R(A), W(A)
T3: R(A), W(A)
T1: Commit
T2: Commit
T3: Commit

If T1 aborts after T2 and T3 read:
- T2 must abort
- T3 must abort
- Cascading abort!
```

```
Cascadeless Schedule:

T1: R(A), W(A), Commit
T2: R(A), W(A), Commit
T3: R(A), W(A), Commit

Each transaction reads only after previous commits.
No cascading aborts possible.
```


### 2. Wound-Wait Scheme (Preemptive)

**Rule:** Older transaction wounds (forces abort of) younger, younger waits for older.

```
If Ti requests lock held by Tj:
    if timestamp(Ti) < timestamp(Tj):  // Ti is older
        Tj ABORTS (wounded by Ti)
    else:
        Ti WAITS
```

**Example:**

```
T2 (timestamp=5) holds Lock(A)
T1 (timestamp=1) wants Lock(A)

T1 is older, so T2 is WOUNDED (aborts)
T1 gets the lock
```

