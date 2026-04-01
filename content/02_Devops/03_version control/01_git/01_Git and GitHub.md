---
---
## Git vs GitHub

Git is a distributed version-control system installed locally on your machine. It tracks changes in files, maintains version history, allows branching, and helps you manage your code’s evolution. Git does not require the internet and works entirely offline.

GitHub is a cloud-based hosting platform built on top of Git. It stores your repositories online, enables collaboration with other developers, provides pull requests, issue tracking, automated workflows, CI/CD pipelines, and acts as a remote server for your Git projects. In short, Git is the tool, and GitHub is the service that gives Git collaboration features.


# Creating a Repository

A repository is a folder tracked by Git. To turn an existing folder into a repo, navigate to it and run:

```
git init
```

This creates a hidden `.git` directory which stores all Git history.

To check file states:

```
git status
```

It shows untracked files, staged files, and committed changes.

To clone an existing GitHub repository:

```
git clone https://github.com/username/repository.git
```


# .gitignore and .gitkeep

A `.gitignore` file tells Git which files or folders to avoid tracking. This is useful for preventing temporary, sensitive, or machine-specific files from entering the repository. Typical examples include environment variables, dependencies, compiled output, caches, and virtual environments.

Example `.gitignore`:

```
node_modules/
.env
.venv/
__pycache__/
dist/
build/
```

`.gitkeep` is not a Git feature but a common convention. It is an empty file placed inside an otherwise empty folder to force Git to track that directory, because Git normally does not track empty folders. Developers add `.gitkeep` whenever they need to preserve a folder structure in a repository.

