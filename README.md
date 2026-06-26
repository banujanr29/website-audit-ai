# Website Audit AI

An AI-powered Website Audit Tool built with **Spring Boot 3.5** (Java 21) and **React + Vite + TypeScript**.

## Repository Structure

```
website-audit-ai/
├── backend/     Spring Boot 3.5 Maven project (com.eight25.audit)
└── frontend/    React + Vite + TypeScript SaaS frontend
```

## Quick Start

### Backend

```bash
cd backend
./mvnw spring-boot:run
# → http://localhost:8080
# → GET http://localhost:8080/api/health
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Application health check |
| GET | `/actuator/health` | Spring Boot Actuator health |

## Branches

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code |
| `develop` | Integration branch |
| `feature/project-setup` | This foundation PR |