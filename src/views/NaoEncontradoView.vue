<template>
  <section class="secao container vazio">
    <h1>Página não encontrada</h1>
    <p>O endereço que você acessou não existe.</p>
    <RouterLink to="/" class="btn btn-royal">Voltar para a Home</RouterLink>
  </section>
</template>

<style scoped>
.vazio {
  text-align: center;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
