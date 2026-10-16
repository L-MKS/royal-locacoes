<script setup>
import { empresa, linkWhatsApp } from '../data/empresa'
import { categorias } from '../data/categorias'
import logomarca from '../assets/logo/logomarca.jpg'

const ano = new Date().getFullYear()
</script>

<template>
  <footer class="rodape">
    <div class="faixa-ouro"></div>
    <div class="container grade">
      <div class="col marca">
        <img :src="logomarca" alt="Royal Locações - Soluções para o seu evento" />
      </div>

      <div class="col">
        <h3>Atendimento</h3>
        <dl>
          <dt>Endereço:</dt>
          <dd>
            <a :href="empresa.mapaLink" target="_blank" rel="noopener">{{ empresa.endereco }}</a>
          </dd>

          <dt>Telefones:</dt>
          <dd>
            <a :href="linkWhatsApp()" target="_blank" rel="noopener">{{ empresa.telefone }}</a>
          </dd>

          <dt>Expediente:</dt>
          <dd>
            <span v-for="h in empresa.expediente" :key="h" class="linha">{{ h }}</span>
          </dd>

          <dt>E-mail:</dt>
          <dd>
            <a :href="`mailto:${empresa.email}`">{{ empresa.email }}</a>
          </dd>
        </dl>
      </div>

      <div class="col">
        <h3>Produtos</h3>
        <ul class="lista-produtos">
          <li v-for="c in categorias" :key="c.slug">
            <RouterLink :to="`/produtos/${c.slug}`">{{ c.nome }}</RouterLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="copyright">
      <div class="container">© {{ ano }} {{ empresa.nome }}. Todos os direitos reservados.</div>
    </div>
  </footer>
</template>

<style scoped>
.rodape {
  background: var(--royal-900);
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.93rem;
}

.faixa-ouro {
  height: 4px;
  background: linear-gradient(90deg, var(--royal), var(--ouro), var(--royal));
}

.grade {
  display: grid;
  grid-template-columns: 1fr 1.3fr 1.3fr;
  gap: 48px;
  padding-top: 56px;
  padding-bottom: 48px;
}

.marca img {
  width: 100%;
  max-width: 240px;
  border-radius: var(--raio);
}

h3 {
  color: var(--ouro);
  font-size: 1.1rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 18px;
}

dl {
  margin: 0;
}

dt {
  font-weight: 700;
  color: var(--gelo);
  margin-top: 12px;
}

dt:first-child {
  margin-top: 0;
}

dd {
  margin: 2px 0 0;
}

.linha {
  display: block;
}

a {
  text-decoration: none;
  transition: color 0.2s;
}

a:hover {
  color: var(--ouro);
}

.lista-produtos {
  list-style: none;
  margin: 0;
  padding: 0;
  columns: 2;
  column-gap: 20px;
}

.lista-produtos li {
  padding: 4px 0;
  break-inside: avoid;
}

.copyright {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 18px 0;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.55);
  text-align: center;
}

@media (max-width: 900px) {
  .grade {
    grid-template-columns: 1fr 1fr;
  }
  .marca {
    grid-column: 1 / -1;
  }
  .marca img {
    max-width: 200px;
  }
}

@media (max-width: 600px) {
  .grade {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .copyright {
    padding-bottom: 90px;
  }
}
</style>
