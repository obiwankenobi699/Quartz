---
---



Database languages are used to define, manipulate, control, and manage transactions in a database. SQL supports different sub-languages, each designed for a specific purpose.


# **2. DML (Data Manipulation Language)**

**Topic:** Data Manipulation Language  
**Paragraph:**  
DML is used to **manipulate or modify actual data** stored inside tables. These commands operate on database instances, allowing users to insert, update, delete, and retrieve data. Unlike DDL, DML changes can be rolled back or committed using transaction control commands.

**Common Commands:**

```
INSERT, UPDATE, DELETE, SELECT
```


# **4. TCL / DTL (Transaction Control Language)**

(TCL is sometimes called DTL – Data Transaction Language)

**Topic:** Transaction Control Language  
**Paragraph:**  
TCL manages **transactions** in a database, ensuring data consistency and reliability. It allows grouping multiple operations into a single logical unit. TCL commands let users commit changes permanently, undo changes, or temporarily save intermediate states using savepoints. These commands ensure the ACID properties of transactions.

**Common Commands:**

```
COMMIT, ROLLBACK, SAVEPOINT, SET TRANSACTION
```


If you want, I can also provide:  
• Short 2–3 marks notes  
• Difference table between DDL vs DML vs DCL vs TCL  
• Sample SQL commands for each type


## Procedural DML 
1. the focus is on the execution and result 
2. what data is needed and how it is retreived
3. the user have more control of process as we have to define the steps od retreival 

Example
```
DECLAIR
BEGIN
process
END
```
sql , Relational Algebra
## Non Procedural DML
1. the focus is on the result not in execution
2. what data is needed not how it is retreived it depend on internal of Data Base
3. the user have less control of process as we have 

Example
tuple, Relational Calculus


# Note

> We can Delete row but we need to drop table and column .
