---
---

# **1. Git Rebase (Rewrite History)**

Rebase = **moving commits** to a new base (another branch’s tip) and **rewriting commit history**.

Think of it as:

```
take my commits
remove them temporarily
replay them one by one on top of another branch
create new commits with new SHAs
```


## **Rebase Diagram**

### Before rebase:

```
main:   A──B──C
                \
feature:         D──E
```

### After `git rebase main` on feature:

```
main:    A──B──C
feature:         D'──E'
```

D' and E' are **new commits** (different SHAs).


# **Interactive Rebase (edit, squash, reorder commits)**

```
git rebase -i HEAD~5
```

You can then:

- `pick` – keep commit
    
- `squash` – combine commits
    
- `reword` – change commit message
    
- `edit` – modify code in between
    
- `drop` – delete commit
    


# **When NOT to Rebase**

**Never rebase a branch that others already pulled.**

Rebase rewrites history → will cause conflicts on team repos.


# **2. Git Reflog (Time Machine of Git)**

Reflog = Git’s **internal diary**.  
It records **everything HEAD ever pointed to**, including:

- commits
    
- branch switches
    
- merges
    
- rebases
    
- resets
    
- stashes
    

This is **not shared with GitHub** → local only.

Reflog helps you recover code even if:

- you deleted a branch
    
- reset destroyed commits
    
- rebase changed commit IDs
    
- stash was lost
    


# **ASCII Diagram: How Reflog Remembers Everything**

```
HEAD moves over time:

HEAD -> A
HEAD -> B (commit)
HEAD -> C (rebase)
HEAD -> D (reset)
HEAD -> E (merge)

Reflog stores ALL this:
A
B
C
D
E
```

Even if commit C disappears from your branch, it still exists in Reflog.


# **Rebase vs Reflog (Differences)**

|Feature|Git Rebase|Git Reflog|
|---|---|---|
|Purpose|Rewrite history|Track every history change|
|Risk|High if misused|No risk|
|Local/Remote|Changes commit IDs (affects sharing)|Local only|
|Can recover deleted commits?|No|Yes|
|Can fix rebase mistakes?|No|Yes|


# **In One Sentence**

### **Rebase** = rewrite commit history to make it clean

### **Reflog** = a time machine that remembers every step you took

