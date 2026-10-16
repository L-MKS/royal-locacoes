import { reactive, computed, watch } from 'vue'
import { getCategoriaQualquer as getCategoria, getProdutos, imagemPadrao } from './categorias'

const CHAVE = 'royal-carrinho'

function carregar() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE) || '[]')
    return Array.isArray(salvo) ? salvo : []
  } catch {
    return []
  }
}

const estado = reactive({
  itens: carregar(),
  aviso: null,
})

watch(
  () => estado.itens,
  (itens) => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(itens))
    } catch {}
  },
  { deep: true }
)

let timerAviso = null
function mostrarAviso(texto) {
  estado.aviso = texto
  clearTimeout(timerAviso)
  timerAviso = setTimeout(() => (estado.aviso = null), 2800)
}

const chaveDe = (slug, id) => `${slug}/${id}`

export const itensCarrinho = computed(() =>
  estado.itens.map((item) => {
    const categoria = getCategoria(item.slug)
    const produto = getProdutos(item.slug).find((p) => p.id === item.id)
    return {
      ...item,
      chave: chaveDe(item.slug, item.id),
      categoriaNome: categoria ? categoria.nome : item.slug,
      imagem: produto ? produto.imagem : imagemPadrao,
    }
  })
)

export const totalItens = computed(() => estado.itens.reduce((soma, i) => soma + i.quantidade, 0))

export const avisoCarrinho = computed(() => estado.aviso)

export function quantidadeNoCarrinho(slug, id) {
  const item = estado.itens.find((i) => i.slug === slug && i.id === id)
  return item ? item.quantidade : 0
}

export function adicionarAoCarrinho(slug, produto, quantidade = 1) {
  const existente = estado.itens.find((i) => i.slug === slug && i.id === produto.id)
  if (existente) existente.quantidade += quantidade
  else estado.itens.push({ slug, id: produto.id, titulo: produto.titulo, quantidade })
  mostrarAviso(`${produto.titulo} adicionado ao carrinho`)
}

export function alterarQuantidade(slug, id, quantidade) {
  const item = estado.itens.find((i) => i.slug === slug && i.id === id)
  if (!item) return
  const q = Math.floor(Number(quantidade))
  if (!q || q < 1) removerDoCarrinho(slug, id)
  else item.quantidade = Math.min(q, 9999)
}

export function removerDoCarrinho(slug, id) {
  estado.itens = estado.itens.filter((i) => !(i.slug === slug && i.id === id))
}

export function esvaziarCarrinho() {
  estado.itens = []
}

export function mensagemOrcamento({ nome = '', dataEvento = '', observacoes = '' } = {}) {
  const grupos = {}
  for (const item of itensCarrinho.value) {
    ;(grupos[item.categoriaNome] ||= []).push(item)
  }

  const linhas = ['Olá! Gostaria de um orçamento para os seguintes itens:', '']
  for (const [categoria, itens] of Object.entries(grupos)) {
    linhas.push(`*${categoria}*`)
    for (const i of itens) linhas.push(`• ${i.quantidade}x ${i.titulo}`)
    linhas.push('')
  }
  linhas.push(`Total: ${totalItens.value} ${totalItens.value === 1 ? 'item' : 'itens'}`)

  if (nome) linhas.push(`Nome: ${nome}`)
  if (dataEvento) linhas.push(`Data do evento: ${dataEvento.split('-').reverse().join('/')}`)
  if (observacoes) linhas.push(`Observações: ${observacoes}`)

  return linhas.join('\n')
}
