---
---

## . PostgreSQL Data Types

### Overview of Data Types

```
PostgreSQL Data Types
    │
    ├── Numeric Types
    │   ├── Integer (smallint, integer, bigint)
    │   ├── Decimal (numeric, decimal)
    │   ├── Floating-Point (real, double precision)
    │   └── Serial (smallserial, serial, bigserial)
    │
    ├── Character Types
    │   ├── CHAR(n) - Fixed length
    │   ├── VARCHAR(n) - Variable length
    │   └── TEXT - Unlimited length
    │
    ├── Date/Time Types
    │   ├── DATE
    │   ├── TIME
    │   ├── TIMESTAMP
    │   ├── TIMESTAMPTZ (with timezone)
    │   └── INTERVAL
    │
    ├── Boolean Type
    │   └── BOOLEAN (TRUE/FALSE/NULL)
    │
    ├── Binary Types
    │   └── BYTEA
    │
    ├── JSON Types
    │   ├── JSON
    │   └── JSONB (Binary JSON)
    │
    ├── Array Types
    │   └── Any type followed by []
    │
    └── UUID Type
        └── UUID
```


#### Serial Types (Auto-Increment)

| Type            | Storage | Range                          | Equivalent to       |
| --------------- | ------- | ------------------------------ | ------------------- |
| **SMALLSERIAL** | 2 bytes | 1 to 32,767                    | SMALLINT + SEQUENCE |
| **SERIAL**      | 4 bytes | 1 to 2,147,483,647             | INTEGER + SEQUENCE  |
| **BIGSERIAL**   | 8 bytes | 1 to 9,223,372,036,854,775,807 | BIGINT + SEQUENCE   |

**Example:**

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,        -- Auto-incrementing ID
    username VARCHAR(50)
);

-- Internally creates:
-- 1. Sequence: users_id_seq
-- 2. Column with DEFAULT nextval('users_id_seq')
```

**How SERIAL works:**

```
INSERT INTO users (username) VALUES ('John');
-- id automatically becomes 1

INSERT INTO users (username) VALUES ('Jane');
-- id automatically becomes 2
```


#### Floating-Point Types

| Type                 | Storage | Precision         | Use Case                    |
| -------------------- | ------- | ----------------- | --------------------------- |
| **REAL**             | 4 bytes | 6 decimal digits  | Scientific calculations     |
| **DOUBLE PRECISION** | 8 bytes | 15 decimal digits | High-precision calculations |

**⚠️ Warning:** Floating-point types are approximate. Use NUMERIC for exact values.

**Example:**

```sql
CREATE TABLE measurements (
    id SERIAL PRIMARY KEY,
    temperature REAL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION
);
```


### Date and Time Types

| Type            | Description             | Format                 | Storage  | Range                         |
| --------------- | ----------------------- | ---------------------- | -------- | ----------------------------- |
| **DATE**        | Date only               | YYYY-MM-DD             | 4 bytes  | 4713 BC to 5874897 AD         |
| **TIME**        | Time only               | HH:MI:SS               | 8 bytes  | 00:00:00 to 24:00:00          |
| **TIMESTAMP**   | Date + Time             | YYYY-MM-DD HH:MI:SS    | 8 bytes  | 4713 BC to 294276 AD          |
| **TIMESTAMPTZ** | Timestamp with timezone | YYYY-MM-DD HH:MI:SS+TZ | 8 bytes  | Same as TIMESTAMP             |
| **INTERVAL**    | Time interval           | Various formats        | 16 bytes | -178000000 to 178000000 years |

**Examples:**

```sql
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    event_date DATE,
    event_time TIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    duration INTERVAL
);

-- Insert examples
INSERT INTO events (event_date, event_time, duration) 
VALUES (
    '2024-12-25',                    -- DATE
    '14:30:00',                      -- TIME
    INTERVAL '2 hours 30 minutes'    -- INTERVAL
);

-- Current date and time
INSERT INTO events (event_date, event_time) 
VALUES (CURRENT_DATE, CURRENT_TIME);
```

**Common Date/Time Functions:**

```sql
-- Current date
SELECT CURRENT_DATE;              -- 2024-12-25

-- Current time
SELECT CURRENT_TIME;              -- 14:30:45.123456+05:30

-- Current timestamp
SELECT CURRENT_TIMESTAMP;         -- 2024-12-25 14:30:45.123456+05:30
SELECT NOW();                     -- Same as CURRENT_TIMESTAMP

-- Extract parts
SELECT EXTRACT(YEAR FROM CURRENT_DATE);    -- 2024
SELECT EXTRACT(MONTH FROM CURRENT_DATE);   -- 12
SELECT EXTRACT(DAY FROM CURRENT_DATE);     -- 25

-- Date arithmetic
SELECT CURRENT_DATE + INTERVAL '7 days';    -- Add 7 days
SELECT CURRENT_DATE - INTERVAL '1 month';   -- Subtract 1 month
```


### Binary Data Type

|Type|Description|Storage|Use Case|
|---|---|---|---|
|**BYTEA**|Binary data|1 or 4 bytes + actual data|Images, files, encrypted data|

**Example:**

```sql
CREATE TABLE files (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255),
    file_data BYTEA,
    uploaded_at TIMESTAMP DEFAULT NOW()
);
```


### Array Types

**Any PostgreSQL data type can be an array.**

**Syntax:** `data_type[]`

**Examples:**

```sql
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    phone_numbers TEXT[],           -- Array of text
    grades INTEGER[],                -- Array of integers
    hobbies VARCHAR(50)[]           -- Array of varchar
);

-- Insert array data
INSERT INTO students (name, phone_numbers, grades, hobbies) 
VALUES (
    'John Doe',
    ARRAY['9876543210', '8765432109'],
    ARRAY[85, 90, 88, 92],
    ARRAY['reading', 'coding', 'gaming']
);

-- Alternative syntax
INSERT INTO students (name, phone_numbers) 
VALUES ('Jane', '{"1234567890", "0987654321"}');

-- Query array
SELECT * FROM students WHERE 'coding' = ANY(hobbies);

-- Array functions
SELECT name, array_length(grades, 1) AS num_grades 
FROM students;
```


### Data Type Selection Guide

|Use Case|Recommended Type|Example|
|---|---|---|
|**Primary Key (auto-increment)**|SERIAL|`id SERIAL PRIMARY KEY`|
|**Age, quantity**|INTEGER or SMALLINT|`age INTEGER`|
|**Price, money**|NUMERIC(10,2)|`price NUMERIC(10,2)`|
|**Username, short text**|VARCHAR(n)|`username VARCHAR(50)`|
|**Description, long text**|TEXT|`description TEXT`|
|**Email**|VARCHAR(255)|`email VARCHAR(255)`|
|**Date of birth**|DATE|`dob DATE`|
|**Created timestamp**|TIMESTAMP|`created_at TIMESTAMP`|
|**Active status**|BOOLEAN|`is_active BOOLEAN`|
|**Country code**|CHAR(2)|`country CHAR(2)`|
|**JSON data**|JSONB|`metadata JSONB`|
|**Phone numbers**|TEXT[]|`phones TEXT[]`|
|**Session ID**|UUID|`session_id UUID`|


## 24. Constraints Overview

### What are Constraints?

**Definition:** Constraints are rules applied to table columns to enforce data integrity and validity.

**Purpose:**

1. Ensure data accuracy
2. Prevent invalid data entry
3. Maintain referential integrity
4. Enforce business rules


### 1. NOT NULL Constraint

**Purpose:** Ensures column cannot contain NULL values.

**Syntax:**

```sql
column_name data_type NOT NULL
```

**Example:**

```sql
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,        -- Cannot be NULL
    email VARCHAR(100) NOT NULL,       -- Cannot be NULL
    phone VARCHAR(15)                  -- Can be NULL
);

-- Valid
INSERT INTO employees (name, email) 
VALUES ('John Doe', 'john@example.com');

-- Invalid - will fail
INSERT INTO employees (email) 
VALUES ('john@example.com');
-- ERROR: null value in column "name" violates not-null constraint
```

**Adding NOT NULL to existing column:**

```sql
ALTER TABLE employees 
ALTER COLUMN phone SET NOT NULL;
```

**Removing NOT NULL:**

```sql
ALTER TABLE employees 
ALTER COLUMN phone DROP NOT NULL;
```


### 3. PRIMARY KEY Constraint

**Purpose:** Uniquely identifies each row in a table.

**Characteristics:**

- Combines NOT NULL + UNIQUE
- Only ONE primary key per table
- Can be single column or composite
- Automatically creates index

**Syntax:**

```sql
-- Method 1: Inline
column_name data_type PRIMARY KEY

-- Method 2: Table-level
PRIMARY KEY(column_name)

-- Method 3: Composite
PRIMARY KEY(column1, column2)
```

**Examples:**

**Single Column Primary Key:**

```sql
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,     -- Auto-increment primary key
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE
);

-- Alternative syntax
CREATE TABLE students (
    student_id SERIAL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    PRIMARY KEY(student_id)
);
```

**Composite Primary Key:**

```sql
CREATE TABLE order_items (
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    price NUMERIC(10,2),
    PRIMARY KEY(order_id, product_id)   -- Both columns together form PK
);
```

**Adding PRIMARY KEY to existing table:**

```sql
ALTER TABLE students 
ADD PRIMARY KEY(student_id);
```

**Removing PRIMARY KEY:**

```sql
ALTER TABLE students 
DROP CONSTRAINT students_pkey;
```


**Examples:**

**Basic Foreign Key:**

```sql
-- Parent table
CREATE TABLE departments (
    dept_id SERIAL PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL
);

-- Child table
CREATE TABLE employees (
    emp_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    dept_id INTEGER,
    FOREIGN KEY(dept_id) REFERENCES departments(dept_id)
);

-- Insert department first
INSERT INTO departments (dept_name) VALUES ('IT');

-- Insert employee (valid)
INSERT INTO employees (name, dept_id) VALUES ('John', 1);

-- Insert employee with invalid dept_id (fails)
INSERT INTO employees (name, dept_id) VALUES ('Jane', 999);
-- ERROR: insert or update on table "employees" violates foreign key constraint
```

**Foreign Key with CASCADE:**

```sql
CREATE TABLE employees (
    emp_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    dept_id INTEGER,
    FOREIGN KEY(dept_id) REFERENCES departments(dept_id)
        ON DELETE CASCADE            -- Delete employees if department deleted
        ON UPDATE CASCADE            -- Update emp_id if dept_id changes
);

-- Delete department
DELETE FROM departments WHERE dept_id = 1;
-- All employees with dept_id = 1 are also deleted
```

**Foreign Key with SET NULL:**

```sql
CREATE TABLE employees (
    emp_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    dept_id INTEGER,
    FOREIGN KEY(dept_id) REFERENCES departments(dept_id)
        ON DELETE SET NULL           -- Set dept_id to NULL if department deleted
);

-- Delete department
DELETE FROM departments WHERE dept_id = 1;
-- Employees with dept_id = 1 now have dept_id = NULL
```

**Multiple Foreign Keys:**

```sql
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INTEGER,
    product_id INTEGER,
    order_date DATE,
    FOREIGN KEY(customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY(product_id) REFERENCES products(product_id)
);
```

**Adding Foreign Key to existing table:**

```sql
ALTER TABLE employees 
ADD CONSTRAINT fk_emp_dept 
FOREIGN KEY(dept_id) REFERENCES departments(dept_id);
```

**Removing Foreign Key:**

```sql
ALTER TABLE employees 
DROP CONSTRAINT fk_emp_dept;
```


### 6. DEFAULT Constraint

**Purpose:** Provides default value for column when no value is specified.

**Syntax:**

```sql
column_name data_type DEFAULT default_value
```

**Examples:**

**Simple DEFAULT:**

```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',           -- Default status
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Default current time
    country CHAR(2) DEFAULT 'US',
    is_verified BOOLEAN DEFAULT FALSE
);

-- Insert without specifying defaults
INSERT INTO users (username) 
VALUES ('john_doe');

-- Result: status='active', created_at=(current timestamp), 
--         country='US', is_verified=FALSE
```

**DEFAULT with Functions:**

```sql
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    order_number VARCHAR(20) DEFAULT 'ORD-' || nextval('order_seq'),
    order_date DATE DEFAULT CURRENT_DATE,
    order_time TIME DEFAULT CURRENT_TIME,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

**Overriding DEFAULT:**

```sql
-- Use default
INSERT INTO users (username) VALUES ('jane');

-- Override default
INSERT INTO users (username, status) VALUES ('bob', 'inactive');
```

**Adding DEFAULT to existing column:**

```sql
ALTER TABLE users 
ALTER COLUMN country SET DEFAULT 'IN';
```

**Removing DEFAULT:**

```sql
ALTER TABLE users 
ALTER COLUMN country DROP DEFAULT;
```

