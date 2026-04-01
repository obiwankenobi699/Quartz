---
---
It depends on **where the deletion happened** and **what “discard” you are using**. In Git there are three common cases.


## 2. File deleted and **already committed**

If you committed the deletion, discard will **not bring it back automatically**. You must restore from a previous commit.

**Command**

```bash
git checkout HEAD~1 -- filename
```

or

```bash
git restore --source=HEAD~1 filename
```

```
git restore --source=commithash.gif
```
This restores the file from the **previous commit**.


## Quick Summary

|Situation|Command|File Restored|
|---|---|---|
|Deleted but not committed|`git restore file`|Yes|
|Deleted + staged|`git restore --staged file` then `git restore file`|Yes|
|Deleted + committed|restore from previous commit|Yes|

