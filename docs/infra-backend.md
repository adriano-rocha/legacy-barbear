# Infraestrutura do Backend — Decisão: Render (plano gratuito)

> ⚠️ **SUPERADO.** Esta decisão foi revista: o projeto não usa mais um
> atendente via WhatsApp (Evolution API/n8n/Render). Ver
> `docs/infra-chat-widget.md` para a arquitetura atual (chat widget embutido
> na landing page, via função serverless na Vercel). Este documento é
> mantido como registro histórico da decisão original, não como guia ativo.

## Contexto da decisão

A Fase 0 original previa uma VPS (Oracle Cloud Always Free) com Docker
Compose orquestrando Evolution API, Postgres, Redis e n8n juntos. Essa
abordagem foi abandonada por decisão consciente do autor do projeto:
estudante sem renda, avesso ao risco de cobrança inesperada, mesmo com
mitigação (cartão virtual de limite baixo) disponível.

**Trade-off aceito explicitamente:** o valor didático de aprender
provisionamento de VPS, SSH, hardening de Linux e proxy reverso com HTTPS
foi trocado por uma experiência de deploy mais simples (serviços
gerenciados), que remove essas etapas do aprendizado em troca de menor
fricção e risco financeiro zero.

## Arquitetura resultante

Em vez de um único host com Docker Compose, o backend vira um conjunto de
serviços gerenciados independentes no Render:

```
WhatsApp ──► Evolution API (Web Service) ──► n8n (Web Service) ──► Claude API
                    │                              │
                    ▼                              ▼
            Postgres (gerenciado)         Postgres (gerenciado, mesmo ou outro)
```

Cada serviço tem seu próprio ciclo de vida, deploy e logs — não existe mais
um host único onde `docker compose up` sobe tudo de uma vez.

## Limitações do plano gratuito do Render (confirmadas na documentação oficial)

| Limitação | Impacto direto no projeto |
|---|---|
| **Postgres gratuito expira 30 dias após criação**, com 14 dias de carência antes da exclusão definitiva | A sessão do WhatsApp do Evolution API, se guardada no Postgres, precisa ser **recriada (novo QR Code) periodicamente** — isso é rotina esperada, não bug |
| **Key Value (Redis) gratuito não persiste em disco** | Cache/estado do Redis zera a cada restart do serviço — o Evolution API precisa tolerar isso sem quebrar |
| **Web Services gratuitos "dormem" após 15 min de inatividade** | Primeira mensagem do WhatsApp após um período sem uso pode demorar mais para ser respondida (cold start) |
| **Sem rede privada entre serviços gratuitos** | Evolution API e n8n se comunicam pela URL pública um do outro, não por rede interna |
| **Sem acesso SSH/shell** | Debug acontece pelos logs do painel do Render, não por terminal |

## Rotina de manutenção necessária (diferente de uma VPS)

Isso substitui o que seria "a VPS simplesmente fica ligada":

1. **A cada ~30 dias:** renovar/recriar o banco Postgres gratuito antes que expire, e reconectar o WhatsApp via QR Code se a sessão se perder.
2. **Antes de cada sessão de teste:** acessar manualmente a URL de cada serviço para "acordá-lo", já que pode ter dormido por inatividade.
3. **Monitorar e-mails do Render** avisando sobre expiração do banco — não ignorar esses alertas.

## Quando migrar para uma VPS de verdade

Conforme já definido pelo autor do projeto: se o uso escalar além de fins
didáticos, a migração natural é para Oracle Cloud (ou outra VPS), retomando
o roteiro original de Fases 1-4 com Docker Compose. Esta decisão de usar
Render é deliberadamente temporária e de baixo compromisso.