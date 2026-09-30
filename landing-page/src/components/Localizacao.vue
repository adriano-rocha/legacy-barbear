<script setup lang="ts">
/**
 * Mesma justificativa de Sobre.vue: dado fixo, sem consulta programática
 * (ex: "está aberto agora?"), não justifica uma camada de domínio própria.
 * Se esse requisito aparecer no futuro, a refatoração parte daqui — não
 * antes.
 */
</script>

<template>
  <section id="localizacao" class="localizacao">
    <h2 class="localizacao__titulo">Onde estamos</h2>

    <div class="localizacao__info">
      <p class="localizacao__item">
        <strong>Endereço:</strong> Rua das Tesouras, 123 — Centro
      </p>
      <p class="localizacao__item">
        <strong>Horário:</strong> Terça a sábado, das 09h às 19h
      </p>
      <p class="localizacao__item localizacao__item--fechado">
        Fechado aos domingos e segundas-feiras
      </p>
    </div>
  </section>
</template>

<style scoped>
.localizacao {
  padding: 4rem 1.5rem;
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}

.localizacao__titulo {
  font-size: 1.75rem;
  margin: 0 0 1.5rem;
  color: var(--cor-titulo, #f5f5f5);
}

.localizacao__info {
  color: var(--cor-texto-secundario, #999);
  line-height: 1.8;
}

.localizacao__item {
  margin: 0 0 0.5rem;
}

.localizacao__item strong {
  color: var(--cor-titulo, #f5f5f5);
}

.localizacao__item--fechado {
  font-size: 0.9rem;
  opacity: 0.8;
}
</style>