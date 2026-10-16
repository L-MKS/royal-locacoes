<script setup>
defineProps({
  titulo: { type: String, required: true },
  subtitulo: { type: String, default: '' },
})
</script>

<template>
  <section class="cabecalho">
    <div class="container">
      <slot name="antes" />
      <h1>{{ titulo }}</h1>
      <p v-if="subtitulo">{{ subtitulo }}</p>
    </div>
  </section>
</template>

<style scoped>
.cabecalho {
  position: relative;
  overflow: hidden;
  background: radial-gradient(circle at 85% 20%, rgba(200, 216, 240, 0.18), transparent 40%), linear-gradient(135deg, var(--royal) 0%, var(--royal-700) 100%);
  color: var(--branco);
  padding: 64px 0 56px;
  text-align: center;
}

.cabecalho::before,
.cabecalho::after {
  content: '';
  position: absolute;
  border: 2px solid rgba(200, 216, 240, 0.18);
  border-radius: 50%;
  pointer-events: none;
}
.cabecalho::before {
  width: 360px;
  height: 360px;
  right: -120px;
  top: -160px;
}
.cabecalho::after {
  width: 260px;
  height: 260px;
  left: -90px;
  bottom: -150px;
}

h1 {
  color: var(--branco);
  font-size: clamp(1.9rem, 4.5vw, 3rem);
  margin-bottom: 10px;
}

p {
  max-width: 640px;
  margin: 0 auto;
  color: var(--gelo);
}
</style>
