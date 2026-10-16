<script setup>
import { ref } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import { empresa, linkWhatsApp } from '../data/empresa'

const nome = ref('')
const dataEvento = ref('')
const mensagem = ref('')

function enviar() {
  const partes = [`Olá! Meu nome é ${nome.value}.`]
  if (dataEvento.value) partes.push(`Data do evento: ${dataEvento.value.split('-').reverse().join('/')}.`)
  if (mensagem.value) partes.push(mensagem.value)
  window.open(linkWhatsApp(partes.join('\n')), '_blank', 'noopener')
}
</script>

<template>
  <div>
    <PageHeader titulo="Contato" subtitulo="Estamos prontos para ajudar no seu evento" />

    <section class="secao">
      <div class="container grade">
        <div class="infos">
          <div class="info">
            <span class="icone">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
            </span>
            <div>
              <h3>Endereço</h3>
              <a :href="empresa.mapaLink" target="_blank" rel="noopener">{{ empresa.endereco }}</a>
            </div>
          </div>

          <div class="info">
            <span class="icone">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" /></svg>
            </span>
            <div>
              <h3>Telefones</h3>
              <a :href="empresa.telefoneLink">{{ empresa.telefone }}</a>
              <a :href="linkWhatsApp()" target="_blank" rel="noopener" class="whats-link">Chamar no WhatsApp →</a>
            </div>
          </div>

          <div class="info">
            <span class="icone">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
            </span>
            <div>
              <h3>Expediente</h3>
              <span v-for="h in empresa.expediente" :key="h" class="linha">{{ h }}</span>
            </div>
          </div>

          <div class="info">
            <span class="icone">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
            </span>
            <div>
              <h3>E-mail</h3>
              <a :href="`mailto:${empresa.email}`">{{ empresa.email }}</a>
            </div>
          </div>

          <form class="form" @submit.prevent="enviar">
            <h3>Peça seu orçamento</h3>
            <label>
              Seu nome
              <input v-model.trim="nome" type="text" required placeholder="Como podemos te chamar?" />
            </label>
            <label>
              Data do evento
              <input v-model="dataEvento" type="date" />
            </label>
            <label>
              O que você precisa?
              <textarea v-model.trim="mensagem" rows="3" placeholder="Ex.: 100 taças, 10 mesas redondas..."></textarea>
            </label>
            <button type="submit" class="btn btn-ouro">Enviar pelo WhatsApp</button>
          </form>
        </div>

        <div class="mapa">
          <iframe :src="empresa.mapaEmbed" title="Mapa - Royal Locações" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen ></iframe>
          <a :href="empresa.mapaLink" target="_blank" rel="noopener" class="btn btn-royal abrir-mapa">Abrir no Google Maps</a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.grade {
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 36px;
  align-items: start;
}

.infos {
  display: grid;
  gap: 14px;
}

.info {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  background: var(--branco);
  padding: 18px 20px;
  border-radius: var(--raio);
  box-shadow: var(--sombra);
  border-left: 4px solid var(--ouro);
}

.icone {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: var(--royal);
  color: var(--ouro);
}

.info h3 {
  font-family: var(--fonte-texto);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--cinza);
  margin-bottom: 2px;
}

.info a,
.linha {
  display: block;
  color: var(--royal-900);
  font-weight: 600;
  text-decoration: none;
  word-break: break-word;
}

.info a:hover {
  color: var(--royal);
  text-decoration: underline;
}

.whats-link {
  margin-top: 4px;
  font-size: 0.88rem;
  color: #128c4b !important;
}

.form {
  background: linear-gradient(150deg, var(--royal), var(--royal-700));
  color: var(--branco);
  padding: 24px;
  border-radius: var(--raio);
  display: grid;
  gap: 14px;
  margin-top: 6px;
}

.form h3 {
  color: var(--ouro);
  margin: 0;
}

.form label {
  display: grid;
  gap: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--gelo);
}

.form input,
.form textarea {
  font: inherit;
  font-weight: 400;
  color: var(--tinta);
  background: var(--branco);
  border: 2px solid transparent;
  border-radius: 10px;
  padding: 11px 14px;
  resize: vertical;
}

.form input:focus,
.form textarea:focus {
  outline: none;
  border-color: var(--ouro);
}

.form .btn {
  justify-self: start;
}

.mapa {
  position: sticky;
  top: calc(var(--altura-nav) + 20px);
  border-radius: var(--raio);
  overflow: hidden;
  box-shadow: var(--sombra-forte);
  border: 4px solid var(--branco);
  background: var(--branco);
}

.mapa iframe {
  display: block;
  width: 100%;
  height: 560px;
  border: 0;
}

.abrir-mapa {
  width: 100%;
  justify-content: center;
  border-radius: 0;
}

@media (max-width: 900px) {
  .grade {
    grid-template-columns: 1fr;
  }
  .mapa {
    position: static;
  }
  .mapa iframe {
    height: 380px;
  }
}
</style>
