<script setup>
import CategoriaCard from '../components/CategoriaCard.vue'
import { categorias, getCapa, totalProdutos } from '../data/categorias'
import { linkWhatsApp } from '../data/empresa'
import logoIcone from '../assets/logo/logo-icone.png'

const passos = [
  { titulo: 'Escolha', texto: 'Navegue pelas categorias e separe os itens ideais para o seu evento.' },
  { titulo: 'Solicite', texto: 'Chame a gente no WhatsApp e receba seu orçamento rapidinho.' },
  { titulo: 'Retire ou receba', texto: 'Retire em nossa loja no Ahú ou receba no local do evento.' },
  { titulo: 'Celebre', texto: 'Aproveite seu evento. Depois é só devolver o material conforme o contrato.' },
]
</script>

<template>
  <div>
    <section class="hero">
      <div class="container hero-interno">
        <div class="hero-texto surgir">
          <span class="script slogan">Soluções para o seu evento</span>
          <h1>Tudo para deixar sua festa à altura da realeza</h1>
          <p>
            Louças, taças, talheres, mesas, cadeiras, toalhas e muito mais para casamentos, aniversários,
            confraternizações e eventos corporativos em Curitiba.
          </p>
          <div class="acoes">
            <a href="#produtos" class="btn btn-ouro">Ver produtos</a>
            <a :href="linkWhatsApp()" target="_blank" rel="noopener" class="btn btn-contorno">Pedir orçamento</a>
          </div>
        </div>
        <div class="hero-logo surgir" style="animation-delay: 0.15s">
          <div class="anel"></div>
          <img :src="logoIcone" alt="Logo Royal Locações" />
        </div>
      </div>
    </section>

    <section id="produtos" class="secao">
      <div class="container">
        <div class="titulo-secao">
          <span class="ornamento">✦</span>
          <h2>Nossos Produtos</h2>
          <p>Escolha uma categoria e confira os itens disponíveis para locação.</p>
        </div>
        <div class="grade-cards">
          <CategoriaCard v-for="(c, i) in categorias" :key="c.slug" :categoria="c" :capa="getCapa(c.slug)" :total="totalProdutos(c.slug)" class="surgir" :style="{ animationDelay: `${i * 0.04}s` }" />
        </div>
      </div>
    </section>

    <section class="secao como">
      <div class="container">
        <div class="titulo-secao">
          <span class="ornamento">✦</span>
          <h2>Como funciona</h2>
        </div>
        <ol class="passos">
          <li v-for="(p, i) in passos" :key="p.titulo">
            <span class="num">{{ i + 1 }}</span>
            <h3>{{ p.titulo }}</h3>
            <p>{{ p.texto }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="secao sobre-locacao">
      <div class="container texto-estreito">
        <h2>Locação de materiais para festas e eventos em Curitiba</h2>
        <p>
          A <strong>Royal Locações</strong> trabalha com aluguel de louças, copos e taças, talheres, toalhas e capas de
          cadeira, mesas e cadeiras, puffs, rechauds, suportes para doces e peças de vidro para casamentos,
          aniversários, batizados, formaturas, chás, confraternizações e eventos corporativos.
        </p>
        <p>
          Nossa loja fica na Rua Santa Clara, 26, no bairro Ahú, em Curitiba. Você pode retirar o material
          conosco ou contar com o nosso serviço de entrega e busca. Monte seu pedido pelo site e receba o
          orçamento pelo WhatsApp.
        </p>
        <p>
          Procurando aluguel de cadeiras para festa, locação de mesas, aluguel de toalha de mesa, sousplat,
          faqueiro ou taças em Curitiba? Fale com a Royal Locações.
        </p>
      </div>
    </section>

    <section class="cta">
      <div class="container cta-interno">
        <div>
          <h2>Vamos planejar seu evento?</h2>
          <p>Fale com a gente e monte o seu pedido sem complicação.</p>
        </div>
        <div class="acoes">
          <a :href="linkWhatsApp()" target="_blank" rel="noopener" class="btn btn-ouro">Chamar no WhatsApp</a>
          <RouterLink to="/contrato" class="btn btn-contorno">Ler o contrato</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  color: var(--branco);
  background: radial-gradient(circle at 75% 45%, rgba(200, 216, 240, 0.16), transparent 45%),
    linear-gradient(135deg, var(--royal) 0%, var(--royal-700) 60%, var(--royal-900) 100%);
}

.hero-interno {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  align-items: center;
  gap: 40px;
  padding-top: 80px;
  padding-bottom: 90px;
}

.slogan {
  display: block;
  font-size: 2.1rem;
  color: var(--ouro);
  margin-bottom: 4px;
}

h1 {
  color: var(--branco);
  font-size: clamp(2rem, 4.6vw, 3.3rem);
  margin-bottom: 18px;
}

.hero-texto p {
  color: var(--gelo);
  font-size: 1.05rem;
  max-width: 540px;
  margin: 0 0 30px;
}

.acoes {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.hero-logo {
  position: relative;
  justify-self: center;
  width: min(380px, 80vw);
  aspect-ratio: 1;
}

.hero-logo img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.anel {
  position: absolute;
  inset: -22px;
  border-radius: 50%;
  border: 2px dashed rgba(250, 160, 12, 0.45);
  animation: girar 40s linear infinite;
}

@keyframes girar {
  to {
    transform: rotate(360deg);
  }
}

.como {
  background: var(--branco);
}

.passos {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.passos li {
  text-align: center;
  padding: 28px 22px;
  border-radius: var(--raio);
  background: var(--creme);
  border: 1px solid rgba(3, 16, 147, 0.07);
}

.num {
  display: inline-grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--royal);
  color: var(--ouro);
  font-family: var(--fonte-titulo);
  font-weight: 700;
  font-size: 1.3rem;
  margin-bottom: 14px;
  box-shadow: 0 0 0 5px var(--gelo);
}

.passos h3 {
  font-size: 1.1rem;
}

.passos p {
  margin: 0;
  color: var(--cinza);
  font-size: 0.92rem;
}

.sobre-locacao {
  text-align: center;
}

.texto-estreito {
  max-width: 820px;
}

.sobre-locacao h2 {
  font-size: clamp(1.4rem, 2.6vw, 1.9rem);
  margin-bottom: 18px;
}

.sobre-locacao p {
  color: var(--cinza);
  margin: 0 0 14px;
}

.sobre-locacao strong {
  color: var(--royal);
}

.cta {
  background: linear-gradient(90deg, var(--royal-700), var(--royal));
  color: var(--branco);
  padding: 56px 0;
}

.cta-interno {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}

.cta h2 {
  color: var(--branco);
  margin-bottom: 6px;
}

.cta p {
  margin: 0;
  color: var(--gelo);
}

@media (max-width: 900px) {
  .hero-interno {
    grid-template-columns: 1fr;
    text-align: center;
    padding-top: 56px;
    padding-bottom: 64px;
  }
  .hero-texto p {
    margin-left: auto;
    margin-right: auto;
  }
  .acoes {
    justify-content: center;
  }
  .hero-logo {
    width: min(260px, 70vw);
    order: -1;
  }
  .passos {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 560px) {
  .passos {
    grid-template-columns: 1fr;
  }
  .slogan {
    font-size: 1.7rem;
  }
}
</style>
