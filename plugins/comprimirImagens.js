import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const LARGURA_MAXIMA = 1600
const QUALIDADE = 78

const formatos = {
  '.jpg': (img) => img.jpeg({ quality: QUALIDADE, mozjpeg: true }),
  '.jpeg': (img) => img.jpeg({ quality: QUALIDADE, mozjpeg: true }),
  '.jfif': (img) => img.jpeg({ quality: QUALIDADE, mozjpeg: true }),
  '.png': (img) => img.png({ compressionLevel: 9, effort: 10 }),
  '.webp': (img) => img.webp({ quality: QUALIDADE }),
}

function listarArquivos(pasta) {
  return fs.readdirSync(pasta, { withFileTypes: true }).flatMap((item) => {
    const caminho = path.join(pasta, item.name)
    return item.isDirectory() ? listarArquivos(caminho) : [caminho]
  })
}

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`

export default function comprimirImagens() {
  let saida = 'dist'

  return {
    name: 'comprimir-imagens',
    apply: 'build',
    configResolved(config) {
      saida = path.resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      if (!fs.existsSync(saida)) return
      const imagens = listarArquivos(saida).filter((f) => formatos[path.extname(f).toLowerCase()])
      let antes = 0
      let depois = 0

      for (const arquivo of imagens) {
        const original = fs.readFileSync(arquivo)
        antes += original.length
        try {
          const img = sharp(original)
            .rotate()
            .resize({ width: LARGURA_MAXIMA, height: LARGURA_MAXIMA, fit: 'inside', withoutEnlargement: true })
          const comprimida = await formatos[path.extname(arquivo).toLowerCase()](img).toBuffer()
          if (comprimida.length < original.length) {
            fs.writeFileSync(arquivo, comprimida)
            depois += comprimida.length
          } else {
            depois += original.length
          }
        } catch (erro) {
          depois += original.length
          console.warn(`[imagens] não foi possível comprimir ${path.relative(saida, arquivo)}: ${erro.message}`)
        }
      }

      console.log(`[imagens] ${imagens.length} imagens: ${kb(antes)} -> ${kb(depois)}`)
    },
  }
}
