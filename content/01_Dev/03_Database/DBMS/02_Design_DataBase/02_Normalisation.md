---
---

# 1. INTRODUCTION TO NORMALIZATION

## What is Normalization?

**Definition:** Normalization is a systematic process of organizing data in a database to:

- Reduce data redundancy
- Eliminate insertion, update, and deletion anomalies
- Ensure data dependencies make sense
- Improve data integrity

## Why Normalize?

### Problems Without Normalization:

**1. Data Redundancy**

- Same information stored multiple times
- Wastes storage space
- Harder to maintain consistency

**2. Update Anomaly**

- Must update multiple rows for single change
- Risk of inconsistency if some rows missed

**3. Insertion Anomaly**

- Cannot insert data without other required data
- Example: Cannot add department without employee

**4. Deletion Anomaly**

- Deleting one piece of information loses other useful data
- Example: Deleting last employee removes department info


# 3. FIRST NORMAL FORM (1NF)

## Rules for 1NF

**Rule 1:** Each cell must contain ATOMIC (single) values

- No comma-separated values
- No multiple values in one cell

**Rule 2:** No REPEATING GROUPS

- No columns like Phone1, Phone2, Phone3

**Rule 3:** Each column must contain values of SAME TYPE

**Rule 4:** Each column must have a UNIQUE NAME

**Rule 5:** Order of rows doesn't matter

**Rule 6:** Must have a PRIMARY KEY

## Converting UNF to 1NF

### Strategy:

Split multi-valued attributes into separate rows, making each cell atomic.

### LIBRARY_DATA Table (1NF)

|StudentID|StudentName|Phone|BookTitle|Author|ReturnDate|
|---|---|---|---|---|---|
|S101|Rahul Kumar|9999999999|Database Systems|Elmasri|2024-02-15|
|S101|Rahul Kumar|8888888888|Database Systems|Elmasri|2024-02-15|
|S101|Rahul Kumar|9999999999|Operating Systems|Silberschatz|2024-02-20|
|S101|Rahul Kumar|8888888888|Operating Systems|Silberschatz|2024-02-20|
|S102|Priya Singh|7777777777|Computer Networks|Tanenbaum|2024-02-18|
|S102|Priya Singh|7777777777|Data Structures|Cormen|2024-02-22|
|S102|Priya Singh|7777777777|Algorithm Design|Kleinberg|2024-02-25|
|S103|Amit Sharma|6666666666|Database Systems|Elmasri|2024-02-16|

**Primary Key:** (StudentID, Phone, BookTitle)

### Changes Made:

**Before (UNF):** 3 rows with multi-valued cells **After (1NF):** 8 rows with atomic values

**Benefits:**

- All cells now contain single values
- Can use SQL operations properly
- Primary key defined

### Problems Still Remaining in 1NF:

**1. Data Redundancy**

```
"Rahul Kumar" appears 4 times
"Database Systems" appears 3 times
"Elmasri" appears 3 times
```

**2. Update Anomaly**

```
To change "Rahul Kumar" to "Rahul K. Sharma":
- Must update 4 rows
- Risk: Might miss one row → inconsistency
```

**3. Insertion Anomaly**

```
Cannot add a student without issuing books
(BookTitle is part of primary key)
```

**4. Deletion Anomaly**

```
If S103 returns "Database Systems":
- We lose all information about S103
- Last book for that student
```


# 5. THIRD NORMAL FORM (3NF)

## Understanding Transitive Dependency

### What is Transitive Dependency?

**Definition:** When a non-prime attribute depends on another non-prime attribute (not on the key directly).

**Formula:**

```
If A → B and B → C
Then A → C (Transitive)
```

**Example from our BOOK table:**

```
BookTitle → Publisher (Direct)
Publisher → Pub_City (Direct)
Therefore: BookTitle → Pub_City (Transitive)

BookTitle → Publisher (Direct)
Publisher → Pub_Phone (Direct)
Therefore: BookTitle → Pub_Phone (Transitive)
```

### Functional Dependencies in Extended BOOK Table

**Primary Key:** BookTitle

**Direct Dependencies:**

- BookTitle → Author ✓
- BookTitle → Publisher ✓

**Publisher Dependencies:**

- Publisher → Pub_City ✓
- Publisher → Pub_Phone ✓

**Transitive Dependencies:**

- BookTitle → Publisher → Pub_City ✗
- BookTitle → Publisher → Pub_Phone ✗

**Problem:** Pub_City and Pub_Phone are non-prime attributes depending on another non-prime attribute (Publisher)

### Problems with Transitive Dependency:

**1. Data Redundancy**

```
"Pearson, Delhi, 9876543210" repeated 3 times
```

**2. Update Anomaly**

```
Scenario: Pearson moves from Delhi to Noida
Action: Must update 3 rows (all Pearson books)
Risk: Might miss one → inconsistency
```

**3. Insertion Anomaly**

```
Cannot add publisher info without a book
Example: New publisher "Oxford" in Bangalore
Must wait for a book from Oxford
```

**4. Deletion Anomaly**

```
Scenario: Remove "Data Structures" (only MIT Press book)
Result: Lose all information about MIT Press
        (City: Boston, Phone: 7654321098)
```

## Rules for 3NF

**Rule 1:** Must be in 2NF

**Rule 2:** No TRANSITIVE DEPENDENCY

- Non-prime attributes should depend ONLY on primary key
- Not on other non-prime attributes

**Formal Definition:**

For every FD X → Y, one of following must be true:

- X is a super key, OR
- Y is a prime attribute

## Converting 2NF to 3NF

### Decomposition Strategy:

Split BOOK table into 2 tables:

1. **BOOK** - BookTitle, Author, Publisher
2. **PUBLISHER** - Publisher, Pub_City, Pub_Phone

### Table 1: BOOK (3NF)

|BookTitle|Author|Publisher|
|---|---|---|
|Database Systems|Elmasri|Pearson|
|Operating Systems|Silberschatz|Wiley|
|Computer Networks|Tanenbaum|Pearson|
|Data Structures|Cormen|MIT Press|
|Algorithm Design|Kleinberg|Pearson|

**FD:** BookTitle → Author, Publisher ✓ **Primary Key:** BookTitle **Status:** No transitive dependency

### Table 2: PUBLISHER (3NF)

|Publisher|Pub_City|Pub_Phone|
|---|---|---|
|Pearson|Delhi|9876543210|
|Wiley|Mumbai|8765432109|
|MIT Press|Boston|7654321098|

**FD:** Publisher → Pub_City, Pub_Phone ✓ **Primary Key:** Publisher **Status:** No transitive dependency (Publisher is the key)

### Complete Database in 3NF:

**1. STUDENT**

- StudentID (PK)
- StudentName

**2. STUDENT_PHONE**

- StudentID (PK, FK)
- Phone (PK)

**3. BOOK**

- BookTitle (PK)
- Author
- Publisher (FK)

**4. PUBLISHER**

- Publisher (PK)
- Pub_City
- Pub_Phone

**5. ISSUE**

- StudentID (PK, FK)
- BookTitle (PK, FK)
- ReturnDate

### Benefits of 3NF:

**1. Eliminated Transitive Dependency**

- No non-key → non-key dependencies

**2. Further Reduced Redundancy**

```
Before: "Pearson, Delhi, 9876543210" × 3 times
After: "Pearson, Delhi, 9876543210" × 1 time
```

**3. Better Updates**

```
Before: Update Pearson city → 3 rows
After: Update Pearson city → 1 row
```

**4. Insertion Flexibility**

```
Before: Cannot add publisher without book
After: Can add publisher directly in PUBLISHER table
```

**5. Deletion Safety**

```
Before: Delete last book → lose publisher info
After: Publisher info remains in PUBLISHER table
```


# 7. COMPLETE NORMALIZED DATABASE

## Final Schema (BCNF)

### All Tables:

**1. STUDENT**

```
StudentID (PK)
StudentName
```

**2. STUDENT_PHONE**

```
StudentID (PK, FK → STUDENT)
Phone (PK)
```

**3. BOOK**

```
BookTitle (PK)
Author
Publisher (FK → PUBLISHER)
```

**4. PUBLISHER**

```
Publisher (PK)
Pub_City
Pub_Phone
```

**5. ISSUE**

```
StudentID (PK, FK → STUDENT)
BookTitle (PK, FK → BOOK)
ReturnDate
```

**6. INSTRUCTOR_COURSE**

```
Instructor (PK)
Course
```

**7. STUDENT_INSTRUCTOR**

```
StudentID (PK, FK → STUDENT)
Instructor (PK, FK → INSTRUCTOR_COURSE)
```

## Comparison Across Normalization Stages

### Data Volume:

|Stage|Tables|Redundancy|Anomalies|
|---|---|---|---|
|UNF|1|Very High|All Present|
|1NF|1|High|All Present|
|2NF|4|Medium|Some Present|
|3NF|5|Low|Few Present|
|BCNF|7|None|None|

### Features:

|Form|Eliminates|
|---|---|
|**1NF**|Multi-valued attributes, Repeating groups|
|**2NF**|Partial dependencies|
|**3NF**|Transitive dependencies (non-prime → non-prime)|
|**BCNF**|All dependencies where determinant is not super key|


**END OF GUIDE**

This complete guide covers normalization from UNF to BCNF with a practical library management system example, showing all transformations, problems, and solutions at each stage.
