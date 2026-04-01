---
---

# Git Remotes, Upstream/Downstream, Push, Fetch, and Branch Tracking

A **remote** in Git is a name that points to a repository URL.  
Examples:

- `origin` → the repo you cloned from
    
- `upstream` → usually the original repo when you fork
    

Use `git remote -v` to inspect all remotes.


# 2. git branch -M main

Renames the current branch to `main` and forces the rename.

```
git branch -M main
```

Useful for replacing `master` with `main`.


# 4. Push to a Different Remote

Add another remote:

```
git remote add other https://github.com/someone/another-repo.git
```

Push local `main` to that repo:

```
git push other main
```

Push and rename the branch on the remote:

```
git push other feature:feature-copy
```

Force push:

```
git push --force other main
```


# 6. git push -u origin main

Push local `main` to `origin/main` and set upstream tracking.

```
git push -u origin main
```

After this:

```
git push
git pull
```

work without specifying branch or remote.

Check what upstream a branch is tracking:

```
git branch -vv
```

Unset or change upstream:

```
git branch --unset-upstream
git branch -u origin/other-branch
```


# 8. Upstream vs Downstream Concepts

Upstream  
The branch or repo you pull from.  
Your local branch usually tracks `origin/main` as upstream.

Downstream  
Branches or repos that receive updates from you.

Simple:

- Upstream = the source of truth
    
- Downstream = receivers of your code
    


## Relationship Between Tracking Branches

```
[ local main ] ------------------> [ origin/main ]
          |                                 |
          |---------- tracking ------------|
```

Created by:

```
git push -u origin main
```


# 10. Pulling from a Different Branch

Pull another branch into your current one:

```
git pull origin dev
```

Pull updates into the branch itself:

```
git switch dev
git pull
```

If only on remote:

```
git switch -c dev origin/dev
```



```
         YOUR LAPTOP                          GITHUB SERVER
        (Local Repo)                           (Remote Repo)
        ----------------                     -------------------
        |  main       |                     |  origin/main     |
        |  dev        |   pull (origin/dev) |  origin/dev      |
        |  feature-x  | <------------------ |  origin/feature  |
        |   .git      |                     |      .git        |
        ----------------                     -------------------
          Working Dir                           Remote Storage
```

