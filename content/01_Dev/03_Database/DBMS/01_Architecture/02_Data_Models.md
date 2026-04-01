---
---


## **Topic: What is a Data Model?**

**Paragraph:**  
A _data model_ is a formal way to represent, organize, and structure data inside a database. It defines how data is stored, how different data items relate to each other, and what rules (constraints) govern those relationships. A data model provides the foundation on which the database schema is built. It helps designers visualize the database clearly before implementation. Every DBMS uses a specific data model to ensure consistency, data integrity, and efficient access.


# **1. Hierarchical Data Model**

**Topic:** Hierarchical Data Model  
**Paragraph:**  
The hierarchical model represents data in a **tree-like structure**, where each parent can have multiple children, but each child has only one parent. This model is fast for representing one-to-many relationships but is rigid because changing the structure is difficult. It was used in early mainframe databases like IBM IMS.

**ASCII Example:**

```
        Parent
         |
    -------------
    |     |     |
  Child Child  Child
```


# **3. Relational Data Model**

**Topic:** Relational Data Model  
**Paragraph:**  
The relational model stores data in **tables (relations)** consisting of rows (tuples) and columns (attributes). It is the most widely used model due to its simplicity, mathematical foundation, and strong integrity rules. SQL is based on the relational model. Relationships are established using keys such as primary keys and foreign keys.

**ASCII Example:**

```
 TABLE: Student
 -----------------------------
 | Roll | Name | Age | Dept |
 -----------------------------
```


# **5. Object-Oriented Data Model**

**Topic:** Object-Oriented Model  
**Paragraph:**  
The object-oriented model stores data as **objects**, similar to how programming languages like Java or C++ handle objects. Each object has attributes and methods. It supports inheritance, encapsulation, and polymorphism. This model is used in applications requiring complex data like CAD, multimedia, and scientific computing.


# **7. Semi-Structured Data Model (XML / JSON)**

**Topic:** Semi-Structured Model  
**Paragraph:**  
In the semi-structured model, data does not follow a rigid schema. Instead, data is stored in flexible forms like XML or JSON, where each record can have a different structure. This model is used in NoSQL databases like MongoDB and is ideal for web data, logs, and hierarchical documents.

**ASCII Example (JSON-like):**

```
{
  "name": "Rahul",
  "skills": ["DBMS", "Python"]
}
```

