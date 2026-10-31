# NGINX-Verse — Cloud Messenger™

A streaming-inspired static landing page served by NGINX in Docker and deployed through AWS CodePipeline → CodeBuild → Amazon ECR → ECS Fargate → Application Load Balancer.

## Files
- `index.html` — page structure
- `style.css` — responsive styling
- `script.js` — small UI enhancement
- `Dockerfile` — packages the site into NGINX
- `buildspec.yml` — builds/pushes the image and emits `imagedefinitions.json`

## Before deploying
1. Change `AWS_DEFAULT_REGION` in `buildspec.yml` to the Region where ECR, ECS and the pipeline are configured.
2. Create an ECR repository named `nginx-verse`.
3. In the ECS task definition, set the container name exactly to `nginx`, with container port 80.
4. Configure CodeBuild with Docker build support; standard Linux Docker builds may require privileged mode.
5. Grant the CodeBuild role permission to write logs, authenticate to ECR, and push to the specific ECR repository.
6. Configure CodeBuild to use this repository and `buildspec.yml`.
7. Configure CodePipeline's ECS deploy action to consume the CodeBuild output artifact containing `imagedefinitions.json`.

## Local test
```bash
docker build -t nginx-verse:local .
docker run --rm -p 8080:80 nginx-verse:local
```
Open `http://localhost:8080`.

## Important notes
- `imagedefinitions.json` must be included in the CodeBuild artifact.
- The container name in `imagedefinitions.json` must exactly match the ECS task definition container name (`nginx`).
- ECS tasks in private subnets need a route to ECR and CloudWatch, for example through NAT or suitable VPC endpoints.
- Use unique commit-based tags for deployments. The buildspec uses the first seven characters of the source revision when available.
- Use original or licensed visuals. This is a learning project and is not affiliated with Netflix.
- AWS resources can incur charges. Set budget alerts and delete demo resources when finished.

## Branding
Project by **Cloud Messenger™**  
`#buildwithcloud-messenger`  
LinkedIn: https://www.linkedin.com/in/cloud-messenger  
GitHub: https://github.com/Cloud-Messenger
