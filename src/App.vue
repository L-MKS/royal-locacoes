<script setup>
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/SiteFooter.vue'
import WhatsAppButton from './components/WhatsAppButton.vue'
import CarrinhoAviso from './components/CarrinhoAviso.vue'
</script>

<template>
  <NavBar />
  <main class="conteudo">
    <RouterView v-slot="{ Component, route }">
      <Transition name="pagina" mode="out-in">
        <component :is="Component" :key="route.fullPath" />
      </Transition>
    </RouterView>
  </main>
  <SiteFooter />
  <WhatsAppButton />
  <CarrinhoAviso />
</template>

<style scoped>
.conteudo {
  min-height: calc(100vh - var(--altura-nav));
}
</style>
