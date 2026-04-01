---
---

# **Git Internals — Complete Note (Obsidian Ready)**

Git is a **content-addressable version control system**.  
Every file, folder, and commit gets stored as an **object** inside the private `.git/` directory and is identified using a **SHA-1 hash**.

Git does **not** store diffs.  
Git stores **snapshots** of your project.


# **2. The Three Musketeers of Git**

Git stores 3 primary object types:


## **2.2 Tree Object (directory / folder)**

A **tree** stores:

- filenames
    
- permissions / modes
    
- blob hashes (files)
    
- tree hashes (subfolders)
    

Tree = folder snapshot.

Command:

```
git ls-tree <tree-sha>
```

ASCII:

```
Tree
├── fileA.txt → blob-hash-A
├── fileB.js  → blob-hash-B
└── src/      → tree-hash-C
```


# **3. Full ASCII Diagram of Git Internals**

```
                 Commit (SHA-aaaa)
                 ├─────────────┐
                 │             │
                 │   parent: <SHA-prev>
                 │   tree:   <tree-root>
                 └─────────────┘
                          |
                          v
                  Tree (SHA-bbbb)
                  ├───────────────┐
                  │ fileA.txt -> blobA
                  │ fileB.js  -> blobB
                  │ src/      -> treeC
                  └───────────────┘
                         |
                         v
                 TreeC (SHA-cccc)
                  ├── main.js  -> blobD
                  └── utils.js -> blobE

Blobs store RAW data
Trees store STRUCTURE
Commit stores HISTORY + METADATA
```

|   Blob Objects  (file content)   |
|   Tree Objects  (folder layout)  |
|   Commit Objects(history + meta) |

# **5. What Happens Internally for Each Command**


## **5.2 `git commit`**

Git:

1. Reads index (staging area)
    
2. Builds **tree objects** for directories
    
3. Builds **commit object** linking to tree
    
4. Stores commit in `.git/objects`
    
5. Moves branch pointer to new commit
    

ASCII:

```
index → tree → commit → branch pointer updates
```


# **7. Git Snapshots vs Diffs**

Git stores a **full snapshot** per commit:

```
Commit 1
 f1 → blobX
 f2 → blobY

Commit 2
 f1 → blobX (same)
 f2 → blobZ (changed)
```

Only blob **Z** is new.

Git is extremely space-efficient.


# **9. `.gitignore` and `.gitkeep`**

### `.gitignore`

Tells Git what NOT to track:

Common ignores:

```
node_modules/
.env
.venv
dist/
.DS_Store
logs/
```

### `.gitkeep`

Git does not track empty folders.  
To force-add an empty directory:

```
touch folder/.gitkeep
```


# **11. Commit Behind the Scenes**

Commit object contains:

```
type commit
size X
tree <tree-sha>
parent <parent-sha>
author <name>
committer <name>
message "msg"
```

SHA is computed from this WHOLE content.

Linking parent commits builds the entire project history graph.


# **13. Summary (Cheat Sheet)**

### Git Objects:

- **Blob** = file content
    
- **Tree** = folder structure
    
- **Commit** = snapshot metadata
    

### Git Storage:

- Everything stored in `.git/objects`
    
- SHA identifies every object
    
- Git stores **snapshots**, not diffs
    

### Workflow:

```
Working Directory → Index → Tree → Commit
```

