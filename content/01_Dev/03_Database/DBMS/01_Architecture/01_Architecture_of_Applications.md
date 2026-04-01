---
---


## **2️Tier-2 Architecture (Client–Server Architecture)**

**Topic:** _What is Tier-2 Architecture?_  
**Paragraph:**  
Tier-2 architecture splits the application into **two distinct layers**: the client and the server. The client handles the UI and some presentation logic, while the server manages business logic, data processing, and the database. Communication between the two happens through network protocols (HTTP, TCP, etc.). This separation improves performance and maintainability compared to Tier-1. It is commonly used in web applications where a browser acts as the client, and a backend server (Node.js, Flask, Django) handles processing and database operations. However, scaling may become limited because both logic and data reside on the same server-side tier.


# **Three-Level Database Architecture**

```
              +---------------------------+
              |     External Level        |
              |  (User Views / Applications) 
              +---------------------------+
                          ↑
                          |
              +---------------------------+
              |     Conceptual Level      |
              |     (Logical Schema)      |
              +---------------------------+
                          ↑
                          |
              +---------------------------+
              |      Internal Level        |
              |   (Physical Storage)       |
              +---------------------------+
```


# **2. Conceptual Level (Logical Level)**

**Topic:** Conceptual Level  
**Paragraph:**  
The conceptual level represents the _logical structure_ of the entire database. It defines what data is stored, the relationships between data, constraints, schemas, keys, and integrity rules. This level provides a unified organization-wide view of the database independent of any application. It also ensures logical data independence, meaning that changes in the logical structure do not affect users' external views.


# **Summary Table**

```
+-----------------+----------------------+------------------------------------------+
| Level           | Also Called          | Defines                                  |
+-----------------+----------------------+------------------------------------------+
| External        | View / Application   | User-specific views of data              |
| Conceptual      | Logical              | Overall logical structure of database    |
| Internal        | Physical             | Physical storage of data on disk         |
+-----------------+----------------------+------------------------------------------+
```

# **Instance, Schema, and Types of Schema**


## **2. Instance**

**Topic:** Instance  
**Paragraph:**  
An _instance_ of a database refers to the **actual data stored** in the database at a particular moment in time. It is the “snapshot” of the database’s content. Unlike schemas, instances change frequently as data is inserted, updated, or deleted. The schema is the blueprint, and the instance is the current state based on that blueprint.

| Student(roll, name, age)     |   --> Fixed structure
| 1 | Rohan | 20               |
| 2 | Neha  | 21               |

# **Types of Schema**

Database systems use **three types of schema**, corresponding to the 3-level architecture.

```
          External Schema (View)
                   ↑
          Conceptual Schema (Logical)
                   ↑
          Internal Schema (Physical)
```


## **2. Conceptual Schema**

**Topic:** Conceptual Schema  
**Paragraph:**  
The conceptual schema describes the **entire logical structure** of the database for the whole organization. It includes all entities, relationships, constraints, tables, keys, and data models. This schema provides logical data independence—changes in the physical level do not affect the conceptual design.


# **Summary Table**

```
+--------------------+----------------------+--------------------------------------------+
| Schema Type        | Meaning              | Role                                       |
+--------------------+----------------------+--------------------------------------------+
| External Schema    | User views           | Shows specific subsets of data             |
| Conceptual Schema  | Logical structure    | Full database design for whole organization|
| Internal Schema    | Physical storage     | How data is stored on disk                 |
+--------------------+----------------------+--------------------------------------------+
```

# **Internal Architecture of DBMS**

A DBMS is divided into major components that handle query processing, storage, metadata, and transaction management. These components work together to provide efficient data retrieval, security, consistency, and recovery.


# **1. Query Processor**

**Topic:** Query Processor  
**Paragraph:**  
The query processor interprets and executes SQL queries. It converts high-level SQL commands into low-level instructions the DBMS can execute. It ensures optimized and efficient execution by parsing, validating, translating, and optimizing the query.

### **Components of Query Processor:**

1. **DDL Interpreter**  
    Interprets DDL commands (CREATE, ALTER, DROP) and stores schema definitions in the data dictionary.
    
2. **DML Compiler**  
    Translates DML commands (SELECT, INSERT, UPDATE, DELETE) into low-level evaluation plans.
    
3. **Query Optimizer**  
    Selects the most efficient execution plan using algorithms, cost-based optimization, and index usage.
    
4. **Query Executor**  
    Executes the physical plan using operators like joins, scans, and sorting.
    


# **3. Transaction Manager**

**Topic:** Transaction Manager  
**Paragraph:**  
The transaction manager ensures the ACID (Atomicity, Consistency, Isolation, Durability) properties of transactions. It coordinates concurrent users and ensures the database remains consistent even if failures occur.

### **Components:**

1. **Concurrency Control Manager**  
    Uses locking, timestamp ordering, and isolation levels to prevent conflicts between concurrent transactions.
    
2. **Recovery Manager**  
    Uses logs, checkpoints, and undo/redo operations to restore the database after system crashes.
    

