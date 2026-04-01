---
---
# ER MODEL – COMPLETE NOTES (AKTU STYLE)

## PART 1: RELATIONSHIPS IN ER MODEL


## 2. Relationship Set

### Definition

A **Relationship Set** is a **collection of relationship instances** of the same relationship type.

- Mathematical set of tuples connecting entities
- Each tuple represents one relationship instance

### Example

**Relationship Type:**

```
STUDENT ─── ENROLLS ─── COURSE
```

**Relationship Set (Instances):**

```
{ (S101, DBMS), (S102, OS), (S103, CN), (S101, CN) }
```

Each tuple (StudentID, CourseID) is one enrollment instance.

**Comparison:**

|Relationship Type|Relationship Set|
|---|---|
|Schema/Structure|Data/Instances|
|Defines association|Actual relationships|
|Like table structure|Like table rows|


## 4. Domain and Range

### Definition

- **Domain** → Set of possible **starting entities** in a relationship
- **Range** → Set of possible **ending entities** in a relationship

### For a Binary Relationship

```
A ─── R ─── B
```

- **Domain** = Entity set A
- **Range** = Entity set B

### Mathematical View

```
R: A → B
Domain(R) = A
Range(R) = B
```

### Example

```
STUDENT ─── ENROLLS ─── COURSE

Domain = {S101, S102, S103, ...}  (All students)
Range = {DBMS, OS, CN, ...}       (All courses)
```


## 6. Binary Relationship

### Definition

A **Binary Relationship** involves **two different entity types**.

### Characteristics

- **Degree = 2**
- Most common relationship type
- Connects two distinct entity sets

### Example

**STUDENT enrolls in COURSE**

### Diagram

```
┌───────────┐                        ┌───────────┐
│ STUDENT   │──────◇ ENROLLS ◇──────│  COURSE   │
└───────────┘                        └───────────┘
```

### Domain & Range Diagram

```
Domain (STUDENT)              Range (COURSE)

   STUDENT                       COURSE
   -------                       -------
   S101  ────────────────►       DBMS
   S102  ────────────────►       OS
   S103  ────────────────►       CN
   S101  ────────────────►       CN
```

### Components

- **Domain** = STUDENT entity set
- **Range** = COURSE entity set
- **Relationship Set** = { (S101, DBMS), (S102, OS), (S103, CN), (S101, CN) }

### More Examples

1. **EMPLOYEE works in DEPARTMENT**
2. **AUTHOR writes BOOK**
3. **CUSTOMER places ORDER**
4. **STUDENT borrows BOOK**


## 8. N-ary Relationship (Degree ≥ 3)

### Definition

An **N-ary Relationship** involves **three or more entity types**.

### Characteristics

- **Degree = n** where n ≥ 3
- Ternary is a special case (n = 3)
- Quaternary (n = 4), Quinary (n = 5), etc.

### Example (Quaternary - 4 entities)

**STUDENT takes EXAM in SUBJECT taught by TEACHER**

Entities:

1. STUDENT
2. EXAM
3. SUBJECT
4. TEACHER

### Diagram

```
       STUDENT
           │
           │
    ┌──────┴──────┐
    │    TAKES    │
    │     (◇)     │
    └──────┬──────┘
      ╱    │    ╲
    ╱      │      ╲
  EXAM  SUBJECT  TEACHER
```

### Domain & Range

- **Domain** = Combination of all participating entities
- Each instance is an n-tuple

### Example Instance

```
(Student101, Exam2023, DBMS, Prof_Sharma)
```

Meaning: Student101 takes Exam2023 in DBMS subject taught by Prof_Sharma

### Practical Note

- N-ary relationships with n > 3 are rare
- Usually can be redesigned using multiple ternary/binary relationships
- Complex to implement and understand


## 10. Degree Classification Quick Reference

```
Degree = 1  →  Unary      →  Employee supervises Employee
Degree = 2  →  Binary     →  Student enrolls Course
Degree = 3  →  Ternary    →  Supplier supplies Part to Project
Degree ≥ 3  →  N-ary      →  Complex multi-entity relationships
```


## 1. What are Mapping Constraints?

### Definition

**Mapping Constraints** define **how entities from different entity sets participate in a relationship**.

### Purpose

- Restrict possible mappings between entities
- Define business rules
- Ensure data integrity
- Control relationship participation

### Types of Mapping Constraints

```
Mapping Constraints
        │
        ├─── Cardinality Ratio (Quantitative)
        │         ├─── One-to-One (1:1)
        │         ├─── One-to-Many (1:N)
        │         ├─── Many-to-One (N:1)
        │         └─── Many-to-Many (M:N)
        │
        └─── Participation Constraint (Qualitative)
                  ├─── Total Participation
                  └─── Partial Participation
```


### (a) One-to-One (1:1)

#### Definition

Each entity in set A maps to **at most one** entity in set B, and vice-versa.

#### Notation

```
A (1) <──────> (1) B
```

#### ER Diagram

```
┌───────┐               ┌───────┐
│   A   │───── 1:1 ─────│   B   │
└───────┘               └───────┘
```

#### Detailed Diagram

```
PERSON                  PASSPORT
  │                        │
  P1 ─────────────────── PP1
  P2 ─────────────────── PP2
  P3 ─────────────────── PP3
```

#### Characteristics

- **One entity in A** relates to **exactly one entity in B**
- **One entity in B** relates to **exactly one entity in A**
- Bijective mapping (if total participation)

#### Real-World Examples

1. **PERSON has PASSPORT**
    
    - One person has exactly one passport
    - One passport belongs to exactly one person
2. **COUNTRY has CAPITAL**
    
    - One country has one capital city
    - One capital belongs to one country
3. **STUDENT has ROLL_NUMBER**
    
    - One student has one unique roll number
    - One roll number belongs to one student
4. **EMPLOYEE has EMPLOYEE_ID**
    

#### Implementation

```
PERSON                      PASSPORT
+---------+-------+         +------------+---------+
| PersonID| Name  |         | PassportNo | PersonID|
+---------+-------+         +------------+---------+
| P1      | Amit  |         | PP1        | P1      |
| P2      | Raj   |         | PP2        | P2      |
| P3      | Meera |         | PP3        | P3      |
+---------+-------+         +------------+---------+
                            FK references PersonID
```

**Note**: Foreign key can be in either table or both can be merged into one table.


### (c) Many-to-One (N:1)

#### Definition

Many entities in A map to **one** entity in B.

#### Notation

```
A (N) ──────> (1) B
```

#### ER Diagram

```
┌───────┐               ┌───────┐
│   A   │───── N:1 ─────│   B   │
└───────┘               └───────┘
```

#### Detailed Diagram

```
STUDENT                 MENTOR
    │                      │
    S1 ──────┬──────────── M1
             │
    S2 ──────┘
             
    S3 ──────┬──────────── M2
             │
    S4 ──────┘
```

#### Characteristics

- **Multiple entities in A** relate to **one entity in B**
- Reverse of One-to-Many
- From A's perspective: many-to-one
- From B's perspective: one-to-many

#### Real-World Examples

1. **STUDENT assigned to MENTOR**
    
    - Many students assigned to one mentor
    - One mentor guides many students
2. **EMPLOYEE reports to MANAGER**
    
    - Many employees report to one manager
3. **BOOK belongs to PUBLISHER**
    
    - Many books from one publisher

#### Implementation

```
STUDENT                     MENTOR
+--------+-------+---------+    +----------+-------+
| StudID | Name  | MentorID|    | MentorID | Name  |
+--------+-------+---------+    +----------+-------+
| S1     | Amit  | M1      |    | M1       | Prof A|
| S2     | Raj   | M1      |    | M2       | Prof B|
| S3     | Meera | M2      |    +----------+-------+
| S4     | Priya | M2      |
+--------+-------+---------+
FK references MentorID
```

**Note**: N:1 is the same as 1:N, just viewed from the opposite direction.


## 3. Cardinality Ratio Summary Table

|Type|Notation|A → B|B → A|Example|FK Location|
|---|---|---|---|---|---|
|**1:1**|A (1) ↔ (1) B|One|One|Person-Passport|Either table or merge|
|**1:N**|A (1) → (N) B|One|Many|Department-Employee|B table (N side)|
|**N:1**|A (N) → (1) B|Many|One|Student-Mentor|A table (N side)|
|**M:N**|A (M) ↔ (N) B|Many|Many|Student-Course|Junction table|


### (a) Total Participation (Mandatory)

#### Definition

**Every entity** in the entity set **must** participate in at least one relationship instance.

Also called **Existence Dependency** or **Mandatory Participation**.

#### Notation

- Shown by **double line (==)** in ER Diagram

```
A ==───── R ───── B
```

Double line from A means: Total participation of A in R

#### ER Diagram

```
┌───────┐                        ┌───────┐
│   A   │=======◇ R ◇===========│   B   │
└───────┘                        └───────┘
   ││                               ││
   Total                          Total
```

#### Characteristics

- **Minimum cardinality = 1**
- Every entity must have at least one related entity
- Entity cannot exist without participating in relationship
- Also called **Mandatory Participation**

#### Example 1: EMPLOYEE works in DEPARTMENT

```
┌──────────┐                        ┌────────────┐
│ EMPLOYEE │========◇ WORKS ◇──────│ DEPARTMENT │
└──────────┘                        └────────────┘
    Total                              Partial
```

**Meaning:**

- **Total from EMPLOYEE side**: Every employee MUST work in a department
- **Partial from DEPARTMENT side**: A department can exist without employees (newly created dept)

#### Example 2: LOAN requires CUSTOMER

```
┌──────┐                        ┌──────────┐
│ LOAN │========◇ TAKEN ◇──────│ CUSTOMER │
└──────┘                        └──────────┘
  Total                           Partial
```

**Meaning:**

- Every loan MUST have a customer
- A customer may or may not have loans

#### Real-World Examples

1. **ORDER must have CUSTOMER**
    
    - Order cannot exist without customer
2. **EMPLOYEE must have DEPARTMENT**
    
    - Employee must belong to some department
3. **MARRIAGE requires TWO PERSONS**
    
    - Marriage cannot exist with less than two people
4. **COURSE must have INSTRUCTOR**
    
    - Course cannot run without instructor

#### Implementation Note

```
EMPLOYEE
+--------+-------+---------+
| EmpID  | Name  | DeptID  |
+--------+-------+---------+
| E1     | Amit  | D1      | DeptID is NOT NULL
| E2     | Raj   | D2      |
+--------+-------+---------+

DeptID FOREIGN KEY REFERENCES DEPARTMENT(DeptID) NOT NULL
```

**NOT NULL constraint** enforces total participation.


## 5. Combining Cardinality and Participation

### Notation

```
       Minimum, Maximum
A ──────── (min, max) ──────◇ R ◇───── B
```

**Common Combinations:**

|Notation|Meaning|Participation|Example|
|---|---|---|---|
|(0, 1)|Optional, at most one|Partial|Person may own Car|
|(1, 1)|Mandatory, exactly one|Total|Employee must have Department|
|(0, N)|Optional, can be many|Partial|Department may have Employees|
|(1, N)|Mandatory, at least one|Total|Order must have Products|

### Example Diagram

```
┌──────────┐ (1,1)          (0,N) ┌────────────┐
│ EMPLOYEE │========◇ WORKS ◇────│ DEPARTMENT │
└──────────┘                      └────────────┘
```

**Meaning:**

- **EMPLOYEE (1,1)**:
    
    - Minimum = 1 (Total participation)
    - Maximum = 1 (One department only)
    - Every employee works in exactly one department
- **DEPARTMENT (0,N)**:
    
    - Minimum = 0 (Partial participation)
    - Maximum = N (Many employees)
    - Department can have zero or more employees


## PART 3: KEYS AND FOREIGN KEYS


### Basic Example

```
STUDENT( StudentID PK, Name, DeptID FK )
                               ↓
DEPARTMENT( DeptID PK, DeptName )
```

**Tables:**

```
STUDENT
+-----------+-------+---------+
| StudentID | Name  | DeptID  |
+-----------+-------+---------+
| S1        | Amit  | D1      |  ← DeptID references DEPARTMENT
| S2        | Raj   | D2      |
| S3        | Meera | D1      |
+-----------+-------+---------+

DEPARTMENT
+---------+-----------+
| DeptID  | DeptName  |
+---------+-----------+
| D1      | CSE       |  ← Referenced by STUDENT
| D2      | ECE       |
+---------+-----------+
```

**Explanation:**

- `DeptID` in STUDENT is a Foreign Key
- It references `DeptID` (Primary Key) in DEPARTMENT
- Ensures every student belongs to a valid department


## 2. Referential Integrity Rules

### What Happens When Parent Row is Modified/Deleted?

When a parent table row is updated or deleted, several actions are possible:


### (b) CASCADE

**Definition:** Automatically propagates changes to child rows.

**For DELETE CASCADE:**

- Deleting parent row **automatically deletes** all child rows

**Example:**

```
Before:
DEPARTMENT                  STUDENT
+---------+---------+      +------+------+---------+
| DeptID  | DeptName|      | SID  | Name | DeptID  |
+---------+---------+      +------+------+---------+
| D1      | CSE     |      | S1   | Amit | D1      |
| D2      | ECE     |      | S2   | Raj  | D1      |
+---------+---------+      | S3   | Meera| D2      |
                           +------+------+---------+

DELETE FROM DEPARTMENT WHERE DeptID = 'D1';

After:
DEPARTMENT                  STUDENT
+---------+---------+      +------+------+---------+
| DeptID  | DeptName|      | SID  | Name | DeptID  |
+---------+---------+      +------+------+---------+
| D2      | ECE     |      | S3   | Meera| D2      |
+---------+---------+      +------+------+---------+
```

S1 and S2 automatically deleted (CASCADE)

**For UPDATE CASCADE:**

- Updating parent PK **automatically updates** FK in child rows

```
UPDATE DEPARTMENT SET DeptID = 'D10' WHERE DeptID = 'D1';
```

All STUDENT rows with DeptID='D1' automatically updated to 'D10'

**Use Case:**

- Master-detail relationships
- When child cannot exist without parent


### (d) SET DEFAULT

**Definition:** Sets FK to a default value when parent row is deleted/updated.

**Example:**

```sql
CREATE TABLE STUDENT (
    StudentID INT PRIMARY KEY,
    Name VARCHAR(50),
    DeptID INT DEFAULT 999,  -- 999 = "Unassigned"
    FOREIGN KEY (DeptID) REFERENCES DEPARTMENT(DeptID)
        ON DELETE SET DEFAULT
);
```

```
DELETE FROM DEPARTMENT WHERE DeptID = 'D1';
```

All STUDENT rows with DeptID='D1' set to DeptID=999

**Use Case:**

- When a default fallback category exists
- Temporary unassigned state


## 4. SQL Syntax for Foreign Key

```sql
-- Method 1: Inline
CREATE TABLE STUDENT (
    StudentID INT PRIMARY KEY,
    Name VARCHAR(50),
    DeptID INT,
    FOREIGN KEY (DeptID) REFERENCES DEPARTMENT(DeptID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Method 2: Constraint name
CREATE TABLE STUDENT (
    StudentID INT PRIMARY KEY,
    Name VARCHAR(50),
    DeptID INT,
    CONSTRAINT fk_student_dept 
        FOREIGN KEY (DeptID) 
        REFERENCES DEPARTMENT(DeptID)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- Method 3: Composite FK
CREATE TABLE ENROLLMENT (
    StudentID INT,
    CourseID INT,
    Semester INT,
    Grade CHAR(2),
    PRIMARY KEY (StudentID, CourseID),
    FOREIGN KEY (StudentID) REFERENCES STUDENT(StudentID),
    FOREIGN KEY (CourseID) REFERENCES COURSE(CourseID)
);
```


## 1. What is a Relation?

### Definition

A **Relation** in DBMS is a **table** that stores data in a structured format.

### Mathematical Definition

A relation R is a subset of the Cartesian product of domains:

```
R ⊆ D₁ × D₂ × D₃ × ... × Dₙ
```

Where:

- D₁, D₂, ..., Dₙ are domains (sets of allowed values)
- n is the degree (number of attributes)

### Practical Definition

A relation is a two-dimensional table with:

- **Rows (Tuples)**: Individual records
- **Columns (Attributes)**: Properties/fields


## 3. Characteristics of a Relation

### (a) Atomic Values

**Rule:** Each cell contains **only one value** (atomic value).

**Valid:**

```
+-----------+-------+
| StudentID | Name  |
+-----------+-------+
| S1        | Amit  |
| S2        | Raj   |
+-----------+-------+
```

**Invalid:**

```
+-----------+--------------+
| StudentID | Phone        |
+-----------+--------------+
| S1        | 9876, 8765   | ✗ Multiple values
+-----------+--------------+
```

**Solution:** Create separate table for multi-valued attributes

```
STUDENT                    PHONE
+-----------+-------+      +-----------+--------+
| StudentID | Name  |      | StudentID | Phone  |
+-----------+-------+      +-----------+--------+
| S1        | Amit  |      | S1        | 9876   |
| S2        | Raj   |      | S1        | 8765   |
+-----------+-------+      | S2        | 5432   |
                           +-----------+--------+
```


### (c) Row Order is Irrelevant

**Rule:** Order of tuples does **not** matter.

**Both are same relation:**

**Version 1:**

```
+-----------+-------+
| StudentID | Name  |
+-----------+-------+
| S1        | Amit  |
| S2        | Raj   |
| S3        | Meera |
+-----------+-------+
```

**Version 2:**

```
+-----------+-------+
| StudentID | Name  |
+-----------+-------+
| S3        | Meera |
| S1        | Amit  |
| S2        | Raj   |
+-----------+-------+
```

Both represent the **same relation**.


### (e) Each Attribute Must Have Unique Name

**Rule:** Within a relation, all attribute names must be **unique**.

**Valid:**

```
+-----------+-------------+-------+
| StudentID | StudentName | Marks |
+-----------+-------------+-------+
```

**Invalid:**

```
+-----------+------+------+
| StudentID | Name | Name | ✗ Duplicate attribute name
+-----------+------+------+
```


## 4. Relation Schema vs Relation Instance

### Relation Schema (Structure)

**Definition:** Structure/blueprint of the relation.

**Components:**

- Relation name
- Attribute names
- Domain for each attribute

**Example:**

```
STUDENT( StudentID: Integer, Name: String, Marks: Integer )
```

**Notation:**

```
RELATION_NAME(Attribute1, Attribute2, ..., Attributen)
```


### Comparison

|Aspect|Schema|Instance|
|---|---|---|
|**Nature**|Structure|Data|
|**Stability**|Static (rarely changes)|Dynamic (changes frequently)|
|**Example**|STUDENT(ID, Name, Marks)|Actual rows of data|
|**Analogy**|Class definition|Object instances|


### Cardinality

**Definition:** Number of **tuples (rows)** in a relation at a given time.

**Example:**

```
+-----------+-------+--------+------+
| StudentID | Name  | Marks  | City |
+-----------+-------+--------+------+
| 101       | Amit  | 90     | Delhi|
| 102       | Raj   | 86     | Pune |
| 103       | Meera | 92     | Mumbai|
+-----------+-------+--------+------+
```

Cardinality = 3 tuples

**Note:** Cardinality changes as data is added/removed.


### (a) Super Key

**Definition:** A set of attributes that **uniquely identifies** each tuple.

**Characteristics:**

- Can have extra attributes
- Not minimal
- Multiple super keys possible

**Example:**

```
STUDENT( StudentID, RollNo, Name, Email )
```

**Super Keys:**

1. {StudentID}
2. {RollNo}
3. {Email}
4. {StudentID, Name}
5. {StudentID, RollNo}
6. {StudentID, Name, Email}
7. {RollNo, Name} ... and many more

**Rule:** Super Key + any other attribute = Still a Super Key


### (c) Primary Key (PK)

**Definition:** The **chosen candidate key** that uniquely identifies tuples.

**Characteristics:**

- **Only one** per relation
- **Cannot be NULL**
- **Cannot have duplicates**
- Used for referencing by foreign keys

**Notation:**

```
STUDENT( StudentID PK, RollNo, Name, Email )
```

**Selection Criteria:**

1. Should be minimal
2. Should not change frequently
3. Should not be NULL
4. Should be simple (fewer attributes better)

**Example:**

```
STUDENT
+-----------+--------+-------+-----------------+
| StudentID | RollNo | Name  | Email           |
+-----------+--------+-------+-----------------+
| S101      | 101    | Amit  | amit@email.com  | ← StudentID is PK
| S102      | 102    | Raj   | raj@email.com   |
+-----------+--------+-------+-----------------+
```


### (e) Composite Key

**Definition:** A key consisting of **two or more attributes**.

**Example:**

```
ENROLLMENT( StudentID, CourseID, Semester, Grade )
```

**Composite Primary Key:** {StudentID, CourseID}

**Why?**

- StudentID alone not unique (one student, many courses)
- CourseID alone not unique (one course, many students)
- Together they uniquely identify each enrollment

**Another Example:**

```
FLIGHT_BOOKING( FlightNo, Date, SeatNo, PassengerID )
```

**Composite PK:** {FlightNo, Date, SeatNo}


## 7. Key Hierarchy Diagram

```
Super Key (Largest Set)
    │
    └─── {StudentID, Name, Email}
    └─── {StudentID, Name}
    └─── {StudentID, Email}
    └─── {RollNo, Name}
         │
         ├─── Candidate Keys (Minimal)
         │      ├─── {StudentID} ──┐
         │      ├─── {RollNo}      ├─── Choose One
         │      └─── {Email}       │
         │                         │
         └─── Primary Key ←────────┘
                   │
                   └─── Alternate Keys (Others)
```


## 9. Summary Table - Keys

|Key Type|Definition|Unique?|NULL?|Count|Example|
|---|---|---|---|---|---|
|**Super Key**|Set that uniquely identifies|Yes|Can be|Many|{ID, Name}|
|**Candidate Key**|Minimal super key|Yes|No|Multiple|{ID}, {Email}|
|**Primary Key**|Chosen candidate key|Yes|No|One|{ID}|
|**Alternate Key**|Non-chosen candidates|Yes|No|Multiple|{Email}|
|**Foreign Key**|References another PK|No|Can be|Multiple|{DeptID}|
|**Composite Key**|Multiple attributes|Yes|No|One or more|{ID, Date}|


## 11. Memory Tricks for AKTU Exam

**For Keys:**

```
Super ⊃ Candidate ⊃ Primary
       ⊃ Alternate
Foreign = Reference to Primary
```

**For Cardinality:**

```
1:1 = Passport
1:N = Department-Employee
M:N = Student-Course (Junction needed)
```

**For Participation:**

```
== (Double line) = Must participate (NOT NULL)
─ (Single line) = May participate (NULL OK)
```

**For Relationship Degree:**

```
1 = Unary (Recursive)
2 = Binary (Most common)
3+ = Ternary/N-ary (Complex)
```


### Q2: Why is junction table needed for M:N relationship?

**Answer:** M:N cannot be directly represented in two tables because:

- FK in either table would require multiple values (violates 1NF)
- Junction table stores each association as separate row
- Example: STUDENT-COURSE needs ENROLLMENT table


### Q4: When is Total Participation used?

**Answer:** Total participation (==) when:

- Entity cannot exist without relationship
- Enforced with NOT NULL constraint
- Example: LOAN must have CUSTOMER


## END OF COMPLETE ER MODEL NOTES

These notes cover: ✓ Relationships (Type, Set, Degree, Domain/Range) ✓ Unary, Binary, Ternary, N-ary relationships ✓ Cardinality Ratios (1:1, 1:N, M:N) ✓ Participation Constraints (Total/Partial) ✓ Foreign Keys and Referential Integrity ✓ Relations and their characteristics ✓ All types of Keys (Super, Candidate, Primary, Alternate, Composite, Foreign)

**Exam Ready:** 5-10 mark questions covered with diagrams and examples.
