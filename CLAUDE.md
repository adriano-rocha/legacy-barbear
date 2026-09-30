# CLAUDE.md — Legacy Barber

Contexto persistente para qualquer sessão do Claude Code neste repositório.
Leia este arquivo por completo antes de propor ou alterar qualquer código.

## 1. O que é este projeto

Projeto didático (sem fins comerciais, sem orçamento) com dois componentes
independentes:

1. **`landing-page/`** — Landing page estática em Vue 3 + Vite para uma
   barbearia fictícia ("Legacy Barber"), hospedada gratuitamente no
   Cloudflare Pages. Objetivo único: converter clique em conversa de WhatsApp.
2. **`whatsapp-assistant/`** — Atendente de IA no WhatsApp via Evolution API
   (não oficial) + n8n (orquestração) + Claude API (raciocínio), rodando em
   uma VPS. Objetivo: responder dúvidas, informar preços/horários e coletar
   dados de pré-agendamento.

Esses dois componentes **não se comunicam entre si**. Isso é uma decisão de
arquitetura deliberada (responsabilidade única), não uma limitação a resolver.

As especificações de negócio completas estão em:
- `docs/spec-negocio.md` — regras do atendente de IA (faz/não faz, handoff, erros)
- `docs/spec-landing-page.md` — seções e direção visual da landing page

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

## 4. Stack por componente

### `landing-page/`
- Vue 3 (Composition API) + TypeScript estrito + Vite
- Build estático (`vite build`), sem SSR, sem backend próprio
- Deploy: Cloudflare Pages

### `whatsapp-assistant/`
- Evolution API (Docker) + PostgreSQL + Redis
- n8n como orquestrador de fluxo
- Claude API (modelo Haiku por padrão — custo por conversa deve ficar baixo)
- Infraestrutura: VPS + Docker Compose + proxy reverso com HTTPS

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
│   └── spec-landing-page.md
├── landing-page/
│   ├── src/
│   │   ├── domain/          # se houver lógica não trivial (ex: formatação de dados dos serviços)
│   │   ├── components/
│   │   └── ...
│   └── ...
└── whatsapp-assistant/
    ├── docs/                 # specs técnicas do fluxo n8n (Fase 5+)
    └── infra/                # docker-compose, configs
```

## 7. Estado atual do projeto

Fase 0 concluída (planejamento e specs). Próximo passo: implementação da
landing page (`landing-page/`) em paralelo ao início da Fase 1 (provisionamento
da VPS). Consulte o roteiro completo de fases fora deste repositório, no
histórico de planejamento do projeto.