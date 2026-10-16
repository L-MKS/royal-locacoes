<script setup>
defineProps({
  categoria: { type: Object, required: true },
  capa: { type: String, required: true },
  total: { type: Number, default: 0 },
})
</script>

<template>
  <RouterLink :to="`/produtos/${categoria.slug}`" class="card">
    <div class="foto">
      <img :src="capa" :alt="categoria.nome" loading="lazy" />
      <span v-if="!total" class="selo-breve">Em breve</span>
    </div>
    <div class="info">
      <h3>{{ categoria.nome }}</h3>
      <p>{{ categoria.descricao }}</p>
      <span class="ver">
        {{ total ? 'Ver produtos' : 'Saiba mais' }}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </span>
    </div>
  </RouterLink>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background: var(--branco);
  border-radius: var(--raio);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  box-shadow: var(--sombra);
  border: 1px solid rgba(3, 16, 147, 0.06);
  transition: transform 0.25s, box-shadow 0.25s;
}

.selo-breve {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
  background: var(--ouro);
  color: var(--royal-900);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 5px 12px;
  border-radius: 999px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: var(--sombra-forte);
}

.foto {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--royal-50);
  position: relative;
}

.foto::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 55%, rgba(3, 16, 147, 0.35));
}

.foto img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.card:hover .foto img {
  transform: scale(1.07);
}

.info {
  padding: 18px 20px 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  border-top: 3px solid var(--ouro);
}

h3 {
  font-size: 1.12rem;
  margin-bottom: 6px;
}

p {
  margin: 0 0 14px;
  font-size: 0.88rem;
  color: var(--cinza);
  flex: 1;
}

.ver {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--royal);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.ver svg {
  transition: transform 0.2s;
}

.card:hover .ver svg {
  transform: translateX(4px);
}
</style>
