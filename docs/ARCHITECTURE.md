# Diagrama de Arquitetura - TaskFocus Frontend

Este documento contém várias representações do diagrama do projeto: PlantUML, Mermaid e um diagrama ASCII rápido.

---

## 1) Como visualizar o PlantUML
Arquivo: `docs/ARCHITECTURE.puml`

- Use um renderizador PlantUML local (necessita Java) ou visualize online em https://www.plantuml.com/plantuml.
- Exemplo (local):

```powershell
# Usando plantuml.jar (se tiver instalado)
java -jar plantuml.jar docs\ARCHITECTURE.puml
# gera um PNG no mesmo diretório
```

---

## 2) Diagrama Mermaid (copie para um arquivo .md que aceite Mermaid ou use https://mermaid.live)

```mermaid
flowchart TD
  subgraph Frontend [Frontend (Angular)]
    Browser[Browser]
    AngularApp[Angular App (src/)]
    Components[Components]
    Pages[Pages]
    Services[Services]
    Interceptors[Interceptors]
    Models[Models]
    Environments[Environments (environment.ts / environment.prod.ts)]
    Browser --> AngularApp
    AngularApp --> Components
    AngularApp --> Pages
    AngularApp --> Services
    AngularApp --> Interceptors
    AngularApp --> Environments
  end

  subgraph Build [Build Output]
    BrowserDist[dist/taskfocus-frontend/browser]
    ServerDist[dist/taskfocus-frontend/server]
  end

  subgraph Server [Server (SSR)]
    SSRServer[server.ts / Express / server.mjs]
  end

  subgraph Backend [Backend API]
    API[API Server (/api/*)]
    DB[(Database)]
  end

  subgraph Infra [Deployment Options]
    Nginx[Nginx / Apache (static hosting)]
    PM2[PM2 / Node (SSR)]
    Docker[Docker]
  end

  Services -->|HTTP (apiUrl)| API
  Interceptors -->|Adds Authorization| Services
  SSRServer -->|server-side HTTP| API
  BrowserDist -->|static files| Nginx
  ServerDist --> PM2
  Nginx -->|proxy| SSRServer
  API --> DB
  Docker --> Nginx
  Docker --> PM2
```

---

## 3) Diagrama ASCII (visão rápida)

Frontend (Browser)
  |
  +-- Angular App (src/)
      +-- Pages (login, register, dashboard, tasks, settings, notifications)
      +-- Components (header, task-form, charts, modals)
      +-- Services (auth.service, task.service, dashboard.service)
      +-- Interceptors (auth.interceptor)
      +-- Models (task.model, dashboard-stats.model, chart-data.model)
      +-- Environments (environment.ts / environment.prod.ts)

Build Output
  +-- dist/taskfocus-frontend/browser/  (static SPA)
  +-- dist/taskfocus-frontend/server/   (SSR server.mjs)

Server (optional SSR)
  +-- server.ts (Express) -> runs server.mjs
  +-- SSR performs server-side rendering and may call backend API

Backend API
  +-- /api/auth/*   (login/register)
  +-- /api/tasks/*  (tasks CRUD)
  +-- /api/dashboard/* (stats, chart data)
  +-- Database (MySQL/Postgres etc.)

Deployment
  +-- Static: Nginx/Apache serve `browser/`
  +-- SSR: PM2 runs server.mjs, Nginx reverse-proxies
  +-- Docker: containeriza web + api if desejar

---

## 4) Recomendações rápidas

- Edite `src/environments/environment.prod.ts` para apontar `apiUrl` para seu backend de produção.
- Se usar SSR, proteja `server.ts` (sanitize req.url, validar `Host` headers) — isso é importante para segurança SSR.
- Use Nginx para servir estático + proxy para SSR ou API.

---

## 5) Localização dos arquivos no projeto

- `src/` — código fonte Angular
- `src/app/services/` — `auth.service.ts`, `task.service.ts`, `dashboard.service.ts`
- `src/app/interceptors/` — `auth.interceptor.ts`
- `server.ts` — arquivo para SSR/Express
- `angular.json` — build configs (fileReplacements para `environment.prod.ts`)
- `dist/taskfocus-frontend/` — saída do build

---

Se quiser, eu posso:
- Gerar uma imagem PNG SVG do PlantUML e adicionar ao projeto (se quiser que eu gere localmente, me autorize a rodar o gerador). 
- Converter o Mermaid para um arquivo `.svg` e salvar em `docs/`.

Diga qual formato prefere (PNG/SVG/mermaid live) e eu gero para você automaticamente. Obrigado!
