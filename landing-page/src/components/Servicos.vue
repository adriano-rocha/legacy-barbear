<script setup lang="ts">
/**
 * Componente puramente de apresentação: não conhece regra de negócio,
 * só itera sobre os dados que `domain/servicos.ts` já expõe prontos.
 * Se amanhã o catálogo mudar (novo serviço, preço, duração), este
 * arquivo não muda uma linha — só `domain/servicos.ts` muda.
 */
import { SERVICOS, formatarPreco } from '../domain/servicos';
</script>

<template>
  <section id="servicos" class="servicos">
    <h2 class="servicos__titulo">Nossos serviços</h2>

    <ul class="servicos__lista">
      <li
        v-for="servico in SERVICOS"
        :key="servico.id"
        class="servicos__item"
        :class="{ 'servicos__item--destaque': servico.destaque }"
      >
        <h3 class="servicos__nome">{{ servico.nome }}</h3>
        <p class="servicos__detalhe">
          <span class="servicos__duracao">{{ servico.duracaoMinutos }} min</span>
          <span class="servicos__preco">{{ formatarPreco(servico.precoEmCentavos) }}</span>
        </p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.servicos {
  padding: 4rem 1.5rem;
}

.servicos__titulo {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2.5rem;
}

.servicos__lista {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
  max-width: 960px;
  margin: 0 auto;
  padding: 0;
}

.servicos__item {
  border: 1px solid var(--cor-borda, #2a2a2a);
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.servicos__item--destaque {
  border-color: var(--cor-destaque, #c9a24b);
}

.servicos__nome {
  font-size: 1.1rem;
  margin: 0 0 0.75rem;
}

.servicos__detalhe {
  display: flex;
  justify-content: space-between;
  margin: 0;
  font-size: 0.95rem;
  color: var(--cor-texto-secundario, #999);
}

.servicos__preco {
  font-weight: 700;
  color: var(--cor-destaque, #c9a24b);
}
</style>