<script setup>
import { ref, computed } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import QuantidadeControle from '../components/QuantidadeControle.vue'
import { linkWhatsApp } from '../data/empresa'
import {
  itensCarrinho,
  totalItens,
  alterarQuantidade,
  removerDoCarrinho,
  esvaziarCarrinho,
  mensagemOrcamento,
} from '../data/carrinho'

const nome = ref('')
const dataEvento = ref('')
const observacoes = ref('')
const confirmarEsvaziar = ref(false)

const linkOrcamento = computed(() =>
  linkWhatsApp(
    mensagemOrcamento({
      nome: nome.value.trim(),
      dataEvento: dataEvento.value,
      observacoes: observacoes.value.trim(),
    })
  )
)

function esvaziar() {
  esvaziarCarrinho()
  confirmarEsvaziar.value = false
}
</script>

<template>
  <div>
    <PageHeader titulo="Carrinho" subtitulo="Revise os itens e peça seu orçamento pelo WhatsApp" />

    <section class="secao">
      <div class="container">
        <div v-if="!itensCarrinho.length" class="vazio">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2 3h3l2.6 12.2a2 2 0 0 0 2 1.6h8.3a2 2 0 0 0 2-1.5L22 7H6" /></svg>
          <h2>Seu carrinho está vazio</h2>
          <p>Navegue pelas categorias e adicione os itens que deseja para o seu evento.</p>
          <RouterLink to="/#produtos" class="btn btn-royal">Ver produtos</RouterLink>
        </div>

        <div v-else class="grade">
          <div class="lista">
            <div class="lista-topo">
              <h2>{{ totalItens }} {{ totalItens === 1 ? 'item' : 'itens' }} no carrinho</h2>
              <div class="esvaziar">
                <template v-if="!confirmarEsvaziar">
                  <button type="button" class="link-perigo" @click="confirmarEsvaziar = true">Esvaziar carrinho</button>
                </template>
                <template v-else>
                  <span>Tem certeza?</span>
                  <button type="button" class="btn-mini perigo" @click="esvaziar">Sim, esvaziar</button>
                  <button type="button" class="btn-mini" @click="confirmarEsvaziar = false">Cancelar</button>
                </template>
              </div>
            </div>

            <TransitionGroup name="item" tag="ul" class="itens">
              <li v-for="item in itensCarrinho" :key="item.chave" class="item">
                <RouterLink :to="`/produtos/${item.slug}`" class="item-foto">
                  <img :src="item.imagem" :alt="item.titulo" />
                </RouterLink>
                <div class="item-info">
                  <span class="item-categoria">{{ item.categoriaNome }}</span>
                  <h3>{{ item.titulo }}</h3>
                </div>
                <div class="item-qtd">
                  <QuantidadeControle
                    :model-value="item.quantidade"
                    pequeno
                    @update:model-value="(q) => alterarQuantidade(item.slug, item.id, q)"
                  />
                </div>
                <button type="button" class="remover" :aria-label="`Remover ${item.titulo}`" title="Remover item" @click="removerDoCarrinho(item.slug, item.id)" >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v6M14 11v6" /></svg>
                  <span>Remover</span>
                </button>
              </li>
            </TransitionGroup>

            <RouterLink to="/#produtos" class="continuar">← Continuar adicionando itens</RouterLink>
          </div>

          <aside class="resumo">
            <h2>Pedir orçamento</h2>
            <p class="resumo-texto">
              Ao clicar no botão abaixo, a lista completa do seu carrinho será enviada para o nosso WhatsApp.
            </p>

            <label>
              <span>Seu nome <small>(opcional)</small></span>
              <input v-model="nome" type="text" placeholder="Como podemos te chamar?" />
            </label>
            <label>
              <span>Data do evento <small>(opcional)</small></span>
              <input v-model="dataEvento" type="date" />
            </label>
            <label>
              <span>Observações <small>(opcional)</small></span>
              <textarea v-model="observacoes" rows="3" placeholder="Endereço de entrega, horário, dúvidas..."></textarea>
            </label>

            <div class="total">
              <span>Total de itens</span>
              <strong>{{ totalItens }}</strong>
            </div>

            <a :href="linkOrcamento" target="_blank" rel="noopener" class="btn btn-ouro enviar">
              <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.004 3C8.832 3 3 8.83 3 16c0 2.29.6 4.53 1.74 6.5L3 29l6.68-1.71A12.96 12.96 0 0 0 16.004 29C23.17 29 29 23.17 29 16S23.17 3 16.004 3Zm0 23.64c-2 0-3.96-.54-5.67-1.56l-.41-.24-3.96 1.02 1.05-3.86-.27-.4A10.6 10.6 0 0 1 5.37 16c0-5.86 4.77-10.63 10.64-10.63 5.86 0 10.62 4.77 10.62 10.63 0 5.87-4.77 10.64-10.63 10.64Zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66 0 1.57 1.14 3.09 1.3 3.3.16.21 2.25 3.43 5.45 4.81.76.33 1.35.52 1.81.67.76.24 1.46.21 2.01.13.61-.09 1.89-.77 2.15-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z"/></svg>
              Pedir orçamento pelo WhatsApp
            </a>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.vazio {
  text-align: center;
  max-width: 460px;
  margin: 0 auto;
  padding: 30px 0;
  color: var(--cinza);
}

.vazio svg {
  color: var(--royal);
  margin: 0 auto 14px;
}

.vazio h2 {
  font-size: 1.5rem;
}

.vazio p {
  margin: 0 0 24px;
}

.grade {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 32px;
  align-items: start;
}

.lista-topo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 18px;
}

.lista-topo h2 {
  font-size: 1.3rem;
  margin: 0;
}

.esvaziar {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.88rem;
  font-weight: 600;
}

.link-perigo {
  border: 0;
  background: none;
  color: #c0392b;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 4px;
  text-decoration: underline;
}

.btn-mini {
  border: 1.5px solid var(--cinza);
  background: var(--branco);
  color: var(--tinta);
  font: inherit;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 999px;
  cursor: pointer;
}

.btn-mini.perigo {
  background: #c0392b;
  border-color: #c0392b;
  color: var(--branco);
}

.itens {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
}

.item {
  display: grid;
  grid-template-columns: 84px 1fr auto auto;
  align-items: center;
  gap: 18px;
  background: var(--branco);
  border-radius: var(--raio);
  padding: 12px 16px 12px 12px;
  box-shadow: var(--sombra);
  border-left: 4px solid var(--ouro);
}

.item-foto img {
  width: 84px;
  height: 84px;
  object-fit: cover;
  border-radius: 10px;
  background: var(--royal-50);
}

.item-categoria {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--cinza);
}

.item-info h3 {
  font-family: var(--fonte-texto);
  font-size: 1.02rem;
  font-weight: 600;
  margin: 2px 0 0;
}

.remover {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 0;
  background: none;
  color: #c0392b;
  font: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 10px;
  border-radius: 8px;
  transition: background 0.2s;
}

.remover:hover {
  background: #fdecea;
}

.continuar {
  display: inline-block;
  margin-top: 20px;
  color: var(--royal);
  font-weight: 600;
  text-decoration: none;
}

.continuar:hover {
  text-decoration: underline;
}

.resumo {
  position: sticky;
  top: calc(var(--altura-nav) + 20px);
  background: linear-gradient(150deg, var(--royal), var(--royal-700));
  color: var(--branco);
  border-radius: var(--raio);
  padding: 26px 24px;
  display: grid;
  gap: 14px;
  box-shadow: var(--sombra-forte);
}

.resumo h2 {
  color: var(--ouro);
  font-size: 1.35rem;
  margin: 0;
}

.resumo-texto {
  margin: 0;
  color: var(--gelo);
  font-size: 0.9rem;
}

.resumo label {
  display: grid;
  gap: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--gelo);
}

.resumo small {
  font-weight: 400;
  opacity: 0.75;
}

.resumo input,
.resumo textarea {
  font: inherit;
  font-weight: 400;
  color: var(--tinta);
  background: var(--branco);
  border: 2px solid transparent;
  border-radius: 10px;
  padding: 10px 12px;
  resize: vertical;
}

.resumo input:focus,
.resumo textarea:focus {
  outline: none;
  border-color: var(--ouro);
}

.total {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-top: 14px;
  border-top: 1px solid rgba(200, 216, 240, 0.3);
}

.total strong {
  font-family: var(--fonte-titulo);
  font-size: 1.6rem;
  color: var(--ouro);
}

.enviar svg {
  flex-shrink: 0;
}

.enviar {
  justify-content: center;
  width: 100%;
  font-size: 1rem;
  padding: 15px 20px;
}

.item-enter-active,
.item-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}

.item-enter-from,
.item-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

@media (max-width: 960px) {
  .grade {
    grid-template-columns: 1fr;
  }
  .resumo {
    position: static;
  }
}

@media (max-width: 600px) {
  .item {
    grid-template-columns: 64px auto 1fr;
    grid-template-areas:
      'foto info info'
      'foto qtd remover';
    gap: 8px 12px;
  }
  .item-foto {
    grid-area: foto;
    align-self: start;
  }
  .item-foto img {
    width: 64px;
    height: 64px;
  }
  .item-info {
    grid-area: info;
  }
  .item-qtd {
    grid-area: qtd;
  }
  .remover {
    grid-area: remover;
    justify-self: end;
  }
}
</style>
