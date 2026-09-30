<script setup lang="ts">
/**
 * Assim como Servicos.vue, este componente não decide nada sobre o link
 * de contato — só pede a URL pronta para o domínio e a usa. Se a regra de
 * montagem do link mudar (ex: mensagem diferente, novo número), este
 * arquivo continua igual.
 */
import { montarLinkWhatsapp } from '../domain/contato';

const linkWhatsapp = montarLinkWhatsapp();
</script>

<template>
  <section class="hero">
    <div class="hero__conteudo">
      <h1 class="hero__titulo">Legacy Barber</h1>
      <p class="hero__tagline">Tradição e precisão em cada corte.</p>

      <a :href="linkWhatsapp" target="_blank" rel="noopener noreferrer" class="hero__cta">
        Agendar no WhatsApp
      </a>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 1.5rem;
  background-color: var(--cor-fundo-hero, #111);
  overflow: hidden;
}

/*
 * A imagem de fundo vive num pseudo-elemento separado do conteúdo,
 * não como filter: blur() direto em .hero. Se o blur fosse aplicado
 * na seção inteira, o texto e o botão ficariam borrados junto — o
 * que destruiria a legibilidade, o oposto do objetivo aqui.
 *
 * transform: scale(1.1) empurra as bordas borradas da imagem para
 * fora da área visível: blur() suaviza também as extremidades do
 * elemento, criando uma faixa nítida e desalinhada na borda se a
 * imagem não for levemente ampliada para compensar.
 */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/images/barbearia.jpg');
  background-size: cover;
  background-position: center;
  filter: blur(6px) brightness(0.45);
  transform: scale(1.1);
  z-index: 0;
}

.hero__conteudo {
  position: relative;
  z-index: 1;
}

.hero__titulo {
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin: 0 0 1rem;
  color: var(--cor-titulo, #f5f5f5);
}

.hero__tagline {
  font-size: 1.15rem;
  color: var(--cor-texto-secundario, #999);
  margin: 0 0 2rem;
}

.hero__cta {
  display: inline-block;
  padding: 0.9rem 2rem;
  border-radius: 0.4rem;
  background-color: var(--cor-destaque, #c9a24b);
  color: #111;
  font-weight: 700;
  text-decoration: none;
}
</style>