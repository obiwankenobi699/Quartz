---
---
![[2025-11-24_20-44-54_grim.png]]



 **CI = Continuous Integration 
 CD = Continuous Deployment / Delivery


#  **1. Developer Pushes Code (Git Push)**

This triggers GitHub Actions, Jenkins, GitLab CI, CircleCI, etc.

```
Developer → git add → git commit → git push
```


#  **3. BUILD Stage** (CI Step 2)

This creates the **artifact**, which is the packaged app ready for deployment.

Depending on project:

### Web App:

```
npm install
npm run build
```

### Backend (Node/Python/Java):

```
npm run build
mvn package
pyinstaller
```

### Docker-based:

```
docker build -t app:latest .
```

### Build artifacts:

- `dist/` folder
    
- Docker image
    
- `.jar` or `.war`
    
- Compiled binaries
    

Artifacts are saved in:

- GitHub Actions → Artifacts
    
- Jenkins → Workspace / Artifact Manager
    
- AWS CodePipeline → S3
    
- GitLab CI → Packages
    


#  **5. PACKAGE + VERSION Stage**

(Used in professional pipelines)

- Bump version (SemVer)
    
- Add git tag
    
- Package app for deployment (zip, image, binary)
    

Example:

```
git tag v1.2.0
docker tag app:latest app:v1.2.0
```


#  **7. POST DEPLOY (Monitoring & Notifications)**

After deployment pipeline:

- Send Slack/Email notifications
    
- Run health checks
    
- Update deployment dashboard
    
- Log and metric collection begins
    

Example:

```
curl https://your-api/health
```

