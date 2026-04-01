---
---
# Concurrency Control in Database Systems

## Table of Contents

1. [Introduction](https://claude.ai/chat/849f47ff-b482-4247-9444-e784c8333fe8#introduction)
2. [Concurrency Problems](https://claude.ai/chat/849f47ff-b482-4247-9444-e784c8333fe8#concurrency-problems)
3. [Lock-Based Protocols](https://claude.ai/chat/849f47ff-b482-4247-9444-e784c8333fe8#lock-based-protocols)
4. [Timestamp-Based Protocols](https://claude.ai/chat/849f47ff-b482-4247-9444-e784c8333fe8#timestamp-based-protocols)
5. [Validation-Based Protocol](https://claude.ai/chat/849f47ff-b482-4247-9444-e784c8333fe8#validation-based-protocol)
6. [Two-Phase Locking (2PL)](https://claude.ai/chat/849f47ff-b482-4247-9444-e784c8333fe8#two-phase-locking-2pl)
7. [Two-Phase Commit (2PC)](https://claude.ai/chat/849f47ff-b482-4247-9444-e784c8333fe8#two-phase-commit-2pc)


## Concurrency Problems

Without proper concurrency control, several problems can occur:

### 1. Dirty Read

A transaction reads data written by another uncommitted transaction. If the first transaction rolls back, the second transaction has read invalid data.

**Example:**

```
T1: UPDATE Account SET balance = 150 WHERE id = 1;
T2: SELECT balance FROM Account WHERE id = 1;  -- Reads 150
T1: ROLLBACK;  -- T2 read dirty data (150 instead of original value)
```

### 2. Lost Update

Two transactions read the same data and then update it based on the value read. One of the updates gets lost because the second transaction overwrites the first update.

**Example:**

```
T1: READ balance (100)
T2: READ balance (100)
T1: balance = balance + 50 = 150
T2: balance = balance + 30 = 130
T1: WRITE balance (150)
T2: WRITE balance (130)  -- T1's update is lost!
```

### 3. Phantom Read

A transaction re-executes a query and finds a different set of rows due to another transaction's INSERT or DELETE operations.

**Example:**

```
T1: SELECT COUNT(*) FROM Employees WHERE dept = 'Sales';  -- Returns 5
T2: INSERT INTO Employees VALUES (106, 'Sales');
T2: COMMIT;
T1: SELECT COUNT(*) FROM Employees WHERE dept = 'Sales';  -- Returns 6 (Phantom row!)
```

### 4. Unrepeatable Read

A transaction reads the same data twice but gets different values because another transaction modified the data in between.

**Example:**

```
T1: SELECT balance FROM Account WHERE id = 1;  -- Reads 100
T2: UPDATE Account SET balance = 200 WHERE id = 1;
T2: COMMIT;
T1: SELECT balance FROM Account WHERE id = 1;  -- Reads 200 (Different value!)
```

### 5. Deadlock

Two or more transactions are waiting for each other to release locks, creating a circular dependency that prevents any of them from proceeding.

**Example:**

```
T1: LOCK(A)
T2: LOCK(B)
T1: LOCK(B)  -- Waits for T2 to release B
T2: LOCK(A)  -- Waits for T1 to release A (DEADLOCK!)
```


## Two-Phase Locking (2PL)

Two-Phase Locking is a concurrency control protocol that ensures serializability by dividing transaction execution into two distinct phases.

### Phases of 2PL

#### 1. Growing Phase (Expanding Phase)

- Transaction may **acquire locks** (S-lock or X-lock)
- Transaction **cannot release** any locks
- Phase continues until the transaction acquires all necessary locks
- Once a lock is released, the growing phase ends

#### 2. Shrinking Phase (Contracting Phase)

- Transaction may **release locks**
- Transaction **cannot acquire** new locks
- Begins immediately after the first lock is released
- Continues until all locks are released

### Visualization

```
Number of Locks
     ^
     |     Growing Phase  |  Shrinking Phase
     |        /\          |
     |       /  \         |
     |      /    \        |
     |     /      \       |
     |    /        \_____ |
     |___/_________________\____________> Time
         ^                 ^
    Lock Point      Transaction End
```

### Key Rules

1. A transaction cannot acquire a lock after releasing any lock
2. The point where the last lock is acquired is called the **Lock Point**
3. All 2PL schedules are **conflict serializable**

### Example of 2PL

```
T1:
  lock-S(A)          -- Growing phase starts
  READ(A)
  lock-X(B)          -- Still growing
  READ(B)
  B = B + A
  WRITE(B)
  unlock(A)          -- Shrinking phase starts
  unlock(B)          -- Still shrinking
```

### Variants of 2PL

#### Strict 2PL

- All exclusive locks are held until the transaction **commits or aborts**
- Prevents cascading rollbacks
- Most commonly used in practice

#### Rigorous 2PL

- All locks (both shared and exclusive) are held until transaction **commits or aborts**
- Simplifies recovery process
- Provides maximum isolation

#### Conservative 2PL

- Acquires all locks before the transaction begins (similar to pre-claiming)
- No growing phase during execution
- Prevents deadlock but reduces concurrency

### Advantages of 2PL

- Guarantees conflict serializability
- Widely implemented in commercial databases
- Relatively simple to implement

### Disadvantages of 2PL

- Can lead to **deadlocks**
- May cause **cascading rollbacks** (in basic 2PL)
- Reduces concurrency due to lock holding
- Does not prevent all types of anomalies (e.g., phantoms in basic 2PL)


## Strict Timestamp Ordering Protocol

An enhancement of the basic timestamp protocol that prevents cascading rollbacks.

### Key Difference from Basic Protocol

- A transaction T must wait if it attempts to read or write data item X that was written by a transaction T' where:
    - TS(T') < TS(T) AND
    - T' has not yet committed or aborted

### Rules

#### For READ Operation

- If W-timestamp(X) > TS(T): Rollback T
- If the transaction that wrote X has not committed: **Wait** until it commits or aborts
- Otherwise: Execute READ(X)

#### For WRITE Operation

- If R-timestamp(X) > TS(T) OR W-timestamp(X) > TS(T): Rollback T
- If any transaction that read or wrote X has not committed: **Wait** until it commits or aborts
- Otherwise: Execute WRITE(X)

### Advantages

- Prevents cascading rollbacks
- Maintains serializability
- Ensures recoverable schedules

### Disadvantages

- Transactions may have to wait (reduces concurrency)
- Can lead to deadlocks (transactions waiting for each other)
- More complex than basic timestamp protocol


## Two-Phase Commit (2PC) Protocol

The Two-Phase Commit protocol is used in **distributed database systems** to ensure atomicity across multiple nodes. It coordinates the commit or abort decision for a transaction that spans multiple databases.

### Components

- **Coordinator:** Node that initiates and manages the commit process
- **Participants:** Nodes that execute portions of the distributed transaction

### Two Phases

#### Phase 1: Prepare Phase (Voting Phase)

1. **Coordinator sends PREPARE message** to all participants
2. **Each participant:**
    - Executes the transaction up to commit point
    - Writes transaction log to stable storage
    - Locks all affected resources
    - Responds with either:
        - **VOTE-COMMIT:** Ready to commit (has successfully prepared)
        - **VOTE-ABORT:** Cannot commit (encountered an error)
3. **Participant enters READY state** after voting commit and waits for coordinator's decision

#### Phase 2: Commit Phase (Decision Phase)

**Case 1: All participants vote COMMIT**

1. **Coordinator writes COMMIT decision** to its log
2. **Coordinator sends COMMIT message** to all participants
3. **Each participant:**
    - Writes COMMIT to its log
    - Makes changes permanent
    - Releases all locks
    - Sends ACK to coordinator
4. **Coordinator writes COMPLETE** to its log after receiving all ACKs

**Case 2: Any participant votes ABORT (or timeout occurs)**

1. **Coordinator writes ABORT decision** to its log
2. **Coordinator sends ABORT message** to all participants
3. **Each participant:**
    - Writes ABORT to its log
    - Undoes all changes
    - Releases all locks
    - Sends ACK to coordinator
4. **Coordinator writes COMPLETE** to its log

### Protocol Flow Diagram

```
Coordinator                  Participant 1              Participant 2
     |                            |                          |
     |-------- PREPARE ---------->|                          |
     |-------- PREPARE --------------------------->|
     |                            |                          |
     |<------ VOTE-COMMIT --------|                          |
     |<------ VOTE-COMMIT -----------------------------|
     |                            |                          |
  [Decision: All voted commit]
     |                            |                          |
     |-------- COMMIT ----------->|                          |
     |-------- COMMIT ---------------------------->|
     |                            |                          |
     |<------- ACK ---------------|                          |
     |<------- ACK -----------------------------------|
     |                            |                          |
  [Transaction Complete]
```

### Example Scenario

```
Distributed Transaction: Transfer $100 from Account A (Bank1) to Account B (Bank2)

Phase 1 (Prepare):
  Coordinator → Bank1: "PREPARE to deduct $100 from Account A"
  Bank1: Checks balance, locks Account A, writes log → "VOTE-COMMIT"
  
  Coordinator → Bank2: "PREPARE to add $100 to Account B"
  Bank2: Locks Account B, writes log → "VOTE-COMMIT"

Phase 2 (Commit):
  Coordinator: All voted commit, decision = COMMIT
  Coordinator → Bank1: "COMMIT"
  Bank1: Deducts $100, releases lock, "ACK"
  
  Coordinator → Bank2: "COMMIT"
  Bank2: Adds $100, releases lock, "ACK"
  
  Coordinator: Transaction complete!
```

### Failure Handling

#### Participant Failure During Prepare

- Coordinator doesn't receive vote → assumes VOTE-ABORT
- Coordinator sends ABORT to all participants

#### Participant Failure During Commit

- Participant recovers and checks its log
- If log shows READY state → contact coordinator for decision
- If log shows COMMIT → complete the commit
- If log shows ABORT → complete the abort

#### Coordinator Failure

- Participants in READY state are **blocked** (waiting for decision)
- Cannot commit or abort unilaterally
- Must wait for coordinator recovery or use timeout mechanisms
- This is the **blocking problem** of 2PC

### Advantages of 2PC

- Guarantees atomicity in distributed systems
- Ensures all nodes commit or all nodes abort (no partial commits)
- Well-understood and widely implemented protocol
- Works with heterogeneous database systems

### Disadvantages of 2PC

- **Blocking protocol:** Participants may be blocked waiting for coordinator
- **Single point of failure:** Coordinator failure blocks the system
- **High message overhead:** Requires multiple rounds of communication
- **Resource locking:** Resources locked during both phases (reduced concurrency)
- **Not partition-tolerant:** Network partitions can cause indefinite blocking

### Optimizations and Variants

#### Presumed Abort

- If coordinator has no record of transaction → presume it was aborted
- Reduces logging overhead for aborted transactions

#### Presumed Commit

- If coordinator has no record of transaction → presume it was committed
- Optimizes for the common case (most transactions commit)

#### Three-Phase Commit (3PC)

- Adds a "Pre-Commit" phase to reduce blocking
- More resilient to coordinator failures
- Higher message overhead


## Key Takeaways

1. **Concurrency control is essential** for maintaining data consistency in multi-user database systems
    
2. **Lock-based protocols** (2PL) are most commonly used in practice due to their balance of simplicity and effectiveness
    
3. **Timestamp protocols** eliminate deadlocks but may have higher rollback rates
    
4. **Validation protocols** work well for read-heavy workloads with low conflict probability
    
5. **Two-Phase Commit** is the standard for ensuring atomicity in distributed transactions, despite its blocking nature
    
6. Different protocols have different trade-offs between **concurrency, complexity, and overhead**
    
7. Choice of protocol depends on:
    
    - Workload characteristics (read-heavy vs write-heavy)
    - System architecture (centralized vs distributed)
    - Performance requirements
    - Consistency guarantees needed

