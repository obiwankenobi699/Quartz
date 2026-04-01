---
---

# Path filtering for pull requests  

You can limit when a workflow runs on pull requests using `on: pull_request` combined with `paths` and `paths-ignore`. The `paths` array means “run this workflow only when changed files match these patterns”; `paths-ignore` means “don’t run when only these patterns changed.” Patterns accept globs (`src/**`, `*.md`, `docs/**`). Use `branches` (or `branches-ignore`) to restrict target branches (the branch the PR targets). Example: the workflow below runs for PRs targeting `main` only when files under `src/` or `package.json` change; it will not run if only docs changed.

```yaml
name: PR Path-filter example

on:
  pull_request:
    branches: [ "main" ]            # target branch of the PR
    paths:
      - 'src/**'
      - 'package.json'
    paths-ignore:
      - 'docs/**'
```

Note security behavior differences: `pull_request` runs the workflow in the context of the PR commit (from the fork) without access to repository secrets, while `pull_request_target` runs in the base repo context (has access to secrets) but executes with the base branch code — be careful with `pull_request_target` because it can be abused by untrusted PRs if your workflow uses secrets or performs checkout/execute of untrusted code.


# Passing variables between jobs  
Jobs are isolated and run on different runners, so you cannot rely on process environment to propagate values between jobs. Use **job outputs**, **artifacts**, or **repository/state storage**.

**Job outputs** are the usual lightweight way to pass small values. A producing job sets outputs and a consuming job reads them via `needs.<job>.outputs`.

Important: use the modern `GITHUB_OUTPUT` file to set outputs inside a step (the older `::set-output` command was deprecated). Example:

```yaml
jobs:
  produce:
    runs-on: ubuntu-latest
    outputs:
      version: ${{ steps.set-version.outputs.version }}
    steps:
      - name: Determine version
        id: set-version
        run: |
          VERSION="v1.2.3"
          echo "version=$VERSION" >> "$GITHUB_OUTPUT"

  consume:
    runs-on: ubuntu-latest
    needs: produce
    steps:
      - name: Use produced version
        run: |
          echo "Got version from produce job: ${{ needs.produce.outputs.version }}"
```

**Artifacts** are for larger files or binary data. `actions/upload-artifact` in producer and `actions/download-artifact` in consumer:

```yaml
- uses: actions/upload-artifact@v4
  with:
    name: build-output
    path: ./dist

# in later job
- uses: actions/download-artifact@v4
  with:
    name: build-output
```

**Caveats**: job outputs are strings and limited in size; artifacts are persisted files. Also remember that jobs that run in parallel cannot `needs` each other — you must express dependencies with `needs`.


Short checklist (practical rules)

- Use `paths` and `paths-ignore` under `on: pull_request` to avoid unnecessary runs.
    
- Prefer `pull_request` for safe PR builds; use `pull_request_target` only if you need to run workflows with access to secrets, and handle security carefully.
    
- Use `env` at workflow/job/step levels for scoping; prefer explicit `env` on jobs/steps to avoid accidental leakage.
    
- Pass small values between jobs via **job outputs** (set via `$GITHUB_OUTPUT`), larger files via **artifacts**.
    
- Store credentials in **Secrets** (repo/org/environment). Do not echo secrets; secrets are masked but still sensitive.
    
- For deployments, use **environments** with required reviewers and environment secrets for safer production access.
    


Uploaded file reference for your notes  
`/mnt/data/2025-11-24_21-28-25_grim.png`

