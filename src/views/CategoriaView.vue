<script setup>
import { linkWhatsApp } from '../data/empresa'
import PageHeader from '../components/PageHeader.vue'
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { categorias, getCategoria, getProdutos } from '../data/categorias'
import QuantidadeControle from '../components/QuantidadeControle.vue'
import { adicionarAoCarrinho, quantidadeNoCarrinho, alterarQuantidade } from '../data/carrinho'

const props = defineProps({ slug: { type: String, required: true } })
const categoria = computed(() => getCategoria(props.slug))
const produtos = computed(() => getProdutos(props.slug))
const outras = computed(() => categorias.filter((c) => c.slug !== props.slug))
const selecionado = ref(null)

function abrir(p) {
  selecionado.value = p
}

function fechar() {
  selecionado.value = null
}

function teclado(e) {
  if (!selecionado.value) return
  if (e.key === 'Escape') fechar()
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    const lista = produtos.value
    const i = lista.indexOf(selecionado.value)
    const passo = e.key === 'ArrowRight' ? 1 : -1
    selecionado.value = lista[(i + passo + lista.length) % lista.length]
  }
}
onMounted(() => document.addEventListener('keydown', teclado))
onBeforeUnmount(() => document.removeEventListener('keydown', teclado))

function adicionar(p) {
  adicionarAoCarrinho(props.slug, p)
}

function quantidade(p) {
  return quantidadeNoCarrinho(props.slug, p.id)
}

function mudarQuantidade(p, q) {
  alterarQuantidade(props.slug, p.id, q)
}

function mensagem(p) {
  return `Olá! Vi no site e gostaria de saber mais sobre: ${categoria.value.nome}${p && !p.provisorio ? ` - ${p.titulo}` : ''}`
}
</script>

<template>
  <div v-if="categoria">
    <PageHeader :titulo="categoria.titulo || categoria.nome" :subtitulo="categoria.descricao">
      <template #antes>
        <nav class="trilha" aria-label="Você está em">
          <RouterLink to="/">Home</RouterLink>
          <span>/</span>
          <RouterLink to="/#produtos">Produtos</RouterLink>
          <span>/</span>
          <strong>{{ categoria.nome }}</strong>
        </nav>
      </template>
    </PageHeader>

    <section class="secao">
      <div class="container">
        <p v-if="categoria.texto" class="intro">{{ categoria.texto }}</p>

        <div v-if="!produtos.length" class="em-breve surgir">
          <div class="em-breve-icone" aria-hidden="true">
            <span class="brilho b1">✦</span>
            <span class="brilho b2">✦</span>
            <span class="brilho b3">✦</span>
            <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="8" width="17" height="4" rx="1" /><path d="M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8M12 8v13M12 8c-1.5-3-5-3.5-5-1.2C7 8 10 8 12 8Zm0 0c1.5-3 5-3.5 5-1.2C17 8 14 8 12 8Z" /></svg>
          </div>
          <span class="script em-breve-script">Novidades a caminho</span>
          <h2>Estamos preparando algo especial para você</h2>
          <p>
            Ainda não temos itens de <strong>{{ categoria.nome }}</strong> disponíveis no site, mas estamos organizando
            tudo com muito carinho para trazer novidades em breve.
          </p>
          <p class="em-breve-sub">Enquanto isso, fale com a gente: podemos ajudar a encontrar o que você precisa para o seu evento.</p>
          <div class="em-breve-acoes">
            <a
              :href="linkWhatsApp(`Olá! Tenho interesse em ${categoria.nome}. Podem me avisar quando tiverem novidades?`)"
              target="_blank"
              rel="noopener"
              class="btn btn-ouro"
            >
              Quero ser avisado pelo WhatsApp
            </a>
            <RouterLink to="/#produtos" class="btn btn-royal">Ver outras categorias</RouterLink>
          </div>
        </div>

        <div v-else class="grade-cards">
          <article v-for="(p, i) in produtos" :key="p.id" class="produto surgir" :class="{ 'no-carrinho': quantidade(p) }" :style="{ animationDelay: `${Math.min(i, 12) * 0.04}s` }">
            <button type="button" class="foto" :aria-label="`Ampliar ${p.titulo}`" @click="abrir(p)">
              <img :src="p.imagem" :alt="`${p.titulo} - ${categoria.titulo || categoria.nome} em Curitiba`" loading="lazy" />
              <span class="lupa" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5M11 8v6M8 11h6" /></svg>
              </span>
              <span v-if="quantidade(p)" class="selo">{{ quantidade(p) }} no carrinho</span>
            </button>
            <div class="info">
              <h3>{{ p.titulo }}</h3>
              <button v-if="!quantidade(p)" type="button" class="btn-add" @click="adicionar(p)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2 3h3l2.6 12.2a2 2 0 0 0 2 1.6h8.3a2 2 0 0 0 2-1.5L22 7H6" /></svg>
                Adicionar
              </button>
              <QuantidadeControle v-else pequeno :model-value="quantidade(p)" @update:model-value="(q) => mudarQuantidade(p, q)" />
            </div>
          </article>
        </div>

        <div v-if="produtos.length" class="cta-whats">
          <a :href="linkWhatsApp(mensagem())" target="_blank" rel="noopener" class="btn btn-royal">
            Consultar disponibilidade de {{ categoria.nome }}
          </a>
        </div>
      </div>
    </section>

    <section class="outras">
      <div class="container">
        <h2>Outras categorias</h2>
        <div class="chips">
          <RouterLink v-for="c in outras" :key="c.slug" :to="`/produtos/${c.slug}`" class="chip">{{ c.nome }}</RouterLink>
        </div>
      </div>
    </section>

    <Transition name="modal">
      <div v-if="selecionado" class="modal" role="dialog" aria-modal="true" @click.self="fechar">
        <div class="modal-caixa">
          <button class="fechar" aria-label="Fechar" @click="fechar">×</button>
          <img :src="selecionado.imagem" :alt="selecionado.titulo" />
          <div class="modal-info">
            <h3>{{ selecionado.titulo }}</h3>
            <div class="modal-acoes">
              <button v-if="!quantidade(selecionado)" type="button" class="btn btn-ouro" @click="adicionar(selecionado)">
                Adicionar ao carrinho
              </button>
              <template v-else>
                <QuantidadeControle :model-value="quantidade(selecionado)" @update:model-value="(q) => mudarQuantidade(selecionado, q)" />
                <RouterLink to="/carrinho" class="btn btn-ouro">Ver carrinho</RouterLink>
              </template>
              <a :href="linkWhatsApp(mensagem(selecionado))" target="_blank" rel="noopener" class="btn btn-royal">
                Consultar pelo WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>

  <div v-else class="secao container nao-encontrada">
    <h1>Categoria não encontrada</h1>
    <RouterLink to="/" class="btn btn-royal">Voltar para a Home</RouterLink>
  </div>
</template>

<style scoped>
.trilha {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.85rem;
  margin-bottom: 14px;
  color: var(--gelo);
}

.trilha a {
  text-decoration: none;
}

.trilha a:hover {
  color: var(--ouro);
}

.trilha strong {
  color: var(--ouro);
  font-weight: 600;
}

.intro {
  max-width: 820px;
  margin: -12px auto 36px;
  text-align: center;
  color: var(--cinza);
  font-size: 1rem;
  line-height: 1.7;
}

.em-breve {
  position: relative;
  max-width: 760px;
  margin: 0 auto;
  padding: 56px 40px 48px;
  text-align: center;
  border-radius: 24px;
  background: radial-gradient(circle at 50% 0%, rgba(200, 216, 240, 0.18), transparent 55%),
    linear-gradient(150deg, var(--royal), var(--royal-900));
  color: var(--branco);
  box-shadow: var(--sombra-forte);
  overflow: hidden;
}

.em-breve::before,
.em-breve::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  border: 2px solid rgba(200, 216, 240, 0.15);
  pointer-events: none;
}

.em-breve::before {
  width: 320px;
  height: 320px;
  top: -170px;
  left: -110px;
}

.em-breve::after {
  width: 260px;
  height: 260px;
  bottom: -150px;
  right: -90px;
}

.em-breve-icone {
  position: relative;
  width: 132px;
  height: 132px;
  margin: 0 auto 18px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: var(--ouro);
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 0 0 10px rgba(200, 216, 240, 0.08), 0 0 0 22px rgba(200, 216, 240, 0.04);
  animation: flutuar 3.6s ease-in-out infinite;
}

.brilho {
  position: absolute;
  color: var(--ouro);
  animation: piscar 2.4s ease-in-out infinite;
}

.b1 {
  top: 6px;
  left: -6px;
  font-size: 1.3rem;
}

.b2 {
  top: -8px;
  right: 4px;
  font-size: 0.95rem;
  animation-delay: 0.8s;
}

.b3 {
  bottom: 4px;
  right: -10px;
  font-size: 1.1rem;
  animation-delay: 1.6s;
}

.em-breve-script {
  display: block;
  font-size: 2rem;
  color: var(--ouro);
  margin-bottom: 4px;
}

.em-breve h2 {
  color: var(--branco);
  font-size: clamp(1.4rem, 3vw, 2rem);
  margin-bottom: 16px;
}

.em-breve p {
  color: var(--gelo);
  max-width: 560px;
  margin: 0 auto 12px;
  font-size: 1.02rem;
}

.em-breve p strong {
  color: var(--branco);
}

.em-breve-sub {
  font-size: 0.92rem !important;
  opacity: 0.85;
}

.em-breve-acoes {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 26px;
}

.em-breve-acoes .btn-royal {
  background: transparent;
  border-color: rgba(255, 255, 255, 0.7);
}

.em-breve-acoes .btn-royal:hover {
  background: var(--branco);
  color: var(--royal);
}

@keyframes flutuar {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes piscar {
  0%, 100% { opacity: 0.25; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.1); }
}

@media (max-width: 600px) {
  .em-breve {
    padding: 44px 20px 36px;
    border-radius: 18px;
  }
  .em-breve-acoes .btn {
    width: 100%;
    justify-content: center;
  }
}

.produto {
  display: flex;
  flex-direction: column;
  background: var(--branco);
  border-radius: var(--raio);
  overflow: hidden;
  box-shadow: var(--sombra);
  border: 1px solid rgba(3, 16, 147, 0.06);
  transition: transform 0.25s, box-shadow 0.25s;
}

.produto:hover {
  transform: translateY(-6px);
  box-shadow: var(--sombra-forte);
}

.produto.no-carrinho {
  border-color: var(--ouro);
}

.foto {
  all: unset;
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: var(--royal-50);
}

.foto img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.produto:hover .foto img {
  transform: scale(1.07);
}

.lupa {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(3, 16, 147, 0.45);
  color: var(--branco);
  opacity: 0;
  transition: opacity 0.25s;
}

.produto:hover .lupa {
  opacity: 1;
}

.foto:focus-visible {
  outline: 3px solid var(--ouro);
  outline-offset: -3px;
}

.selo {
  position: absolute;
  top: 10px;
  left: 10px;
  background: var(--ouro);
  color: var(--royal-900);
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 999px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.btn-add {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 9px 12px;
  border: 2px solid var(--royal);
  border-radius: 999px;
  background: var(--branco);
  color: var(--royal);
  font: inherit;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.btn-add:hover {
  background: var(--royal);
  color: var(--branco);
}

.info {
  padding: 14px 16px 16px;
  border-top: 3px solid var(--ouro);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.info h3 {
  align-self: stretch;
  font-family: var(--fonte-texto);
  font-weight: 600;
  font-size: 1rem;
  margin: 0;
  flex: 1;
  color: var(--royal-900);
}

.cta-whats {
  text-align: center;
  margin-top: 44px;
}

.outras {
  background: var(--branco);
  padding: 48px 0 56px;
  text-align: center;
}

.outras h2 {
  font-size: 1.4rem;
  margin-bottom: 20px;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.chip {
  padding: 9px 18px;
  border-radius: 999px;
  border: 1.5px solid var(--royal);
  color: var(--royal);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.88rem;
  transition: background 0.2s, color 0.2s;
}

.chip:hover {
  background: var(--royal);
  color: var(--branco);
}

.modal {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(1, 6, 63, 0.82);
  display: grid;
  place-items: center;
  padding: 20px;
}

.modal-caixa {
  position: relative;
  background: var(--branco);
  border-radius: var(--raio);
  overflow: hidden;
  max-width: 820px;
  width: 100%;
  max-height: 92vh;
  display: flex;
  flex-direction: column;
}

.modal-caixa img {
  width: 100%;
  max-height: 70vh;
  object-fit: contain;
  background: var(--royal-50);
}

.modal-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 22px;
  flex-wrap: wrap;
  border-top: 3px solid var(--ouro);
}

.modal-info h3 {
  margin: 0;
}

.modal-acoes {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.fechar {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 0;
  background: var(--royal);
  color: var(--branco);
  font-size: 1.6rem;
  line-height: 1;
  cursor: pointer;
}

.fechar:hover {
  background: var(--ouro);
  color: var(--royal-900);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.nao-encontrada {
  text-align: center;
}

@media (max-width: 600px) {
  .grade-cards {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
  .info {
    padding: 10px 10px 12px;
    gap: 10px;
  }
  .btn-add {
    padding: 8px 10px;
    font-size: 0.82rem;
  }
  .info h3 {
    font-size: 0.88rem;
  }
}
</style>
