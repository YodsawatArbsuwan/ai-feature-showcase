# Deployment Guide

## ไฟล์ที่เกี่ยวข้อง

```
ai-feature-showcase/
├── Dockerfile                      # Production multi-stage build
├── Dockerfile.dev                  # Development build (hot reload)
├── docker-compose.yml              # Production compose
├── docker-compose.dev.yml          # Development compose
├── .dockerignore                   # ไฟล์ที่ไม่ copy เข้า Docker image
├── .env.example                    # Template ของ env vars
├── .gitlab-ci.yml                  # GitLab CI pipeline (root config)
├── .gitlab-ci-dev/
│   ├── template.yml                # Reusable job templates
│   ├── build.yml                   # Build Docker image → push to registry
│   ├── security.yml                # Trivy scan + SonarQube
│   └── deploy.yml                  # SSH deploy ไปยัง VM
├── sonar-project.properties        # SonarQube project config
├── scripts/
│   ├── compose-up.sh               # Helper script สำหรับ docker compose
│   └── generate-api.sh             # Wrapper สำหรับ generate OpenAPI client
└── next.config.ts                  # มี output: "standalone" สำหรับ Docker
```

---

## Environment Variables

สร้าง `.env` จาก template ก่อนใช้งาน:

```bash
cp .env.example .env
```

| Variable | ค่า | หมายเหตุ |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | `http://<backend-host>:<port>` | URL ของ backend API |
| `NEXT_PUBLIC_APP_NAME` | `"AI Feature Showcase"` | ชื่อแอปที่แสดงใน UI |
| `NEXT_PUBLIC_AUTH_ENABLED` | `false` | เปิด/ปิด auth gate |
| `OPENAPI_SPEC_URL` | `http://<backend-host>:<port>/_api-json` | ใช้ตอน `yarn generate:api` เท่านั้น |

> `NEXT_PUBLIC_*` ถูก bake เข้า bundle ตอน `yarn build` — ต้องมีค่าถูกต้องก่อน build

---

## Deploy บน Local (Docker)

### ขั้นตอน

**1. สร้างไฟล์ .env**
```bash
cp .env.example .env
# แก้ NEXT_PUBLIC_API_BASE_URL ให้ชี้ไป backend
```

**2. Run ด้วย script**
```bash
sh scripts/compose-up.sh local up
```

หรือใช้ docker compose โดยตรง:
```bash
docker compose -f docker-compose.dev.yml up --build
```

**3. เปิดเบราว์เซอร์**
```
http://localhost:3011
```

### คำสั่งที่ใช้บ่อย

```bash
# เริ่ม
sh scripts/compose-up.sh local up

# ดู logs
sh scripts/compose-up.sh local logs

# หยุด
sh scripts/compose-up.sh local down

# ดูสถานะ container
sh scripts/compose-up.sh local ps
```

---

## CI/CD Pipeline (GitLab)

### Flow

```
push to main
  └─▶ [build]    build Docker image → push to GitLab registry
        └─▶ [security]  Trivy scan + SonarQube (allow_failure: true)
              └─▶ [deploy]   SSH เข้า VM → docker compose pull & up
```

### Stage: build

ไฟล์: `.gitlab-ci-dev/build.yml`

- ใช้ `docker:24-dind` build image แบบ multi-stage
- Tag image ด้วย `$CI_COMMIT_SHORT_SHA`
- Push ไปที่ GitLab Container Registry (`$CI_REGISTRY_IMAGE/app:<sha>`)
- ทำงานเมื่อ: push to `main` หรือ MR target `main`

### Stage: security

ไฟล์: `.gitlab-ci-dev/security.yml`

| Job | เครื่องมือ | ผลลัพธ์ |
|---|---|---|
| `trivy_security_scan` | Trivy 0.50.1 | `trivy-report.txt` |
| `sonarqube_quality_scan` | SonarQube Scanner 11 | `.scannerwork/report-task.txt` |

ทั้งสอง job ตั้ง `allow_failure: true` — pipeline ไม่หยุดถ้า scan fail

### Stage: deploy

ไฟล์: `.gitlab-ci-dev/deploy.yml`

1. SSH เข้า VM ผ่าน `DOCKER_HOST=ssh://user@host`
2. สร้าง Docker network `ai-showcase-network` (ถ้ายังไม่มี)
3. `docker compose pull` image ใหม่จาก registry
4. `docker compose up -d --remove-orphans`
5. `docker image prune` ลบ image เก่า (>72h)

### GitLab CI Variables ที่ต้องตั้งใน project settings

| Variable | Type | ค่า |
|---|---|---|
| `ENV_FILE_DEV` | File | ไฟล์ `.env` สำหรับ build |
| `DEV_SSH_PRIVATE_KEY` | Variable | SSH private key ของ server |
| `DEV_VM_IPADDRESS` | Variable | IP address ของ server |
| `DEV_VM_USER` | Variable | SSH username |
| `SONAR_HOST_URL` | Variable | URL ของ SonarQube |
| `SONAR_TOKEN` | Variable | Token ของ SonarQube |

---

## Production Docker Image

### Build flow (Dockerfile)

```
[deps]     node:24-alpine → yarn install --frozen-lockfile
[builder]  copy node_modules + source + .env → yarn build
[runner]   copy .next/standalone + .next/static + public → node server.js
```

Next.js ใช้ `output: "standalone"` ทำให้ได้ image เล็กลง — runner stage ไม่ต้องติดตั้ง dependencies ซ้ำ

### Build image ด้วยมือ

```bash
docker build -t ai-feature-showcase:local .
```

### Run production image บน local

```bash
# สร้าง network ก่อน (ถ้ายังไม่มี)
docker network create ai-showcase-network

# Run
APP_IMAGE=ai-feature-showcase:local docker compose -f docker-compose.yml up -d
```
