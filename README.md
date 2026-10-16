# Site Royal Locações (Vue 3 + Vite)

## Como rodar
1. Instale o Node.js (versão 18 ou mais nova): https://nodejs.org
2. Abra um terminal nesta pasta e rode:
   ```
   npm install
   npm run dev
   ```
3. Abra o endereço que aparecer (normalmente http://localhost:5173).

Para gerar a versão final (para hospedar): `npm run build` → a pasta `dist/` é o site pronto.

## Imagens dos produtos (automático)
Coloque as fotos em `Assets/produtos/<categoria>/`:

| Pasta | Categoria |
|---|---|
| copos-e-tacas | Copos e Taças |
| diversos | Diversos |
| fingerfood-e-cafe | Fingerfood e Café |
| loucas | Louças |
| mesas-e-cadeiras | Mesas e Cadeiras |
| produtos-a-venda | Produtos à Venda |
| puffs | Puffs |
| rechauds | Rechauds |
| suporte-para-doces | Suporte para Doces |
| talheres | Talheres |
| toalhas-e-capas | Toalhas e Capas |
| vidros | Vidros |

- **Cada imagem = um card.** Adicionou ou removeu, o site se ajusta sozinho (com `npm run dev` rodando, atualiza na hora).
- **O nome do arquivo vira o título do card**: `taca-de-cristal.jpg` → "Taca de cristal". Use acentos no nome se quiser: `taça-de-cristal.jpg`.
- **Capa da categoria na Home:** coloque na pasta um arquivo chamado `CAPA` (ex.: `CAPA.jpg`). Ele aparece só no card da Home e **não** vira produto. Sem `CAPA`, a capa é a primeira imagem em ordem alfabética.
- Pasta sem nenhuma imagem de produto (só com `CAPA` ou vazia) → a categoria continua aparecendo com uma capa "Em breve" e, ao entrar, mostra uma mensagem de novidades a caminho.
- Formatos aceitos: jpg, jpeg, png, webp, gif, avif, jfif, svg.

## Foto de evento (página Sobre)
Coloque a foto de um evento em `Assets/evento/`. Enquanto estiver vazia, aparece a imagem de alerta 404.

## Textos e dados
- Endereço, telefone, WhatsApp, e-mail, horários: `src/data/empresa.js`
- Nomes e descrições das categorias: `src/data/categorias.js`
- Texto do "Sobre Nós" (provisório): `src/views/SobreView.vue`
- Regras do contrato: `src/views/ContratoView.vue`

## Hospedagem
O site usa URLs limpas (`/sobre`, `/contato`). Em hospedagens estáticas (Netlify, Vercel, Hostinger etc.)
configure para redirecionar todas as rotas para `index.html` (na Netlify já vai pronto o arquivo `public/_redirects`).

## Google (SEO)
- **Domínio:** troque `SITE_URL` em `src/data/seo.js` pelo endereço real do site antes de publicar.
- Títulos e descrições de cada página ficam em `src/data/seo.js` (os das categorias usam o campo `seo` de `src/data/listaCategorias.js`).
- O `npm run build` gera automaticamente: `sitemap.xml`, `robots.txt` e uma página HTML pronta para cada rota, com título, descrição e imagem de compartilhamento corretos.
- Imagem que aparece ao compartilhar o link (WhatsApp, Facebook, Google): `public/og-image.jpg`.

Depois de publicar:
1. Cadastre o site no **Google Search Console** (search.google.com/search-console) e envie o `sitemap.xml`.
2. Crie/atualize o **Perfil da Empresa no Google** (business.google.com) com o mesmo nome, endereço, telefone e horários do site, e coloque o link do site.
3. Coloque o link do site no Instagram/Facebook da empresa.
