# Legacy Barber — Landing Page

Vitrine estática para a barbearia fictícia Legacy Barber. Objetivo único:
converter o visitante em uma conversa no WhatsApp — sem formulário próprio,
sem backend, sem estado.

Ver especificação completa em [`../docs/spec-landing-page.md`](../docs/spec-landing-page.md).

## Stack

Vue 3 (Composition API) + TypeScript estrito + Vite. Build estático, sem SSR.

## Rodando localmente

```bash
npm install
npm run dev       # servidor de desenvolvimento com hot-reload
npm run build     # build de produção (checa tipos + gera dist/)
npm run preview   # serve o build de produção localmente, para teste final
```

## Estrutura

```
src/
├── domain/        # Dados e regras puras (catálogo de serviços, contato)
├── components/     # Seções da página, uma responsabilidade cada
├── App.vue         # Orquestra a ordem das seções
└── style.css        # Variáveis CSS globais, reset, tipografia
```

`domain/` não conhece Vue nem o DOM — só dados e funções puras. Componentes
consomem esses dados prontos, nunca decidem regra de negócio sozinhos.

## Deploy

Publicado na Vercel a partir da branch `main`. Root Directory configurado
como `landing-page` (o repositório é um monorepo — veja o README raiz).