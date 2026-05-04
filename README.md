# taskfocus-frontend

Projeto front-end em Angular para gerenciar tarefas (TaskFocus).

Descrição simples e direta:

- É uma aplicação SPA em Angular que permite registrar/entrar com usuário, criar, editar, listar e excluir tarefas; além de mostrar um dashboard com estatísticas e gráficos.
- A API do backend é acessada via endpoints em `/api/*`. Em desenvolvimento a URL padrão é `http://localhost:8080/api`; em produção, configure `src/environments/environment.prod.ts` com `apiUrl` para sua API.
- Autenticação via JWT; o token é armazenado no `localStorage` e enviado automaticamente pelo `auth.interceptor`.

Como executar localmente (desenvolvimento):

```powershell
npm install
npm start
# abre em http://localhost:4200
```

Como gerar build de produção:

```powershell
npm run build
# arquivos gerados em dist/taskfocus-frontend/
```

Diagrama do projeto:

- Arquivo PlantUML: `docs/ARCHITECTURE.puml`

Diagrama (visão rápida - Mermaid):

```mermaid
flowchart TD
  Browser[Browser] --> AngularApp[Angular App (src/)]
  AngularApp --> Services[Services]
  Services --> API[/api/*]
  AngularApp --> Interceptor[Auth Interceptor]
  API --> DB[(Database)]
  BrowserDist[dist/taskfocus-frontend/browser] --- Nginx[Nginx/Apache]
  ServerDist[dist/taskfocus-frontend/server] --- PM2[PM2 / Node (SSR)]
```

Diagrama (visão rápida - texto):

```
Browser -> Angular App (src/)
Angular App -> Services -> API (/api/*)
Angular App -> Interceptor -> adiciona Authorization header
Build: dist/taskfocus-frontend/browser (estático) ou server (SSR)
Servidor: Nginx/Apache serve estático; PM2/Node serve SSR
Backend: API Server -> Database
```

Observações rápidas:

- Altere `src/environments/environment.prod.ts` antes de publicar para apontar a `apiUrl` correta.
- Para deploy estático, copie `dist/taskfocus-frontend/browser/` para seu servidor web (Nginx/Apache).
- Para deploy com SSR, rode `npm run serve:ssr:taskfocus-frontend` em produção (use PM2 ou Docker).

---

Comandos Git sugeridos (execute localmente neste diretório se desejar subir para o GitHub):

```powershell
# se ainda não houver um repositório git
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/ArthurSilva007/taskfocus-frontend.git
git push -u origin main
```

