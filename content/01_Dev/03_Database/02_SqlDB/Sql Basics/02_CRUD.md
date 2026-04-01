---
---
## TABLE OF CONTENTS

1. Theory: Database vs Table Operations
2. Database CRUD Operations
3. Table CRUD Operations
4. Constraints Reference
5. Data Types Reference
6. psql Meta-Commands
7. Common Patterns & Examples
8. Troubleshooting Commands


## DATABASE CRUD OPERATIONS

### 2.1 CREATE Database

**Basic Syntax:**

```sql
CREATE DATABASE database_name;
```

**With Options:**

```sql
CREATE DATABASE database_name
    OWNER owner_name
    ENCODING 'UTF8'
    LC_COLLATE 'en_US.UTF-8'
    LC_CTYPE 'en_US.UTF-8'
    TEMPLATE template0
    CONNECTION LIMIT 100;
```

**Common Examples:**

```sql
-- Simple creation
CREATE DATABASE company_db;

-- With owner
CREATE DATABASE company_db OWNER admin_user;

-- From template
CREATE DATABASE myapp_db TEMPLATE template0;
```

**Template Databases:**

- `template0`: Pristine, read-only template
- `template1`: Default template (modifiable)
- New databases clone from template1 by default


### 2.3 UPDATE Database

**Rename Database:**

```sql
ALTER DATABASE old_name RENAME TO new_name;
```

**Change Owner:**

```sql
ALTER DATABASE database_name OWNER TO new_owner;
```

**Change Connection Limit:**

```sql
ALTER DATABASE database_name CONNECTION LIMIT 200;
ALTER DATABASE database_name CONNECTION LIMIT -1;  -- Unlimited
```

**Important Notes:**

- Cannot rename database you're currently connected to
- Must disconnect from database first
- Connect to different database (e.g., postgres) before renaming


### 2.5 Switch Database Context

**PostgreSQL Method (No USE command):**

```sql
\c database_name            -- Switch to database
\c database_name username   -- Switch with specific user
```

**From Command Line:**

```bash
psql -U username -d database_name
psql -U username -d database_name -h localhost
```

**Why Switching is Important:**

- Must be in correct database to access its tables
- Each database is isolated
- Tables only visible in their own database


### 3.2 READ (List/Describe) Tables

**List Tables:**

```sql
\dt                         -- List all tables
\dt+                        -- Detailed list with size
\dt pattern*                -- List matching pattern
```

**SQL Query:**

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE';
```

**Describe Table Structure:**

```sql
\d table_name               -- Basic structure
\d+ table_name              -- Detailed structure
```

**Column Information:**

```sql
SELECT 
    column_name,
    data_type,
    character_maximum_length,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'students'
ORDER BY ordinal_position;
```

**Table Size:**

```sql
SELECT pg_size_pretty(pg_total_relation_size('table_name'));
```

**List All Relations:**

```sql
\d              -- All relations
\dt             -- Tables only
\dv             -- Views only
\ds             -- Sequences only
\di             -- Indexes only
```


### 3.4 DELETE Table

**DROP Table:**

```sql
-- Simple drop
DROP TABLE students;

-- Safe drop
DROP TABLE IF EXISTS students;

-- Multiple tables
DROP TABLE IF EXISTS students, teachers, courses;
```

**DROP with CASCADE:**

```sql
-- Drop with all dependencies
DROP TABLE students CASCADE;

-- Drop only if no dependencies (default)
DROP TABLE students RESTRICT;
```

**TRUNCATE Table:**

```sql
-- Delete all rows, keep structure
TRUNCATE TABLE students;

-- Multiple tables
TRUNCATE TABLE students, teachers, courses;

-- With CASCADE
TRUNCATE TABLE students CASCADE;

-- Reset auto-increment
TRUNCATE TABLE students RESTART IDENTITY;
```

**TRUNCATE vs DELETE:**

```
TRUNCATE:
- Faster (doesn't scan rows)
- Cannot use WHERE clause
- Resets sequences with RESTART IDENTITY
- Less logging overhead
- Cannot be rolled back in some cases

DELETE:
- Slower (scans all rows)
- Can use WHERE clause
- Doesn't reset sequences
- More logging
- Can be rolled back
- Triggers are fired
```


## PART 7: COMMON PATTERNS & EXAMPLES

### 7.1 Complete Database Setup

```sql
-- Create database owner
CREATE ROLE app_admin WITH LOGIN PASSWORD 'secure_pass' CREATEDB;

-- Create database
CREATE DATABASE app_db OWNER app_admin;

-- Connect to database
\c app_db app_admin

-- Verify
\l app_db
\conninfo
```

### 7.2 Complete Table Setup

```sql
-- Parent table
CREATE TABLE departments (
    dept_id SERIAL PRIMARY KEY,
    dept_name VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Child table with foreign key
CREATE TABLE employees (
    emp_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hire_date DATE DEFAULT CURRENT_DATE,
    salary NUMERIC(10,2) CHECK(salary > 0),
    dept_id INTEGER,
    FOREIGN KEY(dept_id) REFERENCES departments(dept_id) ON DELETE SET NULL
);
```

### 7.3 Insert Sample Data

```sql
-- Insert departments
INSERT INTO departments (dept_name) VALUES
('Sales'),
('Engineering'),
('HR');

-- Insert employees
INSERT INTO employees (first_name, last_name, email, salary, dept_id) VALUES
('John', 'Doe', 'john@company.com', 75000, 1),
('Jane', 'Smith', 'jane@company.com', 85000, 2),
('Bob', 'Johnson', 'bob@company.com', 65000, 3);
```

### 7.4 Common SELECT Queries

```sql
-- Select all
SELECT * FROM employees;

-- Select specific columns
SELECT first_name, last_name, salary FROM employees;

-- With WHERE clause
SELECT * FROM employees WHERE salary > 70000;

-- With JOIN
SELECT e.first_name, e.last_name, d.dept_name
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id;

-- With aggregation
SELECT dept_id, COUNT(*), AVG(salary)
FROM employees
GROUP BY dept_id;

-- With ORDER BY and LIMIT
SELECT * FROM employees
ORDER BY salary DESC
LIMIT 5;
```

### 7.5 UPDATE Examples

```sql
-- Update single row
UPDATE employees 
SET salary = 80000 
WHERE emp_id = 1;

-- Update multiple columns
UPDATE employees 
SET salary = salary * 1.1, 
    hire_date = CURRENT_DATE
WHERE dept_id = 2;

-- Update with subquery
UPDATE employees 
SET salary = (SELECT AVG(salary) FROM employees)
WHERE dept_id IS NULL;
```

### 7.6 DELETE Examples

```sql
-- Delete specific rows
DELETE FROM employees WHERE emp_id = 1;

-- Delete with condition
DELETE FROM employees WHERE hire_date < '2020-01-01';

-- Delete all (dangerous!)
DELETE FROM employees;
```

### 7.7 ALTER TABLE Chain

```sql
-- Multiple operations
ALTER TABLE employees
    ADD COLUMN phone VARCHAR(15),
    ADD COLUMN address TEXT,
    DROP COLUMN hire_date,
    RENAME COLUMN email TO email_address;
```


## PART 9: QUICK REFERENCE SUMMARY

### Database CRUD Quick Reference

```sql
-- CREATE
CREATE DATABASE dbname [OWNER user];

-- READ
\l                              -- List databases
SELECT current_database();      -- Current DB

-- UPDATE
ALTER DATABASE old RENAME TO new;
ALTER DATABASE db OWNER TO user;

-- DELETE
DROP DATABASE [IF EXISTS] dbname;

-- SWITCH
\c dbname                       -- Switch database
```

### Table CRUD Quick Reference

```sql
-- CREATE
CREATE TABLE name (col type constraints);
CREATE TABLE new (LIKE old);    -- Copy structure
CREATE TABLE new AS SELECT * FROM old;  -- Copy data

-- READ
\dt                             -- List tables
\d tablename                    -- Describe table

-- UPDATE
ALTER TABLE name ADD COLUMN col type;
ALTER TABLE name DROP COLUMN col;
ALTER TABLE name RENAME COLUMN old TO new;
ALTER TABLE name ALTER COLUMN col TYPE type;

-- DELETE
DROP TABLE [IF EXISTS] name;
TRUNCATE TABLE name;
```

### Constraint Quick Reference

```sql
PRIMARY KEY (col)
FOREIGN KEY (col) REFERENCES table(col)
UNIQUE (col)
NOT NULL
CHECK (condition)
DEFAULT value
```

### Data Types Quick Reference

```sql
-- Numeric
SERIAL, INTEGER, BIGINT, NUMERIC(10,2)

-- Text
CHAR(n), VARCHAR(n), TEXT

-- Date/Time
DATE, TIME, TIMESTAMP, TIMESTAMPTZ

-- Other
BOOLEAN, UUID, JSON, JSONB, ARRAY
```

### psql Commands Quick Reference

```sql
\l              -- List databases
\c db           -- Connect to database
\dt             -- List tables
\d table        -- Describe table
\du             -- List users
\dp             -- List permissions
\q              -- Quit
```


## BEST PRACTICES

### 11.1 Naming Conventions

**Tables:**

```sql
-- Use lowercase with underscores
CREATE TABLE user_profiles;
CREATE TABLE product_categories;

-- Not: UserProfiles, productCategories
```

**Columns:**

```sql
-- Descriptive names
first_name, last_name, email_address

-- Not: fn, ln, email
```

**Constraints:**

```sql
-- Prefix with type
pk_users_id          -- Primary key
fk_orders_user_id    -- Foreign key
uk_users_email       -- Unique
chk_users_age        -- Check
```

### 11.2 Data Type Selection

**Use appropriate types:**

```sql
-- Good
age SMALLINT                    -- Age won't exceed 32767
price NUMERIC(10,2)             -- Exact decimal for money
is_active BOOLEAN               -- Clear true/false

-- Avoid
age VARCHAR(10)                 -- Wrong type for numbers
price REAL                      -- Imprecise for money
is_active CHAR(1)               -- Use BOOLEAN instead
```

### 11.3 Always Use Constraints

```sql
-- Good table design
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INTEGER CHECK(age >= 18),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Poor design (no constraints)
CREATE TABLE users (
    id INTEGER,
    email TEXT,
    age INTEGER,
    created_at TEXT
);
```

### 11.4 Use IF EXISTS

```sql
-- Safe operations
DROP DATABASE IF EXISTS old_db;
DROP TABLE IF EXISTS temp_table;
ALTER TABLE users DROP COLUMN IF EXISTS old_column;

-- Prevents errors if object doesn't exist
```

### 11.5 Always Backup Before DROP

```bash
# Backup before dropping
pg_dump -U user -d database > backup.sql

# Then drop
DROP DATABASE database;

# Restore if needed
psql -U user -d database < backup.sql
```
