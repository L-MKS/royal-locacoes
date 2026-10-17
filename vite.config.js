import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import comprimirImagens from './plugins/comprimirImagens.js'
import { SITE_URL, paginas, seoDaRota, urlCompleta, dadosEstruturados } from './src/data/seo.js'

const escapar = (t) => t.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function trocarMeta(html, seletor, valor) {
  const re = new RegExp(`(<meta ${seletor} content=")[^"]*(")`)
  return html.replace(re, (_, a, b) => a + escapar(valor) + b)
}

function htmlDaPagina(base, p) {
  const s = seoDaRota(p.path)
  const url = urlCompleta(s.path)
  let html = base.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${escapar(s.titulo)}</title>`)
  html = trocarMeta(html, 'name="description"', s.descricao)
  html = trocarMeta(html, 'name="robots"', s.noindex ? 'noindex, follow' : 'index, follow')
  html = trocarMeta(html, 'property="og:title"', s.titulo)
  html = trocarMeta(html, 'property="og:description"', s.descricao)
  html = trocarMeta(html, 'property="og:url"', url)
  html = trocarMeta(html, 'name="twitter:title"', s.titulo)
  html = trocarMeta(html, 'name="twitter:description"', s.descricao)
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, (_, a, b) => a + url + b)
  if (s.h1 && s.texto) {
    html = html.replace(
      /<noscript>[\s\S]*?<\/noscript>/,
      () => `<noscript>\n      <h1>${escapar(s.h1)} em Curitiba</h1>\n      <p>${escapar(s.texto)}</p>\n      <p>Royal Locações - Rua Santa Clara, 26, Ahú, Curitiba-PR. WhatsApp: (41) 9 9125-3081.</p>\n    </noscript>`
    )
  }
  return html
}

function royalSeo() {
  let saida = 'dist'

  return {
    name: 'royal-seo',
    configResolved(config) {
      saida = path.resolve(config.root, config.build.outDir)
    },
    transformIndexHtml(html) {
      return {
        html: html.replaceAll('%SITE_URL%', SITE_URL),
        tags: [
          {
            tag: 'script',
            attrs: { type: 'application/ld+json' },
            children: JSON.stringify(dadosEstruturados()),
            injectTo: 'head',
          },
        ],
      }
    },
    closeBundle() {
      const indice = path.join(saida, 'index.html')
      if (!fs.existsSync(indice)) return
      const base = fs.readFileSync(indice, 'utf8')

      const publicas = paginas

      for (const p of [...publicas, { path: '/carrinho' }]) {
        if (p.path === '/') continue
        const pasta = path.join(saida, p.path)
        fs.mkdirSync(pasta, { recursive: true })
        fs.writeFileSync(path.join(pasta, 'index.html'), htmlDaPagina(base, p))
      }
      fs.writeFileSync(path.join(saida, '404.html'), htmlDaPagina(base, { path: '/404' }))

      const hoje = new Date().toISOString().slice(0, 10)
      const urls = publicas
        .map((p) => `  <url>\n    <loc>${urlCompleta(p.path)}</loc>\n    <lastmod>${hoje}</lastmod>\n    <priority>${p.prioridade}</priority>\n  </url>`)
        .join('\n')
      fs.writeFileSync(
        path.join(saida, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
      )
      fs.writeFileSync(
        path.join(saida, 'robots.txt'),
        `User-agent: *\nAllow: /\nDisallow: /carrinho\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
      )
    },
  }
}

export default defineConfig({
  base: process.env.BASE_PATH || '/',
  define: {
    'import.meta.env.VITE_SITE_URL': JSON.stringify(SITE_URL),
  },
  plugins: [vue(), royalSeo(), comprimirImagens()],
  assetsInclude: ['**/*.JPG', '**/*.JPEG', '**/*.PNG', '**/*.WEBP', '**/*.JFIF', '**/*.jfif'],
})
