<script setup>
import { linkWhatsApp } from '../data/empresa'
import { imagemEvento } from '../data/categorias'
import PageHeader from '../components/PageHeader.vue'

const valores = [
  { titulo: 'Qualidade', texto: 'Peças selecionadas, conservadas e higienizadas com cuidado a cada locação.' },
  { titulo: 'Pontualidade', texto: 'Compromisso com prazos de retirada, entrega e busca, para você não se preocupar.' },
  { titulo: 'Atendimento', texto: 'Atendimento próximo e atencioso, do primeiro orçamento até a devolução.' },
  { titulo: 'Preço justo', texto: 'Valores transparentes e acessíveis para eventos de todos os tamanhos.' },
]
</script>

<template>
  <div>
    <PageHeader titulo="Sobre Nós" subtitulo="Conheça a Royal Locações" />

    <section class="secao">
      <div class="container sobre">
        <figure class="foto-evento">
          <img :src="imagemEvento" alt="Evento montado com mesas e cadeiras da Royal Locações em Curitiba" />
          <figcaption>Um dos nossos eventos</figcaption>
        </figure>

        <div class="texto">
          <span class="script destaque">Soluções para o seu evento</span>
          <h2>Cada detalhe faz a diferença</h2>
          <p>
            A Royal Locações nasceu com um propósito simples: ajudar pessoas a transformar momentos especiais em
            lembranças inesquecíveis. Sabemos que por trás de cada evento existe uma história, seja um casamento, um
            aniversário, um batizado, uma formatura ou uma confraternização entre amigos e colegas de trabalho.
          </p>
          <p>
            Por isso, reunimos um acervo variado de louças, copos e taças, talheres, toalhas, mesas, cadeiras,
            rechauds, suportes para doces e muitos outros itens que deixam a sua mesa mais bonita e o seu evento
            mais organizado. Tudo escolhido com carinho para combinar com diferentes estilos, do clássico ao
            moderno.
          </p>
          <p>
            Nosso compromisso é oferecer materiais de qualidade, bem cuidados e entregues no prazo, com um
            atendimento próximo e transparente do início ao fim. Você cuida dos convidados, e a gente cuida do
            resto.
          </p>
          <a :href="linkWhatsApp()" target="_blank" rel="noopener" class="btn btn-royal">Fale com a gente</a>
        </div>
      </div>
    </section>

    <section class="secao valores-secao">
      <div class="container">
        <div class="titulo-secao">
          <span class="ornamento">✦</span>
          <h2>Nossos valores</h2>
        </div>
        <div class="valores">
          <div v-for="v in valores" :key="v.titulo" class="valor">
            <span class="icone">♛</span>
            <h3>{{ v.titulo }}</h3>
            <p>{{ v.texto }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.sobre {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
}

.foto-evento {
  margin: 0;
  position: relative;
}

.foto-evento::before {
  content: '';
  position: absolute;
  inset: 18px -18px -18px 18px;
  border: 3px solid var(--ouro);
  border-radius: var(--raio);
  z-index: 0;
}

.foto-evento img {
  position: relative;
  z-index: 1;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: var(--raio);
  box-shadow: var(--sombra-forte);
}

figcaption {
  position: relative;
  z-index: 1;
  margin-top: 30px;
  font-size: 0.85rem;
  color: var(--cinza);
  text-align: center;
}

.destaque {
  display: block;
  font-size: 1.9rem;
  color: var(--ouro-600);
}

.texto h2 {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
}

.texto p {
  color: #3a3f58;
}

.texto .btn {
  margin-top: 10px;
}

.valores-secao {
  background: var(--branco);
}

.valores {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
}

.valor {
  text-align: center;
  padding: 30px 22px;
  border-radius: var(--raio);
  background: linear-gradient(160deg, var(--royal), var(--royal-700));
  color: var(--branco);
}

.icone {
  display: inline-grid;
  place-items: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: rgba(250, 160, 12, 0.15);
  color: var(--ouro);
  font-size: 1.6rem;
  margin-bottom: 12px;
}

.valor h3 {
  color: var(--branco);
  font-size: 1.1rem;
}

.valor p {
  margin: 0;
  color: var(--gelo);
  font-size: 0.92rem;
}

@media (max-width: 900px) {
  .sobre {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .valores {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 560px) {
  .valores {
    grid-template-columns: 1fr;
  }
  .foto-evento::before {
    inset: 12px -10px -12px 10px;
  }
}
</style>
