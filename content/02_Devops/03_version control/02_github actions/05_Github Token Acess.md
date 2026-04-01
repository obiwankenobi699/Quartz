---
---
Below is a concise, practical guide covering **GitHub tokens (GITHUB_TOKEN)**, **what permissions it has**, **how the runner provides it**, **how to use it (curl / gh / actions)**, differences with **PATs / GitHub Apps / OIDC**, security notes, and several ready-to-paste YAML / shell examples. Key internet references are cited.


## What permissions does `GITHUB_TOKEN` have (and how to control them)

- The exact **default** permissions can be configured at repository/organization level (there is a workflow-permissions setting in repo/org settings). Defaults vary: personal repos may default to more restricted (contents: read) while org settings can give broader rights. Because defaults can change, **always explicitly set the permissions you need in your workflow** rather than relying on defaults. ([GitHub Docs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository?utm_source=chatgpt.com "Managing GitHub Actions settings for a repository"))
    
- To change token scopes for a workflow, add a `permissions:` block at the workflow top-level (applies to all jobs) or per job (applies to that job). Use fine-grained least-privilege: request only what you need (for example `contents: read` or `pull-requests: write`). See example below. ([GitHub Docs](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions?utm_source=chatgpt.com "Workflow syntax for GitHub Actions"))
    

### Example — set permissions at the workflow level

```yaml
name: CI

on: [push]

permissions:
  contents: read        # repo contents (checkout) read-only
  pull-requests: write  # allow creating/merging PRs if needed
  id-token: write       # allow OIDC token exchange (if using OIDC)

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
```

### Example — set permissions per job

```yaml
jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      issues: write
    steps:
      - uses: actions/checkout@v4
```


## Token behavior for different triggers (security implication)

- Workflows triggered by **pull requests from forks** run with **restricted** token permissions (to prevent secret exfiltration). If you need repository secrets for a PR from a fork you must use `pull_request_target` (dangerous) or a protected workflow pattern with manual approvals/environments. Do not run untrusted code with write-level tokens. ([GitHub Docs](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions?utm_source=chatgpt.com "Workflow syntax for GitHub Actions"))
    


## OIDC and exchanging token for cloud credentials

- For cloud deployments, prefer **OIDC** (OpenID Connect) to mint short-lived cloud credentials directly from the runner (`id-token: write` permission). This avoids storing long-lived cloud secrets in GitHub. To enable OIDC you must grant `id-token: write` in `permissions:` and use `actions/iam` or the cloud provider’s OIDC settings. ([GitHub Docs](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions?utm_source=chatgpt.com "Workflow syntax for GitHub Actions"))
    


## Best practices (short)

- Always **explicitly set** `permissions:` in workflows to least-privilege. ([GitHub Docs](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions?utm_source=chatgpt.com "Workflow syntax for GitHub Actions"))
    
- Do not use `secrets.GITHUB_TOKEN` to authenticate to external services — use dedicated secrets or OIDC.
    
- Be careful with `pull_request_target` — never run untrusted code with write-level permissions. ([GitHub Docs](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions?utm_source=chatgpt.com "Workflow syntax for GitHub Actions"))
    
- For self-hosted runners, restrict which workflows can run and who can administer the host. ([openssf.org](https://openssf.org/blog/2024/08/12/mitigating-attack-vectors-in-github-workflows/?utm_source=chatgpt.com "Mitigating Attack Vectors in GitHub Workflows"))
    


## References

- GitHub docs: GITHUB_TOKEN and authentication in a workflow. ([GitHub Docs](https://docs.github.com/en/actions/concepts/security/github_token?utm_source=chatgpt.com "GITHUB_TOKEN"))
    
- GitHub docs: workflow permissions and how defaults are managed in repo/org settings. ([GitHub Docs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository?utm_source=chatgpt.com "Managing GitHub Actions settings for a repository"))
    
- GitHub REST auth examples (curl / gh). ([GitHub Docs](https://docs.github.com/en/rest/authentication/authenticating-to-the-rest-api?utm_source=chatgpt.com "Authenticating to the REST API"))
    
- Security guidance on workflow permissions and attack vectors. ([openssf.org](https://openssf.org/blog/2024/08/12/mitigating-attack-vectors-in-github-workflows/?utm_source=chatgpt.com "Mitigating Attack Vectors in GitHub Workflows"))
    

