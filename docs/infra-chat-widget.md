# Infraestrutura do Atendente de IA — Chat Widget na Landing Page

## Decisão

O atendente de IA **não roda mais via WhatsApp**. Ele é um chat widget
flutuante embutido diretamente na landing page, respondendo ali mesmo.
Esta decisão substitui a arquitetura original de Fase 0 (Evolution API +
n8n + VPS/Render) — ver `docs/infra-backend.md` para o histórico de por
que essa abordagem foi abandonada.

**Motivação:** menor complexidade, zero infraestrutura dedicada, zero
sessão de WhatsApp para manter viva, e um canal de contato humano via
WhatsApp que já existia na página (os botões "Chamar no WhatsApp")
continua funcionando normalmente, sem nenhuma automação por trás dele.

## Arquitetura

```
Navegador (visitante)
      │
      ▼
ChatWidget.vue (componente flutuante, canto inferior direito)
      │  fetch('/api/chat')
      ▼
Vercel Serverless Function (landing-page/api/chat.ts)
      │  monta o prompt do sistema usando domain/servicos.ts
      │  chama a API do Claude (chave em variável de ambiente)
      ▼
Claude API ──► resposta ──► widget exibe na tela
```

Tudo roda dentro do mesmo projeto Vercel que já hospeda a landing page —
não existe mais um segundo lugar de deploy (`whatsapp-assistant/` fica
sem uso ativo; mantido no repositório como possível Fase 2 futura, não
apagado).

## Por que a função serverless fica em `landing-page/api/`, não em
`whatsapp-assistant/`

A pasta `api/` na raiz do projeto é uma convenção que a própria Vercel
reconhece automaticamente para qualquer projeto, independente do
framework de frontend — não precisa de Next.js nem configuração especial.
Colocar o backend do chat dentro de `landing-page/` reflete a realidade:
é um único projeto, um único deploy, uma única fonte de dados de domínio
compartilhada entre frontend e backend.

## Reaproveitamento de domínio

A função serverless importa `domain/servicos.ts` para montar a lista de
serviços/preços dentro do prompt do sistema — a mesma fonte de verdade que
o componente `Servicos.vue` usa para renderizar os cards na página. Preço
ou serviço errado no prompt do atendente deixa de ser um risco: ele nunca
pode divergir do que a página mostra, porque vêm do mesmo lugar.

## Handoff humano, sem automação

A regra de negócio (ver `docs/spec-negocio.md`, seção 5) continua valendo,
mas sua implementação mudou: quando o atendente de IA identifica um gatilho
de handoff (pedido explícito de atendente, reclamação, remarcação), ele
**não transfere tecnicamente nada** — apenas orienta o visitante a clicar no
botão "Chamar no WhatsApp" já presente na página, que leva a uma conversa
real, sem IA, com um humano.

## Proteções contra uso abusivo (substituem as proteções do n8n)

Como o widget é público e sem autenticação, substituímos as proteções que
seriam do n8n (rate limit, filtro de grupo) por:

- Limite de tamanho de mensagem (client-side e validado no backend)
- Limite de número de mensagens por sessão de chat
- `max_tokens` baixo na chamada à API do Claude (respostas curtas, como
  convém a um atendente de FAQ)

Essas proteções não impedem abuso técnico sofisticado (alguém chamando a
API diretamente, ignorando o frontend), mas cobrem o cenário realista de
uso indevido por um visitante comum ou bot simples.