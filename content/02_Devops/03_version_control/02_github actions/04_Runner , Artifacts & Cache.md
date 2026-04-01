---
---


## Types of Runners

There are **two main categories**:


## 2. Self-Hosted Runners

A **self-hosted runner** is a machine you configure yourself.

This can be:

- Your laptop
    
- On-prem server
    
- Cloud VM (AWS EC2 / GCP compute / Azure VM)
    
- Kubernetes pod
    
- Raspberry Pi
    
- Bare metal workstation
    

### Characteristics

- You manage installation, updates, security
    
- Persistent environment (state is NOT reset between runs)
    
- You choose the OS and hardware
    
- Useful for special hardware or large pipelines
    
- Can be **way cheaper** than using GitHub-hosted runners
    

### Benefits

- Unlimited minutes (free)
    
- Full control over software + hardware
    
- Faster builds possible (GPU, high RAM, multi-core servers)
    
- Can host runners behind firewalls
    

### When to Use

- Machine learning pipelines
    
- Heavy Docker builds
    
- GPU training
    
- Secure internal deployments
    
- Large monorepos
    
- Custom tools not available on GitHub-hosted runners
    


## Runner Labels

Every runner has a **label**, used in the workflow under `runs-on`.

### GitHub-hosted examples:

```yaml
runs-on: ubuntu-latest
runs-on: macos-14
runs-on: windows-latest
```

### Self-hosted examples:

GitHub auto-creates labels:

- `self-hosted`
    
- `linux` / `windows` / `macos`
    
- `x64` / `arm64`
    

You can add custom labels:

- `gpu`
    
- `ml`
    
- `docker-builder`
    

Workflow example using custom label:

```yaml
runs-on: [self-hosted, linux, gpu]
```


## YAML Example Using Both Runner Types

### GitHub-hosted runner

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm test
```

### Self-hosted runner

```yaml
jobs:
  build-heavy:
    runs-on: [self-hosted, linux, gpu]
    steps:
      - uses: actions/checkout@v4
      - run: python train.py
```

Here is a clean, Obsidian-ready explanation of **Persisting Data and Artifacts in GitHub Actions**.  
This covers: what artifacts are, why they exist, where they are stored, how to upload/download, retention, caching vs artifacts, and advanced patterns.


# Why Use Artifacts?

- Pass files between jobs in a workflow
    
- Save build output (binaries, zip files, docker layers, ML models)
    
- Debug logs
    
- Test reports
    
- Save datasets
    
- Save screenshots from UI tests
    
- Save release artifacts (zip, exe, dmg, deb, rpm)
    


# Downloading an Artifact in Another Job

```
- uses: actions/download-artifact@v4
  with:
    name: my-build
    path: ./build-output
```


# Artifact Retention and Storage

Default retention: **90 days**  
You can override:

```
retention-days: 5
```

Storage limit:

- Free: 500MB
    
- Team/Enterprise: More
    


# Persisting Data and Artifacts in GitHub Actions

## 1. What Are Artifacts?

Artifacts are files or directories that your workflow uploads during one job so they can be **stored**, **downloaded**, or **used by other jobs**. They are GitHub’s official mechanism for persisting data between steps or jobs.

Examples of artifacts:

- Build output (compiled binaries, bundles)
    
- Test reports or coverage reports
    
- Log files
    
- Exported datasets
    
- Model weights or temporary assets
    

Artifacts are stored by GitHub only for the duration you configure (default 90 days).


## 3. How to Upload Artifacts

Use the `actions/upload-artifact` action.

### Example: Uploading build output

```yaml
- name: Upload build output
  uses: actions/upload-artifact@v4
  with:
    name: build-output
    path: ./dist
```

This stores the `dist` directory as an artifact named `build-output`.


## 5. Example Workflow Passing Artifacts Between Jobs

```yaml
name: Build and Test

on: push

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build project
        run: npm run build

      - name: Upload build output
        uses: actions/upload-artifact@v4
        with:
          name: build
          path: dist/

  test:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Download build output
        uses: actions/download-artifact@v4
        with:
          name: build
          path: dist/

      - name: Run tests on built output
        run: npm test
```


## 7. Artifacts vs Caching

It's important to distinguish:

### Artifacts

- Persist data between **jobs**
    
- Files accessible after workflow ends
    
- Intended for output, test results, bundles, logs
    

### Cache

- Speeds up workflows by caching dependencies
    
- Designed for node_modules, pip cache, build cache
    
- Not available for user download
    
- Not preserved between jobs automatically unless restored
    


# Case Study: How GitHub Actions Cache Works

### Should You Cache `node_modules`? How Do Companies Do It?


# 2. Key Question

**Does GitHub Actions Cache store `node_modules`?**  
**Yes — but only if you explicitly include it in `path:`.**

Example:

```yaml
path: node_modules
```

But storing node_modules directly has problems.


# 4. What the Industry Actually Does

Most professional CI pipelines cache **npm’s artifact cache** instead of `node_modules`.

They cache this directory:

```
~/.npm
```

This stores downloaded package tarballs, not the fully built modules.

Then they still run:

```
npm ci
```

This ensures a clean, reproducible `node_modules`.


### B. Caching `~/.npm`

```
+------------------------+
| GitHub Cache           |
+------------------------+
          ^
          | restore
          |
+------------------------+
| ~/.npm                 |
| (downloaded packages)  |
| small + stable         |
+------------------------+

npm ci  ---> builds fresh node_modules
```

Slightly slower than caching node_modules,  
but **100× more stable and recommended by GitHub + npm docs**.


# 7. Example: Caching `node_modules` (Not Recommended But Allowed)

```yaml
- name: Cache node_modules
  uses: actions/cache@v4
  with:
    path: node_modules
    key: node-${{ runner.os }}-${{ hashFiles('package-lock.json') }}
    restore-keys: |
      node-${{ runner.os }}-
```

After restore:

```
if node_modules exists → npm install --prefer-offline
else → npm ci
```


# 9. Final Case Study Conclusion

**Summary:**

- GitHub Actions cache stores **whatever paths you list** in the YAML.
    
- You _can_ cache `node_modules`, but it’s fragile, OS-dependent, and large.
    
- Real-world teams (GitHub, Microsoft, Netflix, Meta) **cache ~/.npm** instead.
    
- This keeps builds deterministic but still fast.
    
- Always use a hash key based on `package-lock.json` for cache invalidation.
    

The winning pattern:

**cache → ~/.npm**  
**install → npm ci**  
**build → stable reproducible output**

This is the standard CI practice in the industry.


# 1. What is an Artifact?

An **artifact** is a file or folder that your workflow uploads and stores after a job finishes.

Artifacts are used to:

- store build outputs
    
- share files between jobs
    
- download results locally (logs, binaries, model weights, etc.)
    

Artifacts are persistent:  
**They live for the duration you configure (default 90 days).**

Artifacts use this official action:

```
actions/upload-artifact
```

Example:

```yaml
- name: Upload build output
  uses: actions/upload-artifact@v4
  with:
    name: web-build
    path: dist/
```

This stores your `dist/` folder as an artifact.


# 3. What is Github Cache (`actions/cache`)?

Caching is **completely different** from artifacts.

`actions/cache@v4` stores **dependencies** so builds run faster next time.

Example stored items:

- `~/.npm` (npm downloaded packages cache)
    
- Python pip cache (`~/.cache/pip`)
    
- Node modules (not recommended but possible)
    
- Build intermediate files
    

Cache = performance  
Artifact = storage / distribution


# 5. What is “npm cache”?

When you install packages, npm downloads **tarballs** (compressed package files).  
These downloads are stored in a folder called the **npm cache**, usually here:

```
~/.npm
```

Inside it you’ll see:

```
~/.npm/_cacache/index-v5/*
```

This cache stores:

- tarballs
    
- metadata
    
- integrity data
    

It makes repeat installs **super fast**.


# 7. What is “key” in actions/cache?

The **key** uniquely identifies a cache entry.

Example:

```yaml
key: npm-${{ runner.os }}-${{ hashFiles('package-lock.json') }}
```

Breakdown:

- `npm-` → prefix
    
- `${{ runner.os }}` → ensures Linux cache ≠ Windows cache
    
- `hashFiles('package-lock.json')` → links cache to dependency versions
    

So if package-lock.json changes:

- you get **new cache**
    
- old cache is preserved
    
- builds stay reproducible
    


# 9. Final Conclusion (Short and Clear)

### Artifacts

- Used to store files (builds, logs, models).
    
- Use: `actions/upload-artifact`.
    

### Cache

- Used to speed up workflows by storing dependencies.
    
- Use: `actions/cache`.
    

### npm cache

- Directory where npm stores downloaded packages (`~/.npm`).
    
- Fast and stable → recommended to cache.
    

### key

- A unique identifier for cache entries.
    
- Changing the key makes a new cache.
    

