<script setup lang="ts">
import { INSTAGRAM_URL } from '../domain/contato';

/**
 * new Date().getFullYear() roda uma única vez, na montagem do componente —
 * suficiente aqui, já que ninguém mantém a aba aberta atravessando a
 * virada do ano esperando o rodapé atualizar sozinho. Se precisássemos
 * de um relógio ao vivo em algum lugar da página, aí sim justificaria
 * reatividade (ref/computed com um interval).
 */
const anoAtual = new Date().getFullYear();
</script>

<template>
  <footer class="rodape">
    <p class="rodape__texto">
      © {{ anoAtual }} Legacy Barber ·
      <a :href="INSTAGRAM_URL" target="_blank" rel="noopener noreferrer" class="rodape__link">
        Instagram
      </a>
    </p>
  </footer>
</template>

<style scoped>
.rodape {
  padding: 1.5rem;
  text-align: center;
  border-top: 1px solid var(--cor-borda, #2a2a2a);
}

.rodape__texto {
  margin: 0;
  font-size: 0.85rem;
  color: var(--cor-texto-secundario, #999);
}

.rodape__link {
  color: var(--cor-destaque, #c9a24b);
  text-decoration: none;
}

.rodape__link:hover {
  text-decoration: underline;
}
</style>