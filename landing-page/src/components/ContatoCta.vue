<script setup lang="ts">
/**
 * Reaproveita a mesma função de domínio que o Hero usa. Isso não é
 * duplicação de lógica — é o comportamento esperado de uma função pura:
 * cada consumidor chama e recebe o mesmo resultado, sem precisar
 * conhecer o outro. Se o link mudasse por prop/contexto compartilhado,
 * aí sim estaríamos acoplando os dois componentes desnecessariamente.
 */
import { montarLinkWhatsapp } from '../domain/contato';

const linkWhatsapp = montarLinkWhatsapp();
</script>

<template>
  <section class="contato-cta">
    <h2 class="contato-cta__titulo">Pronto para o próximo corte?</h2>
    <p class="contato-cta__texto">
      Fale com a gente agora mesmo e garanta seu horário.
    </p>
    <a :href="linkWhatsapp" target="_blank" rel="noopener noreferrer" class="contato-cta__botao">
      Chamar no WhatsApp
    </a>
  </section>
</template>

<style scoped>
.contato-cta {
  padding: 4rem 1.5rem;
  text-align: center;
  background-color: var(--cor-fundo-cta, #1a1a1a);
}

.contato-cta__titulo {
  font-size: 1.75rem;
  margin: 0 0 0.75rem;
  color: var(--cor-titulo, #f5f5f5);
}

.contato-cta__texto {
  color: var(--cor-texto-secundario, #999);
  margin: 0 0 1.75rem;
}

.contato-cta__botao {
  display: inline-block;
  padding: 0.9rem 2rem;
  border-radius: 0.4rem;
  background-color: var(--cor-destaque, #c9a24b);
  color: #111;
  font-weight: 700;
  text-decoration: none;
}
</style>