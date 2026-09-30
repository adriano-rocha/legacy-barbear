# Especificação — Landing Page (Vue.js)

## 1. Objetivo único

Converter visitante em conversa no WhatsApp. Nenhum outro objetivo secundário
(sem formulário próprio, sem newsletter, sem blog). Isso mantém a página
desacoplada do backend, como já validamos na arquitetura.

## 2. Stack

- **Vue 3** (Composition API) + **Vite** como bundler/dev server
- **Build estático** (`vite build`) → deploy no Cloudflare Pages
- Sem framework CSS pesado — Tailwind é aceitável se você já tiver familiaridade,
  senão CSS puro com variáveis (`:root`) é suficiente para o escopo

## 3. Seções da página

| Seção | Conteúdo | Prioridade |
|---|---|---|
| **Hero** | Nome "Legacy Barber", frase de efeito curta, botão CTA "Agendar no WhatsApp" | Obrigatória |
| **Serviços** | Cards com os serviços da tabela da spec de negócio (nome, preço, duração) | Obrigatória |
| **Sobre** | 2-3 frases sobre a barbearia fictícia (tom, diferencial) | Obrigatória |
| **Localização/Horário** | Endereço fictício + horário de funcionamento | Obrigatória |
| **CTA final** | Repetição do botão do WhatsApp, para quem rolou a página toda | Obrigatória |
| **Rodapé** | Copyright + ano + link do Instagram (fictício). Minimalista de propósito — não deve competir visualmente com o CTA principal | Obrigatória |
| Galeria de fotos | — | Fora do escopo inicial (exigiria imagens reais ou stock, sem custo definido) |

## 4. O botão de contato

Link direto `https://wa.me/<numero>?text=<mensagem pré-preenchida>`, sem
formulário intermediário. Isso é o único "gancho" entre a página e o restante
do projeto — e mesmo assim é só um link estático, sem chamada de API.

## 5. Direção visual (proposta inicial)

- **Paleta:** tons escuros (preto/grafite) com um acento em dourado ou âmbar —
  visual clássico de barbearia, alto contraste, sóbrio.
- **Tipografia:** uma serifada ou slab-serif para títulos (transmite tradição),
  sans-serif para corpo de texto (legibilidade).
- **Layout:** single page, scroll único, mobile-first (a maioria vai acessar
  pelo link compartilhado no WhatsApp/Instagram, ou seja, no celular).

> Isso é uma proposta de partida, não uma decisão fechada — ajustamos quando
> chegarmos na implementação visual.

## 6. Fora de escopo (por ora)

- Modo escuro/claro alternável (a página já nasce no tom escuro)
- Internacionalização (só PT-BR)
- Analytics/tracking (sem necessidade para fins didáticos)