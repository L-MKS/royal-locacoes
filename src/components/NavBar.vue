<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { categorias } from '../data/categorias'
import logoIcone from '../assets/logo/logo-icone.png'
import { totalItens } from '../data/carrinho'

const route = useRoute()
const menuAberto = ref(false)
const produtosAberto = ref(false)
const dropdown = ref(null)
const pulando = ref(false)

watch(totalItens, (novo, antigo) => {
  if (novo > antigo) {
    pulando.value = false
    requestAnimationFrame(() => (pulando.value = true))
  }
})

watch(
  () => route.fullPath,
  () => {
    menuAberto.value = false
    produtosAberto.value = false
  }
)

function cliqueFora(e) {
  if (dropdown.value && !dropdown.value.contains(e.target)) produtosAberto.value = false
}
function esc(e) {
  if (e.key === 'Escape') {
    produtosAberto.value = false
    menuAberto.value = false
  }
}
onMounted(() => {
  document.addEventListener('click', cliqueFora)
  document.addEventListener('keydown', esc)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', cliqueFora)
  document.removeEventListener('keydown', esc)
})
</script>

<template>
  <header class="nav">
    <div class="container nav-interno">
      <RouterLink to="/" class="marca" aria-label="Royal Locações - página inicial">
        <img :src="logoIcone" alt="" class="marca-icone" />
        <span class="marca-texto">
          <strong>Royal Locações</strong>
          <small class="script">Soluções para o seu evento</small>
        </span>
      </RouterLink>


      <nav class="links" :class="{ aberto: menuAberto }">
        <RouterLink to="/" class="link" exact-active-class="ativo">Home</RouterLink>
        <RouterLink to="/sobre" class="link" active-class="ativo">Sobre</RouterLink>

        <div
          ref="dropdown"
          class="dropdown"
          :class="{ aberto: produtosAberto, ativo: route.name === 'categoria' }"
        >
          <button
            class="link link-botao"
            :aria-expanded="produtosAberto"
            aria-haspopup="true"
            @click.stop="produtosAberto = !produtosAberto"
          >
            Produtos
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="m6 9 6 6 6-6" /></svg>
          </button>
          <div class="dropdown-menu" role="menu">
            <RouterLink
              v-for="c in categorias"
              :key="c.slug"
              :to="`/produtos/${c.slug}`"
              class="dropdown-item"
              active-class="ativo"
              role="menuitem"
            >
              {{ c.nome }}
            </RouterLink>
          </div>
        </div>

        <RouterLink to="/contrato" class="link" active-class="ativo">Contrato</RouterLink>
        <RouterLink to="/contato" class="link" active-class="ativo">Contato</RouterLink>
      </nav>

      <div class="acoes-nav">
        <RouterLink
          to="/carrinho"
          class="carrinho"
          :class="{ pulando }"
          active-class="ativo"
          :aria-label="`Carrinho com ${totalItens} itens`"
          title="Ver carrinho"
          @animationend="pulando = false"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2 3h3l2.6 12.2a2 2 0 0 0 2 1.6h8.3a2 2 0 0 0 2-1.5L22 7H6" /></svg>
          <span v-if="totalItens" class="contador">{{ totalItens > 99 ? '99+' : totalItens }}</span>
        </RouterLink>

      <button
        class="hamburguer"
        :class="{ aberto: menuAberto }"
        :aria-expanded="menuAberto"
        aria-label="Abrir menu"
        @click="menuAberto = !menuAberto"
      >
        <span></span><span></span><span></span>
      </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--royal);
  color: var(--branco);
  box-shadow: 0 4px 20px rgba(1, 6, 63, 0.35);
  border-bottom: 3px solid var(--ouro);
}

.nav-interno {
  height: var(--altura-nav);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.marca {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.marca-icone {
  width: 52px;
  height: 52px;
  border-radius: 50%;
}

.marca-texto {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.marca-texto strong {
  font-family: var(--fonte-titulo);
  font-size: 1.25rem;
  letter-spacing: 0.04em;
}

.marca-texto small {
  font-size: 1.05rem;
  color: var(--gelo);
}

.links {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
}

.link {
  position: relative;
  padding: 10px 16px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.92rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--branco);
  border-radius: 8px;
  transition: color 0.2s, background 0.2s;
}

.link::after {
  content: '';
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 4px;
  height: 2px;
  background: var(--ouro);
  transform: scaleX(0);
  transition: transform 0.25s;
}

.link:hover,
.link.ativo,
.dropdown.ativo > .link-botao {
  color: var(--ouro);
}

.link:hover::after,
.link.ativo::after,
.dropdown.ativo > .link-botao::after {
  transform: scaleX(1);
}

.link-botao {
  background: none;
  border: 0;
  font-family: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.link-botao svg {
  transition: transform 0.2s;
}

.dropdown {
  position: relative;
}

.dropdown.aberto .link-botao svg {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translate(-50%, 8px);
  width: 460px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  padding: 12px;
  background: var(--branco);
  border-radius: var(--raio);
  box-shadow: var(--sombra-forte);
  border-top: 3px solid var(--ouro);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, transform 0.2s, visibility 0.2s;
}

.dropdown.aberto .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, 0);
}

@media (hover: hover) and (min-width: 901px) {
  .dropdown:hover .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, 0);
  }
  .dropdown::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    height: 14px;
  }
}

.dropdown-item {
  padding: 10px 14px;
  border-radius: 8px;
  text-decoration: none;
  color: var(--tinta);
  font-size: 0.92rem;
  font-weight: 500;
  transition: background 0.15s, color 0.15s;
}

.dropdown-item:hover,
.dropdown-item.ativo {
  background: var(--royal-50);
  color: var(--royal);
}

.acoes-nav {
  display: flex;
  align-items: center;
  gap: 6px;
}

.carrinho {
  position: relative;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  color: var(--branco);
  transition: background 0.2s, color 0.2s;
}

.carrinho:hover,
.carrinho.ativo {
  background: rgba(255, 255, 255, 0.12);
  color: var(--ouro);
}

.carrinho.pulando {
  animation: pular 0.5s ease;
}

.contador {
  position: absolute;
  top: 2px;
  right: 0;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  border-radius: 999px;
  background: var(--ouro);
  color: var(--royal-900);
  font-size: 0.75rem;
  font-weight: 800;
  display: grid;
  place-items: center;
  border: 2px solid var(--royal);
}

@keyframes pular {
  0%, 100% { transform: scale(1); }
  40% { transform: scale(1.25) rotate(-8deg); }
  70% { transform: scale(0.95); }
}

.hamburguer {
  display: none;
  width: 44px;
  height: 44px;
  border: 0;
  background: transparent;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  padding: 10px;
}

.hamburguer span {
  height: 2px;
  background: var(--branco);
  border-radius: 2px;
  transition: transform 0.25s, opacity 0.25s;
}

.hamburguer.aberto span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}
.hamburguer.aberto span:nth-child(2) {
  opacity: 0;
}
.hamburguer.aberto span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

@media (max-width: 900px) {
  .hamburguer {
    display: flex;
  }

  .links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 8px 16px 18px;
    background: var(--royal-700);
    max-height: calc(100vh - var(--altura-nav));
    overflow-y: auto;
    display: none;
  }

  .links.aberto {
    display: flex;
  }

  .link {
    padding: 14px 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .link::after {
    display: none;
  }

  .link-botao {
    width: 100%;
    justify-content: space-between;
  }

  .dropdown-menu {
    position: static;
    width: auto;
    transform: none;
    grid-template-columns: 1fr;
    display: none;
    opacity: 1;
    visibility: visible;
    background: rgba(255, 255, 255, 0.06);
    box-shadow: none;
    border-top: 0;
    margin: 4px 0 8px;
  }

  .dropdown.aberto .dropdown-menu {
    display: grid;
    transform: none;
  }

  .dropdown-item {
    color: var(--branco);
  }

  .dropdown-item:hover,
  .dropdown-item.ativo {
    background: rgba(250, 160, 12, 0.15);
    color: var(--ouro);
  }
}

@media (max-width: 420px) {
  .marca-texto small {
    display: none;
  }
  .marca-icone {
    width: 44px;
    height: 44px;
  }
}
</style>
