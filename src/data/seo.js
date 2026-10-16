import { categorias } from './listaCategorias.js'
import { empresa } from './empresa.js'

const urlDoAmbiente =
  (typeof process !== 'undefined' && process.env && process.env.SITE_URL) ||
  (import.meta.env && import.meta.env.VITE_SITE_URL)

export const SITE_URL = (urlDoAmbiente || 'https://www.royallocacoes.com.br').replace(/\/+$/, '')

const CIDADE = 'Curitiba'

export const paginas = [
  {
    path: '/',
    titulo: 'Royal Locações | Aluguel de Louças, Taças, Mesas e Itens para Festas em Curitiba',
    descricao:
      'Royal Locações: aluguel de louças, taças, talheres, mesas, cadeiras, toalhas, rechauds e muito mais para casamentos, aniversários e eventos em Curitiba. Peça seu orçamento pelo WhatsApp.',
    prioridade: '1.0',
  },
  {
    path: '/sobre',
    titulo: `Sobre a Royal Locações | Locação para Eventos em ${CIDADE}`,
    descricao: `Conheça a Royal Locações, empresa de locação de materiais para festas e eventos no Ahú, em ${CIDADE}. Qualidade, pontualidade e preço justo.`,
    prioridade: '0.6',
  },
  {
    path: '/contrato',
    titulo: 'Contrato e Regras de Locação | Royal Locações',
    descricao:
      'Confira as regras de locação da Royal Locações: retirada, devolução, prazos, entregas, cuidados com o material e formas de pagamento.',
    prioridade: '0.4',
  },
  {
    path: '/contato',
    titulo: `Contato | Royal Locações - ${empresa.endereco}`,
    descricao: `Fale com a Royal Locações: ${empresa.telefone}, ${empresa.email}. Endereço: ${empresa.endereco}. Atendimento de segunda a sábado.`,
    prioridade: '0.7',
  },
  ...categorias.map((c) => ({
    path: `/produtos/${c.slug}`,
    titulo: `${c.seo} em ${CIDADE} | Royal Locações`,
    descricao: `${c.seo} para festas e eventos em ${CIDADE}. ${c.descricao} Peça seu orçamento na Royal Locações pelo WhatsApp.`,
    prioridade: '0.8',
    h1: c.titulo || c.nome,
    texto: c.texto,
  })),
]

const paginasPrivadas = [
  {
    path: '/carrinho',
    titulo: 'Carrinho | Royal Locações',
    descricao: 'Revise os itens do seu carrinho e peça seu orçamento pelo WhatsApp.',
    noindex: true,
  },
]

const naoEncontrada = {
  titulo: 'Página não encontrada | Royal Locações',
  descricao: 'A página que você procura não existe.',
  noindex: true,
}

export function seoDaRota(path) {
  const limpo = path.length > 1 ? path.replace(/\/+$/, '') : path
  return [...paginas, ...paginasPrivadas].find((p) => p.path === limpo) || { ...naoEncontrada, path: limpo }
}

export function urlCompleta(path) {
  return SITE_URL + (path === '/' ? '/' : path)
}

export function dadosEstruturados(slugsVisiveis = null) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#empresa`,
    name: empresa.nome,
    alternateName: 'Royal Locações Curitiba',
    description: paginas[0].descricao,
    slogan: empresa.slogan,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-image.jpg`,
    telephone: '+55-41-99125-3081',
    email: empresa.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Santa Clara, 26',
      addressLocality: CIDADE,
      addressRegion: 'PR',
      addressCountry: 'BR',
    },
    areaServed: { '@type': 'City', name: CIDADE },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '17:00',
      },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '10:00', closes: '12:00' },
    ],
    hasMap: empresa.mapaLink,
    makesOffer: categorias
      .filter((c) => c.slug !== 'produtos-a-venda' && (!slugsVisiveis || slugsVisiveis.includes(c.slug)))
      .map((c) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: `${c.seo} em ${CIDADE}` } })),
  }
}

function meta(atributo, chave, valor) {
  let el = document.head.querySelector(`meta[${atributo}="${chave}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(atributo, chave)
    document.head.appendChild(el)
  }
  el.setAttribute('content', valor)
}

export function aplicarSeo(path) {
  const s = seoDaRota(path)
  const url = urlCompleta(s.path)
  document.title = s.titulo
  meta('name', 'description', s.descricao)
  meta('name', 'robots', s.noindex ? 'noindex, follow' : 'index, follow')
  meta('property', 'og:title', s.titulo)
  meta('property', 'og:description', s.descricao)
  meta('property', 'og:url', url)
  meta('name', 'twitter:title', s.titulo)
  meta('name', 'twitter:description', s.descricao)
  let canonical = document.head.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', url)
}
