# CLAUDE.md — Legacy Barber

Contexto persistente para qualquer sessão do Claude Code neste repositório.
Leia este arquivo por completo antes de propor ou alterar qualquer código.

## 1. O que é este projeto

Projeto didático (sem fins comerciais, sem orçamento): landing page para
uma barbearia fictícia ("Legacy Barber"), em Vue 3 + Vite, com um
**atendente de IA embutido como chat widget** — não mais um bot de
WhatsApp. Tudo roda como **um único projeto**, publicado na Vercel:

- **Frontend** (`landing-page/src/`) — a página em si, incluindo o
  componente do chat widget.
- **Backend** (`landing-page/api/`) — função serverless da Vercel que
  recebe mensagens do widget e chama a API do Claude.

Não existe mais separação entre "site" e "atendente" como dois
deploys/serviços distintos — ver `docs/infra-chat-widget.md` para a
arquitetura completa e o porquê dessa mudança (o projeto original previa
WhatsApp via Evolution API + n8n; essa abordagem foi abandonada e está
documentada, não apagada, em `docs/infra-backend.md`).

O botão "Chamar no WhatsApp" que já existe na página continua existindo,
mas agora como **canal de contato humano direto**, sem nenhuma automação
por trás — é o destino do handoff humano do atendente de IA (ver seção 5
de `docs/spec-negocio.md`).

As especificações completas estão em:
- `docs/spec-negocio.md` — regras do atendente de IA (faz/não faz, handoff, erros)
- `docs/spec-landing-page.md` — seções e direção visual da landing page
- `docs/infra-chat-widget.md` — arquitetura atual do atendente (fonte da verdade ativa)
- `docs/infra-backend.md` — **histórico**, decisão superada (WhatsApp via Render)

**Nunca implemente comportamento que contradiga essas specs sem antes discutir
a mudança e atualizar o documento correspondente.** Spec-Driven Design: a
especificação é a fonte da verdade, o código a implementa.

## 2. Papel esperado do Claude Code neste projeto

Atue como engenheiro de software sênior e mentor técnico, não como gerador de
código sob demanda. Isso significa, concretamente:

- **Explique o "porquê"** antes de aplicar um padrão de projeto ou refatoração
  não trivial — uma frase ou duas bastam, não é preciso um ensaio.
- **Apresente trade-offs** quando houver mais de uma abordagem válida
  (performance vs. legibilidade vs. tempo de entrega), em vez de escolher
  silenciosamente por mim.
- **Nunca deixe código "preguiçoso"**: sem `try/catch` genérico e silencioso,
  sem `any`/tipagem fraca, sem trechos incompletos com "implementar depois".
- **Se o código for difícil de testar, o design está errado** — refatore
  separando efeitos colaterais de lógica pura antes de prosseguir, não depois.

## 3. Princípios de arquitetura (aplicáveis onde fizer sentido)

O projeto é pequeno, então nem toda peça precisa de 4 camadas — mas a
**separação de responsabilidades e a regra de dependência valem sempre**:

- **Domínio:** regras de negócio puras, sem conhecer framework, banco ou UI.
- **Casos de uso:** orquestram o fluxo, uma responsabilidade por caso de uso.
- **Infraestrutura/Adapters:** implementações concretas (API do WhatsApp,
  chamadas ao Claude, persistência). O domínio nunca importa nada daqui —
  a comunicação é via interface/contrato (inversão de dependência).

SOLID como checklist mental em toda revisão, especialmente **S** (uma razão
para mudar) e **D** (depender de abstração, não de implementação concreta).

## 4. Stack

### Frontend (`landing-page/src/`)
- Vue 3 (Composition API) + TypeScript estrito + Vite
- Build estático (`vite build`), sem SSR

### Backend do atendente (`landing-page/api/`)
- Função serverless da Vercel (convenção `api/`, reconhecida
  automaticamente, independe do framework de frontend)
- Chama a API do Claude (modelo Haiku por padrão — custo por conversa
  deve ficar baixo), com a chave guardada em variável de ambiente na
  Vercel, nunca exposta ao frontend
- Monta o prompt do sistema reaproveitando `domain/servicos.ts` — preço e
  serviço no prompt do atendente nunca podem divergir do que a página
  mostra, porque vêm da mesma fonte
- Sem banco de dados: histórico de conversa vive só no estado do
  componente Vue, no navegador do visitante (perdido ao fechar a aba —
  aceitável para um chat de FAQ simples)

### Deploy
- Vercel, projeto único, Root Directory `landing-page`
- Cada push na branch `main` dispara um novo deploy automático

## 5. Convenções obrigatórias

- **Tipagem estrita** em tudo (TypeScript `strict: true`; nada de `any` sem
  justificativa comentada).
- **Testes desde o primeiro recurso**, não depois:
  - Unitários para lógica de domínio/casos de uso, com dependências externas
    mockadas/stubadas.
  - Integração para os pontos de contrato crítico (ex: parsing do payload do
    webhook da Evolution API, chamada à API do Claude).
- **Erros tratados explicitamente**, nunca engolidos. Toda falha de integração
  externa (Claude API, Evolution API) precisa de um caminho de fallback
  definido — ver seção 7 de `docs/spec-negocio.md`.
- **Comentários** só para decisões não óbvias ou regras de negócio complexas,
  nunca para descrever o que o código já diz por si.
- **Custo zero como restrição de projeto**: qualquer serviço, biblioteca ou
  infraestrutura sugerida precisa ter um plano gratuito viável para este
  escopo. Sinalize explicitamente quando algo sair dessa restrição.

## 6. Estrutura de pastas (proposta inicial, ajustável)

```
legacy-barber/
├── CLAUDE.md
├── docs/
│   ├── spec-negocio.md
│   ├── spec-landing-page.md
│   ├── infra-chat-widget.md      # arquitetura atual (fonte ativa)
│   └── infra-backend.md          # histórico — decisão superada
├── landing-page/
│   ├── api/
│   │   └── chat.ts                # função serverless, chama a API do Claude
│   └── src/
│       ├── domain/
│       │   ├── servicos.ts
│       │   └── contato.ts
│       ├── components/
│       │   └── ChatWidget.vue
│       └── ...
└── whatsapp-assistant/             # sem uso ativo; possível Fase 2 futura
```

## 7. Estado atual do projeto

Fase 0 concluída (planejamento e specs). **Landing page publicada na
Vercel** — 5 seções + rodapé, sem header (decisão deliberada).

**Decisão de arquitetura revista:** o atendente de IA deixou de ser um bot
de WhatsApp e virou um chat widget embutido na própria landing page — ver
`docs/infra-chat-widget.md`. Em construção: `api/chat.ts` (função
serverless) e `components/ChatWidget.vue` (componente flutuante).