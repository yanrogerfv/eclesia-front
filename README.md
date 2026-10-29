# Eclesia

> *"Uma amiga na hora de organizar os Levitas!"*

O Eclesia é uma aplicação web para gerenciamento e organização de escalas do ministério de louvor. Ele ajuda grupos de louvor a organizar seus cultos semanais e especiais rastreando membros (levitas), instrumentos, músicas e a própria escala dos cultos.

## Funcionalidades

- **Levitas** — Gerenciamento de membros da equipe de louvor, seus respectivos instrumentos e disponibilidade.
- **Escalas** — Criação e organização de escalas de cultos (Quarta-feira, Domingo, Cultos Especiais), atribuindo levitas para cada função/instrumento (ministro, baixo, bateria, guitarra, teclado, violão, backing vocals).
- **Instrumentos** — Cadastro e controle dos instrumentos disponíveis no grupo.
- **Músicas** — Catálogo de músicas utilizadas nos cultos, com suporte a links para cifras e vídeos de referência.
- **Visualização Pública** — Acesso livre às escalas agendadas sem necessidade de autenticação (ideal para a igreja acompanhar quem está escalado).
- **Controle de Acesso (RBAC)** — Níveis de permissão diferenciados para administradores e levitas.
- **Temas Customizáveis** — Seleção dinâmica de 8 temas visuais inspirados na natureza e paletas modernas (Sunrise, Dew, Leaflight, Creamy, Sunset, Serene, Forest, Lollipop) diretamente na tela inicial.
- **Micro-animações Premium** — Componentes animados modernos via framer-motion/motion (ex: `VideoText`, `GridBeams`, `motion-highlight`, `motion-tabs`, etc.).
- **PWA (Progressive Web App)** — Instalável em dispositivos móveis e desktop, com suporte a Service Worker e cache offline.
- **Monitoramento de Performance** — Integração com Vercel Analytics e Vercel Speed Insights para monitorar a experiência dos usuários.

## Pilha Tecnológica (Tech Stack)

- **Framework**: [Next.js](https://nextjs.org/) 14 (App Router, TypeScript)
- **Estilização**: Tailwind CSS
- **Biblioteca de UI**: Shadcn/ui + componentes interativos animados com [Motion](https://motion.dev/) (framer-motion)
- **Formulários e Validação**: React Hook Form + Zod
- **Notificações**: Sonner & React Toastify
- **Autenticação**: Tokens JWT persistidos em cookies e validados pelo Middleware do Next.js
- **PWA**: `@ducanh2912/next-pwa` (Service Worker, instalação nativa e cache offline)
- **Hospedagem & Analytics**: Vercel (Analytics e Speed Insights)

## Primeiros Passos

Para rodar o servidor de desenvolvimento localmente, instale as dependências e execute:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx            # Página inicial (Landing page com seletor de temas)
│   ├── login/              # Página de login (usuário/senha ou código de acesso)
│   ├── escalas/            # Visualização pública das escalas
│   └── home/               # Painel administrativo protegido
│       ├── escalas/        # Gerenciamento de escalas
│       ├── levitas/        # Gerenciamento de levitas
│       ├── instrumentos/   # Gerenciamento de instrumentos
│       └── musicas/        # Gerenciamento do repertório de músicas
├── components/
│   ├── app-sidebar.tsx     # Menu lateral de navegação principal
│   ├── themeSelector.tsx   # Seletor e gerenciador de temas visuais
│   ├── modals/             # Caixas de diálogos CRUD para cada entidade do sistema
│   └── ui/                 # Biblioteca de componentes visuais e animados (Shadcn/Motion)
├── context/
│   ├── AuthContext.tsx     # Contexto global de autenticação
│   └── permissionContext.tsx # Contexto de controle de permissões do usuário
├── hooks/
│   └── use-mobile.tsx      # Hook utilitário para detecção de telas móveis
├── lib/
│   ├── apiObjects.ts       # Definições de interfaces TypeScript das entidades
│   └── apiRequests.ts      # Funções utilitárias de requisição HTTP (GET, POST, etc.)
├── util/
│   ├── auth.ts             # Funções utilitárias auxiliares de autenticação
│   ├── compareDates.ts     # Comparadores de data para exibição de escalas
│   ├── getUserPermission.ts # Validador de escopo de permissões do usuário
│   └── themes.ts           # Definição e configuração dos 8 temas de cores do app
└── middleware.ts            # Proteção de rotas privadas via validação de JWT cookies
```

## Autenticação

- **Rotas Públicas**: `/`, `/login`, `/escalas`
- **Rotas Privadas**: Qualquer rota sob `/home/*` exige um token JWT válido.
- **Métodos de Login**: Suporta login via usuário/senha padrão ou por código de acesso de 6 caracteres.
- **Validação**: Feita no servidor a cada requisição através do [middleware.ts](file:///c:/Users/id02810/Documents/Programming%20Projects/Eclesia/frontend/src/middleware.ts).

## Créditos e Agradecimentos

*   **Desenvolvedor**: [Yan Roger Fogaça Vieira](https://github.com/yanrogerfv)
*   **Colaboradores & Testes**: Isabella Cassilhas e Gabriel Barros
