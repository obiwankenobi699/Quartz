---
---


## **2. CD Pipeline (Automatic Deployment)**

**Purpose:** Automatically release your code to users.

**Example in real life:**

- A web app deployed to **Netlify or Vercel**
    
- Pipeline steps:
    
    1. Checkout code
        
    2. Install dependencies
        
    3. Build project (`npm run build`)
        
    4. Deploy build folder to hosting
        
- Optional: Add cache for `node_modules` to speed up builds
    

**Trigger:** Push to `main`  
**Benefit:** Developers don’t have to manually upload files → fast and consistent releases


## **4. Manual / Workflow Dispatch Pipeline**

**Purpose:** Trigger workflows **on demand**, not automatically.

**Example in real life:**

- A marketing team wants to update README or badges before a product launch
    
- Steps:
    
    1. Append current timestamp / update version badge
        
    2. Push changes to `main`
        
- Triggered via **“Run workflow”** in GitHub Actions
    

**Benefit:** Flexible and safe, doesn’t run automatically unless requested


## **6. Security / Code Quality Pipeline**

**Purpose:** Make sure code is secure and high-quality.

**Example in real life:**

- A SaaS company:
    
    1. Run static code analysis (SAST)
        
    2. Scan for secrets in commits
        
    3. Run dependency vulnerability check (`npm audit`)
        
    4. Block merge if critical issues found
        

**Trigger:** Pull request or push  
**Benefit:** Prevents insecure code from being merged


### **Summary Table**

|Pipeline Type|Trigger|Example Steps|Real-life Benefit|
|---|---|---|---|
|CI|PR / push|Tests, lint, build|Prevent broken code in main|
|CD|Push to main|Build, deploy to hosting|Quick, automated releases|
|Scheduled|Cron|Data reports, cleanup|Automates repetitive tasks|
|Manual|workflow_dispatch|Update README, trigger builds|Controlled, on-demand actions|
|Release|Push / manual|Version bump, changelog, publish|Consistent software releases|
|Security / Quality|PR / push|SAST, secrets, dependency scan|Prevent vulnerabilities|
|DevOps / Infra|Push / manual|Docker build, deploy to Kubernetes|Automated infrastructure management|


# CI — Node / React test + lint (runs on PRs)

Runs tests, lint, and uploads coverage. Trigger: `pull_request`.

```yaml
name: CI — test & lint

on:
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm test

      - name: Upload coverage (optional)
        if: success()
        uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage/
```

**Use when:** You want PRs blocked until tests/lint pass.


# Docker — Build image and push to registry (GHCR/Docker Hub)

CI that builds a Docker image and pushes it to a registry on push to `main`.

```yaml
name: Docker Build & Push

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-push:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Set up QEMU (for multi-arch)
        uses: docker/setup-qemu-action@v2

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Login to registry
        uses: docker/login-action@v2
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GHCR_TOKEN }} # create PAT or use GITHUB_TOKEN depending on permissions

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ghcr.io/${{ github.repository_owner }}/my-app:latest
          file: ./Dockerfile
```

**Secrets:** `GHCR_TOKEN` (or use `GITHUB_TOKEN` with proper permissions). Replace action tags with SHAs if required.


# Manual / Dispatch — single-branch README updater (no branch clutter)

Manual dispatch that edits README and pushes directly to `main`. **Requires branch protection to allow Actions or a PAT**.

```yaml
name: Manual README Update

on:
  workflow_dispatch:
    inputs:
      message:
        description: 'Message to echo'
        required: false
        default: 'Manual run'

jobs:
  update-readme:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          persist-credentials: true

      - name: Append timestamp
        run: |
          echo "Manual message: ${{ github.event.inputs.message }}" >> README.md
          echo "Last manual run: $(date)" >> README.md
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
          git config --local user.name "github-actions[bot]"
          git add README.md
          git commit -m "Update README [skip ci]" || echo "No changes"
          git push origin main
```

**Note:** If push fails because of protection, either allow Actions to push or use a PAT.


# Security scan — dependency & static analysis (example)

Run `npm audit` and CodeQL analysis on PRs.

```yaml
name: Security & Static Analysis

on:
  pull_request:
  push:
    branches: [ main ]

jobs:
  npm-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with: { node-version: 20 }
      - name: Install
        run: npm ci
      - name: npm audit
        run: npm audit --json > audit.json || true
      - name: Upload audit
        uses: actions/upload-artifact@v4
        with:
          name: npm-audit
          path: audit.json

  codeql:
    name: CodeQL analysis
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Initialize CodeQL
        uses: github/codeql-action/init@v2
        with:
          languages: javascript
      - name: Autobuild
        uses: github/codeql-action/autobuild@v2
      - name: Perform CodeQL analysis
        uses: github/codeql-action/analyze@v2
```

**Tip:** Add severity gating or fail-on-findings if you want PRs blocked.

