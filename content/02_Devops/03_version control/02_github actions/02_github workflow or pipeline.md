---
---

## 1. Events

Events are **triggers** that start a GitHub Action workflow.  
These triggers are fired by actions inside the repository or by external GitHub events.

### Key Examples

- **push** — starts workflow whenever new commits are pushed
    
- **pull_request** — starts workflow when a PR is opened, updated, or closed
    
- **workflow_dispatch** — manually start from GitHub UI
    
- **schedule** — cron-based automation
    
- **release** — when a release is created or updated
    

### Summary

Events = “What causes your workflow to start?”


## 3. Pipelines

GitHub does not use the term “pipeline” officially, but a workflow itself _acts as a pipeline_.  
People use "pipeline" to refer to:

- the full automation flow
    
- from event → workflow → jobs → steps → runner → output
    

So you can think of **Pipeline = Workflow + Jobs + Steps**.


## 5. Steps

Steps are the **actual commands in a job**, executed one-by-one.

Steps can be:

- shell commands
    
- actions from the marketplace
    

### Example

```
steps:
  - name: Checkout
    uses: actions/checkout@v4

  - name: Install dependencies
    run: npm install

  - name: Run tests
    run: npm test
```

Steps = “Exact tasks inside a job.”


# ASCII Diagram: Complete Workflow Structure

```
               +----------------------+
               |      GitHub Event    |
               |  (push / PR / cron)  |
               +----------+-----------+
                          |
                          v
                +--------------------+
                |     WORKFLOW       |
                |  (.github/workflows) 
                +----------+---------+
                           |
     --------------------------------------------------
     |                                                |
     v                                                v
+------------+                               +----------------+
|   JOB 1    |  -- runs-on --> Runner A      |     JOB 2      |
| (build)    |------------------------------>|    (test)      |
+-----+------+                               +--------+-------+
      |                                               |
      v                                               v
+------------+                                 +-------------+
|  Steps     |                                 |   Steps     |
|  checkout  |                                 |   checkout  |
|  install   |                                 |   test      |
|  build     |                                 |             |
+------------+                                 +-------------+
```


# Final Summary

### Event

Triggers your workflow.

### Workflow

YAML automation file inside `.github/workflows`.

### Pipeline

Informal term representing the entire workflow execution.

### Jobs

Groups of steps executed on runners.

### Steps

Commands or GitHub Actions executed inside a job.

### Runner

Machine that executes the job.
Here is a clean, Obsidian-ready explanation of **DAG (Directed Acyclic Graph) Jobs** in GitHub Actions, with diagrams and a full YAML example.


# 1. What is a DAG in GitHub Actions?

GitHub Actions workflows form a **DAG**:

- **Nodes** = jobs
    
- **Edges** = dependencies using `needs`
    
- No cycles allowed (a job cannot depend on itself)
    

This allows complex pipelines like:

- parallel jobs
    
- sequential jobs
    
- fan-out → fan-in
    
- multi-stage pipelines
    


## A. Linear DAG

```
Job A → Job B → Job C
```

### YAML

```
jobs:
  A:
    runs-on: ubuntu-latest

  B:
    runs-on: ubuntu-latest
    needs: A

  C:
    runs-on: ubuntu-latest
    needs: B
```


## C. Fan-In DAG

```
Job B
   \ 
    \
     → Job D
    /
Job C
```

### YAML

```
jobs:
  B:
    runs-on: ubuntu-latest

  C:
    runs-on: ubuntu-latest

  D:
    runs-on: ubuntu-latest
    needs: [B, C]
```


### YAML (Complex DAG)

```
jobs:
  A:
    runs-on: ubuntu-latest

  B:
    runs-on: ubuntu-latest
    needs: A

  C:
    runs-on: ubuntu-latest
    needs: A

  D:
    runs-on: ubuntu-latest
    needs: A

  E:
    runs-on: ubuntu-latest
    needs: [B, C, D]
```


# 4. ASCII Diagram of This Pipeline

```
                +---------+
                |  lint   |
                +---------+
                     |
                     v
                +---------+
                | build   |
                +---------+
                     |
                     v
                +---------+
                |  test   |
                +---------+
                     |
                     v
                +-----------+
                |  package  |
                +-----------+
                     |
                     v
                +-----------+
                |  deploy   |
                +-----------+
```

This is a linear DAG — but you can modify it to any shape (fan out, fan in, etc.).

