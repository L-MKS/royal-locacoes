import { aplicarSeo } from '../data/seo.js'
import HomeView from '../views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/sobre', name: 'sobre', component: () => import('../views/SobreView.vue') },
  { path: '/produtos/:slug', name: 'categoria', component: () => import('../views/CategoriaView.vue'), props: true },
  { path: '/contrato', name: 'contrato', component: () => import('../views/ContratoView.vue') },
  { path: '/contato', name: 'contato', component: () => import('../views/ContatoView.vue') },
  { path: '/carrinho', name: 'carrinho', component: () => import('../views/CarrinhoView.vue') },
  { path: '/:pathMatch(.*)*', name: 'nao-encontrado', component: () => import('../views/NaoEncontradoView.vue') },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) {
      return new Promise((resolve) =>
        setTimeout(() => resolve({ el: to.hash, top: 90, behavior: 'smooth' }), to.path === from.path ? 0 : 320)
      )
    }
    return { top: 0 }
  },
})

router.afterEach((to) => aplicarSeo(to.path))

export default router
