---
---

## 2. PostgreSQL Architecture

```
┌─────────────────────────────────────────────────────┐
│                   CLIENT LAYER                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │   psql   │  │ DBeaver  │  │ pgAdmin  │          │
│  │  (CLI)   │  │  (GUI)   │  │  (GUI)   │          │
│  └─────┬────┘  └─────┬────┘  └─────┬────┘          │
└────────┼─────────────┼─────────────┼────────────────┘
         │             │             │
         └─────────────┴─────────────┘
                       │
            ┌──────────▼──────────┐
            │   JDBC / Protocol   │
            └──────────┬──────────┘
                       │
         ┌─────────────▼─────────────────────────────┐
         │         POSTGRESQL SERVER                 │
         │  ┌────────────────────────────────────┐   │
         │  │    postmaster (Main Process)       │   │
         │  └────────────┬───────────────────────┘   │
         │               │                            │
         │     ┌─────────┴──────────┐                │
         │     │   Backend Processes │                │
         │     │   (One per client)  │                │
         │     └─────────┬────────────┘               │
         │               │                            │
         │  ┌────────────▼───────────────────────┐   │
         │  │     Shared Memory & Buffers        │   │
         │  └────────────┬───────────────────────┘   │
         └───────────────┼────────────────────────────┘
                         │
         ┌───────────────▼────────────────────────────┐
         │         DATA DIRECTORY                     │
         │  ┌──────────────────────────────────────┐  │
         │  │  Databases                           │  │
         │  │  ├─ postgres (system)                │  │
         │  │  ├─ template0 (read-only template)   │  │
         │  │  ├─ template1 (default template)     │  │
         │  │  └─ mukuldb (user database)          │  │
         │  │                                       │  │
         │  │  Tables, Indexes, Sequences          │  │
         │  │  WAL (Write-Ahead Logs)              │  │
         │  │  Configuration Files                 │  │
         │  └──────────────────────────────────────┘  │
         └────────────────────────────────────────────┘
              Location: /var/lib/postgres/data
```


## 3. Installation on Arch Linux

### Step 1: Update System

```bash
sudo pacman -Syu
```

**Why?**

- Ensures latest package database
- Prevents dependency conflicts


## 4. Database Initialization (initdb)

### Why Initialization is Required?

**Problem:** After installation, PostgreSQL cannot start immediately.

**Reason:** The data directory is empty. PostgreSQL needs:

- System catalogs (metadata about databases, tables, users)
- Template databases
- Configuration files
- WAL directory

### What is initdb?

**Definition:** `initdb` initializes a PostgreSQL database cluster.

**Database Cluster:** A collection of databases managed by a single server instance.


## 5. Starting PostgreSQL Service

### Why Service Must Be Started?

**Reason:** PostgreSQL runs as a **background daemon** (service).

**Without the service:**

- No client connections possible
- psql, DBeaver, pgAdmin cannot connect
- Database is inaccessible


### Check Service Status

**Command:**

```bash
sudo systemctl status postgresql
```

**Expected Output:**

```
● postgresql.service - PostgreSQL database server
     Loaded: loaded (/usr/lib/systemd/system/postgresql.service)
     Active: active (running) since Wed 2024-01-15 10:30:00 IST
   Main PID: 12345 (postgres)
      Tasks: 8
     Memory: 25.5M
        CPU: 100ms
     CGroup: /system.slice/postgresql.service
             └─12345 /usr/bin/postgres -D /var/lib/postgres/data
```

**Key Indicators:**

- `Active: active (running)` ✓
- Main PID exists ✓
- Port 5432 listening ✓


### Other Service Commands

|Command|Purpose|
|---|---|
|`sudo systemctl stop postgresql`|Stop service|
|`sudo systemctl restart postgresql`|Restart service|
|`sudo systemctl reload postgresql`|Reload config without restart|
|`sudo systemctl disable postgresql`|Disable auto-start|


## 6. Understanding Users in PostgreSQL

### Two Types of Users

```
┌────────────────────────────────────────────────────┐
│                                                    │
│  1. LINUX SYSTEM USER                             │
│     ├─ Created by OS                              │
│     ├─ Has system permissions                     │
│     └─ Example: postgres, mukul (Linux user)      │
│                                                    │
│  2. POSTGRESQL DATABASE ROLE                      │
│     ├─ Created inside PostgreSQL                  │
│     ├─ Has database permissions                   │
│     └─ Example: postgres, mukul (DB role)         │
│                                                    │
│  ⚠️  IMPORTANT: They are SEPARATE                 │
│      Linux user ≠ PostgreSQL role                 │
│                                                    │
└────────────────────────────────────────────────────┘
```

 postgres  | Superuser  | {}
```

**Default superuser with full privileges:**

- Create databases
- Create roles
- Modify any data
- Change configuration


### Start psql as postgres

**Command:**

```bash
psql
```

**Default connection:**

- User: postgres
- Database: postgres
- Host: localhost (Unix socket)

**Prompt:**

```
postgres=#
```

`#` indicates superuser privileges.


## 8. Creating Database Roles (Users)

### Why Create New Roles?

**Problem:** By default, only `postgres` role exists.

**Issues:**

1. Security risk (superuser for everything)
2. No user separation
3. Applications need dedicated users
4. GUI tools need valid credentials

**Best Practice:** Create separate roles for each user/application.


### Example: Create User 'mukul'

**Command:**

```sql
CREATE ROLE mukul WITH LOGIN PASSWORD 'your_secure_password';
```

**Breakdown:**

- `CREATE ROLE mukul`: Creates role named 'mukul'
- `WITH LOGIN`: Allows mukul to connect to database
- `PASSWORD 'your_secure_password'`: Sets authentication password

**Execute in psql:**

```
postgres=# CREATE ROLE mukul WITH LOGIN PASSWORD 'password123';
CREATE ROLE
```


### Alternative: CREATE USER Command

**Shorthand syntax:**

```sql
CREATE USER mukul WITH PASSWORD 'password123';
```

**Difference:**

- `CREATE USER` = `CREATE ROLE ... WITH LOGIN`
- `CREATE USER` automatically includes LOGIN privilege

**Both are equivalent:**

```sql
CREATE ROLE mukul WITH LOGIN PASSWORD 'pass';
CREATE USER mukul WITH PASSWORD 'pass';
```


### Create Database Syntax

**Basic:**

```sql
CREATE DATABASE database_name;
```

**With Owner:**

```sql
CREATE DATABASE database_name OWNER role_name;
```

**With All Options:**

```sql
CREATE DATABASE database_name
    OWNER role_name
    ENCODING 'UTF8'
    LC_COLLATE 'en_US.UTF-8'
    LC_CTYPE 'en_US.UTF-8'
    TEMPLATE template0
    CONNECTION LIMIT 100;
```


### Verify Database Created

**Command:**

```sql
\l
```

**Output:**

```
                                  List of databases
   Name    |  Owner   | Encoding |   Collate   |    Ctype    | Access privileges

### Database Ownership Explained

**Owner Privileges:**

- Full control over the database
- Can create/drop tables
- Grant/revoke permissions to other users
- Backup and restore

**Change Ownership:**

```sql
ALTER DATABASE mukuldb OWNER TO new_owner;
```


## PART 4: AUTHENTICATION CONFIGURATION


### File Format

```
# TYPE  DATABASE        USER            ADDRESS                 METHOD
local   all             all                                     peer
host    all             all             127.0.0.1/32            md5
host    all             all             ::1/128                 md5
```

**Columns:**

|Column|Description|Values|
|---|---|---|
|**TYPE**|Connection type|`local` (Unix socket), `host` (TCP/IP), `hostssl`, `hostnossl`|
|**DATABASE**|Which database|`all`, specific database name, `sameuser`|
|**USER**|Which role|`all`, specific role name|
|**ADDRESS**|IP address range|CIDR notation, `all`, hostname|
|**METHOD**|Authentication method|`peer`, `md5`, `scram-sha-256`, `trust`, `reject`|


#### (b) md5

**How it works:**

- Password-based authentication
- Password is MD5-hashed before sending
- Works for both local and remote connections

**Example:**

```
local   all   all   md5
host    all   all   127.0.0.1/32   md5
```

**Scenario:**

```bash
$ psql -U mukul -d mukuldb -h localhost
Password for user mukul: ****
```

**Benefits:**

- ✓ Works for psql
- ✓ Works for GUI tools (DBeaver, pgAdmin)
- ✓ Works for remote applications
- ✓ More secure (password-based)


#### (d) trust

**How it works:**

- **No authentication**
- Anyone can connect as any user

**Example:**

```
local   all   all   trust
```

**⚠️ DANGER:** Never use in production!

**Use Case:** Temporary testing, development only.


### Change Authentication Method

**Problem:** Default configuration uses `peer` for local connections.

**Effect:** GUI tools cannot connect.

**Solution:** Change to `md5`.


### Full pg_hba.conf Example

```
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     md5

# IPv4 local connections:
host    all             all             127.0.0.1/32            md5

# IPv6 local connections:
host    all             all             ::1/128                 md5

# Allow replication connections from localhost
local   replication     all                                     peer
host    replication     all             127.0.0.1/32            md5
host    replication     all             ::1/128                 md5
```


## 11. Basic psql Commands

### Starting psql

**As postgres user:**

```bash
sudo -u postgres psql
```

**As specific user:**

```bash
psql -U username -d database
```

**With password prompt:**

```bash
psql -U mukul -d mukuldb -h localhost
```

**Flags:**

- `-U`: Username (role)
- `-d`: Database name
- `-h`: Hostname (use `localhost` for TCP/IP, omit for Unix socket)
- `-p`: Port (default 5432)
- `-W`: Force password prompt


### Database Commands

|Command|Description|Example|
|---|---|---|
|`\l` or `\list`|List all databases|`\l`|
|`\c <database>` or `\connect`|Connect to database|`\c mukuldb`|
|`\d`|List tables, views, sequences|`\d`|
|`\dt`|List tables only|`\dt`|
|`\dv`|List views only|`\dv`|
|`\di`|List indexes|`\di`|
|`\ds`|List sequences|`\ds`|
|`\dn`|List schemas|`\dn`|


### User/Role Commands

|Command|Description|Example|
|---|---|---|
|`\du` or `\dg`|List roles (users)|`\du`|
|`\du+`|Detailed role information|`\du+`|
|`\du <role>`|Show specific role|`\du mukul`|

**Example Output:**

```
postgres=# \du
                                   List of roles
 Role name |                         Attributes                         | Member of

### Permission Commands

|Command|Description|Example|
|---|---|---|
|`\dp` or `\z`|List table permissions|`\dp`|
|`\dp <table>`|Show table permissions|`\dp students`|


### Connection Information

|Command|Description|Example|
|---|---|---|
|`\conninfo`|Display connection info|`\conninfo`|
|`\password`|Change role password|`\password mukul`|

**Example Output:**

```
postgres=# \conninfo
You are connected to database "postgres" as user "postgres" via socket in "/run/postgresql" at port "5432".
```


## 12. Complete psql Workflow Example

### Scenario: Create Database and User

```sql
-- Step 1: Connect as postgres
$ sudo -u postgres psql

-- Step 2: List existing databases
postgres=# \l

-- Step 3: List existing roles
postgres=# \du

-- Step 4: Create new role
postgres=# CREATE ROLE mukul WITH LOGIN PASSWORD 'secure_password';
CREATE ROLE

-- Step 5: Verify role created
postgres=# \du
                                   List of roles
 Role name |                         Attributes                         | Member of
 mukuldb   | mukul    | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
 postgres  | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 |

-- Step 8: Connect to new database
postgres=# \c mukuldb
You are now connected to database "mukuldb" as user "postgres".

-- Step 9: Create a table (as example)
mukuldb=# CREATE TABLE students (
mukuldb(#     id SERIAL PRIMARY KEY,
mukuldb(#     name VARCHAR(100),
mukuldb(#     marks INTEGER
mukuldb(# );
CREATE TABLE

-- Step 10: List tables
mukuldb=# \dt
          List of relations
 Schema |   Name   | Type  | Owner
 id     | integer                |           | not null | nextval('students_id_seq'::regclass)
 name   | character varying(100) |           |          |
 marks  | integer                |           |          |
Indexes:
    "students_pkey" PRIMARY KEY, btree (id)

-- Step 12: Exit
mukuldb=# \q
```


## 13. Connecting DBeaver to PostgreSQL

### What is DBeaver?

**Definition:** DBeaver is a universal database management tool with graphical interface.

**Features:**

- Visual database browser
- SQL editor with auto-completion
- ER diagram generation
- Data export/import
- Multi-database support


### JDBC Explained

**JDBC:** Java Database Connectivity

**Purpose:** Standard API for connecting Java applications to databases.

**JDBC URL Format:**

```
jdbc:postgresql://host:port/database
```

**Example:**

```
jdbc:postgresql://localhost:5432/mukuldb
```

**Components:**

- `jdbc:postgresql://`: Protocol
- `localhost`: Hostname (127.0.0.1)
- `5432`: Port number
- `mukuldb`: Database name


#### Step 2: Create New Connection

**Method 1:** Menu → Database → New Database Connection

**Method 2:** Click "New Database Connection" button (plug icon)


#### Step 4: Configure Connection Settings

**Fill in the following:**

|Field|Value|Explanation|
|---|---|---|
|**Host**|`localhost`|Server location (same machine)|
|**Port**|`5432`|PostgreSQL default port|
|**Database**|`mukuldb`|Your database name|
|**Username**|`mukul`|PostgreSQL role name|
|**Password**|`your_password`|Role password|

**⚠️ Common Mistakes:**

- ✗ Using `postgres` user (works, but not recommended)
- ✗ Leaving database field empty
- ✗ Wrong password
- ✗ Using Linux username instead of PostgreSQL role


#### Step 6: Download Driver (If Prompted)

If DBeaver doesn't have PostgreSQL driver:

- Click **Download** when prompted
- Wait for driver download to complete
- Test connection again

**Driver Details:**

- **Driver Class:** `org.postgresql.Driver`
- **Default Port:** `5432`
- **URL Template:** `jdbc:postgresql://{host}:{port}/{database}`


### DBeaver Interface Overview

```
┌────────────────────────────────────────────────────────┐
│  DBeaver Interface                                     │
│                                                        │
│  ┌──────────────┐  ┌─────────────────────────────┐   │
│  │   Database   │  │     SQL Editor              │   │
│  │   Navigator  │  │                             │   │
│  │              │  │  SELECT * FROM students;    │   │
│  │  ▼ mukuldb   │  │                             │   │
│  │    ├─Schemas │  │  [Execute] [Ctrl+Enter]     │   │
│  │    │ ├public │  └─────────────────────────────┘   │
│  │    │  ├Tables│  ┌─────────────────────────────┐   │
│  │    │  │├students│     Results Grid            │   │
│  │    │  ││└columns│  ┌──────┬────────┬──────┐  │   │
│  │    │  │└indexes│  │  id  │  name  │marks │  │   │
│  │    │  ├Views  │  ├──────┼────────┼──────┤  │   │
│  │    │  └Sequences│ │  1   │ Amit   │  90  │  │   │
│  │    └─Roles    │  │  2   │ Raj    │  86  │  │   │
│  └──────────────┘  └───────────────────────────┘   │
└────────────────────────────────────────────────────────┘
```


### pgAdmin Installation

**On Arch Linux:**

```bash
sudo pacman -S pgadmin4
```

**On Ubuntu/Debian:**

```bash
sudo apt install pgadmin4
```


#### Step 2: Create Master Password

First launch requires setting master password for pgAdmin.


#### Step 4: General Tab

- **Name:** `Local PostgreSQL` (friendly name)


#### Step 6: Save and Connect

Click **Save**.

Server appears in left panel, expand to see databases.


## 15. Common Connection Errors

### Error 1: FATAL: role "username" does not exist

**Error Message:**

```
FATAL: role "mukul" does not exist
```

**Cause:** PostgreSQL role not created.

**Solution:**

```sql
-- Connect as postgres
sudo -u postgres psql

-- Create role
CREATE ROLE mukul WITH LOGIN PASSWORD 'password';

-- Verify
\du
```


### Error 3: Peer authentication failed

**Error Message:**

```
FATAL: Peer authentication failed for user "mukul"
```

**Cause:** `pg_hba.conf` uses `peer` authentication but:

- Username doesn't match system username
- Connecting via TCP/IP (peer only works for Unix socket)

**Solution:** Change authentication method to `md5`

```bash
# Edit pg_hba.conf
sudo nano /var/lib/postgres/data/pg_hba.conf

# Change:
local   all   all   peer

# To:
local   all   all   md5

# Reload PostgreSQL
sudo systemctl reload postgresql
```


### Error 5: Password authentication failed

**Error Message:**

```
FATAL: password authentication failed for user "mukul"
```

**Causes:**

1. Wrong password
2. User doesn't have LOGIN privilege

**Solutions:**

**Change password:**

```sql
-- As postgres
sudo -u postgres psql

-- Change password
ALTER ROLE mukul WITH PASSWORD 'new_password';
```

**Grant LOGIN privilege:**

```sql
ALTER ROLE mukul WITH LOGIN;
```


## PART 8: ADVANCED ROLE MANAGEMENT

 mukul     |                                                            | {}
 postgres  | Superuser, Create role, Create DB, Replication, Bypass RLS| {}
```


### Modifying Role Attributes

**Syntax:**

```sql
ALTER ROLE role_name WITH option;
```

**Examples:**

**Grant CREATEDB privilege:**

```sql
ALTER ROLE mukul WITH CREATEDB;
```

**Remove CREATEDB privilege:**

```sql
ALTER ROLE mukul WITH NOCREATEDB;
```

**Change password:**

```sql
ALTER ROLE mukul WITH PASSWORD 'new_secure_password';
```

**Set connection limit:**

```sql
ALTER ROLE mukul WITH CONNECTION LIMIT 10;
```

**Set password expiration:**

```sql
ALTER ROLE mukul VALID UNTIL '2025-12-31';
```

**Make superuser:**

```sql
ALTER ROLE mukul WITH SUPERUSER;
```

**Remove superuser:**

```sql
ALTER ROLE mukul WITH NOSUPERUSER;
```


### Dropping (Deleting) Role

**Syntax:**

```sql
DROP ROLE role_name;
```

**Example:**

```sql
DROP ROLE mukul;
```

**⚠️ Important:**

- Cannot drop role that owns databases or objects
- Must first reassign or drop owned objects

**Reassign ownership before dropping:**

```sql
-- Reassign all objects owned by mukul to postgres
REASSIGN OWNED BY mukul TO postgres;

-- Drop objects owned by mukul
DROP OWNED BY mukul;

-- Now can drop role
DROP ROLE mukul;
```


### Table Privileges

**Grant SELECT (read) on table:**

```sql
GRANT SELECT ON students TO mukul;
```

**Grant INSERT, UPDATE, DELETE:**

```sql
GRANT INSERT, UPDATE, DELETE ON students TO mukul;
```

**Grant all privileges on table:**

```sql
GRANT ALL PRIVILEGES ON students TO mukul;
```

**Grant on all tables in schema:**

```sql
GRANT SELECT ON ALL TABLES IN SCHEMA public TO mukul;
```

**Grant on future tables:**

```sql
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT SELECT ON TABLES TO mukul;
```


### Check Privileges

**View table privileges:**

```sql
\dp students
```

**Output:**

```
                              Access privileges
 Schema |   Name   | Type  | Access privileges | Column privileges | Policies

## PART 9: PRACTICAL EXAMPLES


### Step-by-Step Implementation

```sql
-- Step 1: Connect as postgres
sudo -u postgres psql

-- Step 2: Create application user
CREATE ROLE webapp_user WITH LOGIN PASSWORD 'secure_app_password';

-- Step 3: Grant CREATEDB to webapp_user (optional)
ALTER ROLE webapp_user WITH CREATEDB;

-- Step 4: Create database
CREATE DATABASE webapp_db OWNER webapp_user;

-- Step 5: Connect to new database
\c webapp_db

-- Step 6: Create tables (as webapp_user would)
-- Switch to webapp_user
\c webapp_db webapp_user

-- Create example table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(200) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 7: Create read-only user
-- Switch back to postgres
\c webapp_db postgres

-- Create readonly role
CREATE ROLE readonly_user WITH LOGIN PASSWORD 'readonly_password';

-- Grant connect privilege
GRANT CONNECT ON DATABASE webapp_db TO readonly_user;

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO readonly_user;

-- Grant SELECT on all existing tables
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly_user;

-- Grant SELECT on future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT SELECT ON TABLES TO readonly_user;

-- Step 8: Verify setup
\du
\l
\c webapp_db
\dt
\dp
```


## 19. Backup and Restore

### Backup Database

**Single Database:**

```bash
pg_dump -U webapp_user -d webapp_db > webapp_backup.sql
```

**With password:**

```bash
PGPASSWORD='password' pg_dump -U webapp_user -d webapp_db > webapp_backup.sql
```

**Compressed backup:**

```bash
pg_dump -U webapp_user -d webapp_db | gzip > webapp_backup.sql.gz
```

**Custom format (recommended):**

```bash
pg_dump -U webapp_user -d webapp_db -F c -f webapp_backup.dump
```


### Backup All Databases

**All databases:**

```bash
pg_dumpall -U postgres > all_databases.sql
```

**Only roles and tablespaces:**

```bash
pg_dumpall -U postgres --globals-only > globals.sql
```


## 20. Command Cheat Sheet

### Service Management

```bash
# Start PostgreSQL
sudo systemctl start postgresql

# Stop PostgreSQL
sudo systemctl stop postgresql

# Restart PostgreSQL
sudo systemctl restart postgresql

# Reload configuration
sudo systemctl reload postgresql

# Check status
sudo systemctl status postgresql

# Enable auto-start at boot
sudo systemctl enable postgresql
```


### Database Management

```sql
-- Create database
CREATE DATABASE dbname;

-- Create database with owner
CREATE DATABASE dbname OWNER username;

-- Create database from template
CREATE DATABASE dbname TEMPLATE template0;

-- Rename database
ALTER DATABASE oldname RENAME TO newname;

-- Change owner
ALTER DATABASE dbname OWNER TO new_owner;

-- Drop database
DROP DATABASE dbname;

-- List all databases
\l

-- Connect to database
\c dbname

-- Show current database
SELECT current_database();
```


### psql Meta-Commands

```sql
-- Quit
\q

-- Help on meta-commands
\?

-- Help on SQL commands
\h

-- List databases
\l

-- List tables
\dt

-- List all relations
\d

-- Describe table
\d tablename

-- List users/roles
\du

-- Connect to database
\c dbname

-- Connection info
\conninfo

-- Execute SQL file
\i filename.sql

-- Toggle timing
\timing

-- Toggle expanded output
\x

-- Show SQL for meta-command
\set ECHO_HIDDEN on
```


## 21. Exam-Ready Summary

### Installation Steps (Arch Linux)

```
1. Install PostgreSQL
   → pacman -S postgresql

2. Initialize database cluster
   → sudo -u postgres initdb -D /var/lib/postgres/data

3. Start service
   → sudo systemctl start postgresql

4. Enable auto-start
   → sudo systemctl enable postgresql
```


### Authentication Configuration

```
1. Edit pg_hba.conf
   → sudo nano /var/lib/postgres/data/pg_hba.conf

2. Change peer to md5
   → local all all md5

3. Reload PostgreSQL
   → sudo systemctl reload postgresql
```


## 22. One-Line Exam Answer

**Question:** Explain PostgreSQL setup and GUI integration.

**Answer:** PostgreSQL installation requires initializing a data directory using initdb, starting the postgresql service, creating database roles with LOGIN privilege and passwords, creating databases with specific owners, configuring password-based authentication (md5) in pg_hba.conf for GUI tools, and connecting through JDBC-based clients like DBeaver by providing host, port, database, username, and password credentials.

