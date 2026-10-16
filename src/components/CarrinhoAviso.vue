<script setup>
import { useRoute } from 'vue-router'
import { avisoCarrinho } from '../data/carrinho'

const route = useRoute()
</script>

<template>
  <Transition name="aviso">
    <div v-if="avisoCarrinho && route.name !== 'carrinho'" class="aviso" role="status">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
      <span>{{ avisoCarrinho }}</span>
      <RouterLink to="/carrinho">Ver carrinho</RouterLink>
    </div>
  </Transition>
</template>

<style scoped>
.aviso {
  position: fixed;
  top: calc(var(--altura-nav) + 16px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 150;
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: calc(100vw - 32px);
  padding: 12px 14px 12px 18px;
  background: var(--royal-900);
  color: var(--branco);
  border-radius: 999px;
  border: 2px solid var(--ouro);
  box-shadow: var(--sombra-forte);
  font-size: 0.92rem;
  font-weight: 500;
}

svg {
  color: var(--ouro);
  flex-shrink: 0;
}

span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

a {
  flex-shrink: 0;
  background: var(--ouro);
  color: var(--royal-900);
  font-weight: 700;
  text-decoration: none;
  padding: 6px 14px;
  border-radius: 999px;
}

a:hover {
  background: #ffb02e;
}

.aviso-enter-active,
.aviso-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}

.aviso-enter-from,
.aviso-leave-to {
  opacity: 0;
  transform: translate(-50%, -12px);
}
</style>
