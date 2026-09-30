<script setup lang="ts">
/**
 * Sem lógica, sem import de domínio: conteúdo institucional fixo.
 * Criar uma camada de dados para um texto que não muda seria
 * abstração sem propósito (YAGNI) — o custo de manutenção de uma
 * indireção só se paga quando ela resolve um problema real.
 */
</script>

<template>
  <section id="sobre" class="sobre">
    <h2 class="sobre__titulo">Sobre a Legacy Barber</h2>
    <p class="sobre__texto">
      Há anos cuidando do visual de quem não abre mão de um corte bem-feito.
      Ambiente descontraído, atendimento atencioso e a precisão de quem
      aprendeu o ofício na prática.
    </p>
  </section>
</template>

<style scoped>
.sobre {
  padding: 4rem 1.5rem;
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}

.sobre__titulo {
  font-size: 1.75rem;
  margin: 0 0 1rem;
  color: var(--cor-titulo, #f5f5f5);
}

.sobre__texto {
  color: var(--cor-texto-secundario, #999);
  line-height: 1.6;
  margin: 0;
}
</style>