<script setup lang="ts">
/**
 * App.vue tem uma única responsabilidade: orquestrar a ordem das seções.
 * Nenhuma lógica de negócio ou apresentação vive aqui — cada seção já é
 * um componente autocontido. Isso mantém o arquivo estável: adicionar,
 * remover ou reordenar uma seção é uma mudança de uma linha, não um
 * mergulho em lógica espalhada.
 */
import Hero from './components/Hero.vue';
import Servicos from './components/Servicos.vue';
import Sobre from './components/Sobre.vue';
import Localizacao from './components/Localizacao.vue';
import ContatoCta from './components/ContatoCta.vue';
import Rodape from './components/Rodape.vue';
</script>

<template>
  <main>
    <Hero />
    <Servicos />
    <Sobre />
    <Localizacao />
    <ContatoCta />
  </main>
  <Rodape />
</template>