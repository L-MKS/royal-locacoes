import imagem404 from '../assets/placeholder/imagem-404.svg'
import imagemEmBreve from '../assets/placeholder/em-breve.svg'
import { categorias as todasCategorias } from './listaCategorias.js'

export { todasCategorias }

export const imagemPadrao = imagem404

const arquivos = import.meta.glob(
  '/Assets/produtos/*/*.{png,jpg,jpeg,webp,gif,avif,jfif,svg,PNG,JPG,JPEG,WEBP,GIF,AVIF,JFIF,SVG}',
  { eager: true, import: 'default' }
)

function tituloDoArquivo(nomeArquivo) {
  const semExt = nomeArquivo.replace(/\.[^.]+$/, '')
  const texto = (semExt.includes(' ') ? semExt : semExt.replace(/[-_]+/g, ' ')).replace(/\s+/g, ' ').trim()
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}

const ehCapa = (arquivo) => arquivo.replace(/\.[^.]+$/, '').trim().toUpperCase() === 'CAPA'

const porCategoria = {}
const capas = {}
for (const [caminho, url] of Object.entries(arquivos)) {
  const partes = caminho.split('/')
  const arquivo = partes.pop()
  const pasta = partes.pop()
  if (ehCapa(arquivo)) {
    capas[pasta] = url
    continue
  }
  ;(porCategoria[pasta] ||= []).push({ id: arquivo, titulo: tituloDoArquivo(arquivo), imagem: url })
}
for (const lista of Object.values(porCategoria)) {
  lista.sort((a, b) => a.id.localeCompare(b.id, 'pt-BR', { numeric: true }))
}

export const categorias = [
  ...todasCategorias.filter((c) => porCategoria[c.slug]?.length),
  ...todasCategorias.filter((c) => !porCategoria[c.slug]?.length),
]

export function getCategoria(slug) {
  return categorias.find((c) => c.slug === slug)
}

export function getCategoriaQualquer(slug) {
  return todasCategorias.find((c) => c.slug === slug)
}

export function getProdutos(slug) {
  return porCategoria[slug] || []
}

export function getCapa(slug) {
  if (capas[slug]) return capas[slug]
  const lista = porCategoria[slug]
  return lista && lista.length ? lista[0].imagem : imagemEmBreve
}

export function totalProdutos(slug) {
  return porCategoria[slug]?.length || 0
}

const fotosEvento = Object.values(
  import.meta.glob('/Assets/evento/*.{png,jpg,jpeg,webp,avif,jfif,PNG,JPG,JPEG,WEBP,JFIF}', { eager: true, import: 'default' })
)
export const imagemEvento = fotosEvento[0] || imagem404
