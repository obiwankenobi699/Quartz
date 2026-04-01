---
---

# 1. Git Status

`git status` shows the current state of your working directory and staging area.  
It tells you which files are:

- Modified but not staged
    
- Staged but not committed
    
- Untracked
    
- Ready to be committed
    

It helps you understand what Git will include in the next commit.

### Command

```
git status
```

This is one of the most frequently used commands when working with branches, staging, and debugging code changes.


# 3. Git Log

`git log` shows the commit history of your current branch.  
Each commit includes:

- Commit SHA
    
- Author
    
- Date
    
- Commit message
    
- Parent commit link
    

### Basic

```
git log
```

### Single line log

```
git log --oneline
```

### Log with graph (visualizing branches)

```
git log --oneline --graph --decorate --all
```

Useful when understanding merges, rebase histories, or debugging where a commit came from.


# 5. Git Tag

Tags are used to mark specific commits, often for releases like v1.0, v2.1 etc.

There are two types of tags:

1. Lightweight tags (just a pointer)
    
2. Annotated tags (stored as full Git objects with metadata)
    


# Combined Summary Table

|Concept|Purpose|Key Commands|
|---|---|---|
|git status|Shows working directory and staging area state|`git status`|
|git diff|Shows actual code changes line-by-line|`git diff`, `git diff --cached`|
|git log|Shows commit history|`git log`, `git log --oneline`|
|git stash|Saves changes temporarily|`git stash`, `git stash pop`|
|git tag|Marks important commits|`git tag v1.0`, `git push --tags`|

