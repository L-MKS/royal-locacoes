<script setup>
const props = defineProps({
  modelValue: { type: Number, required: true },
  pequeno: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue'])

function mudar(valor) {
  emit('update:modelValue', Math.max(0, Math.floor(Number(valor) || 0)))
}
</script>

<template>
  <div class="qtd" :class="{ pequeno }" @click.stop>
    <button type="button" :aria-label="modelValue <= 1 ? 'Remover' : 'Diminuir'" @click="mudar(props.modelValue - 1)">
      <svg v-if="modelValue <= 1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" /></svg>
      <span v-else>−</span>
    </button>
    <input
      type="number"
      min="1"
      inputmode="numeric"
      :value="modelValue"
      aria-label="Quantidade"
      @change="mudar($event.target.value)"
    />
    <button type="button" aria-label="Aumentar" @click="mudar(props.modelValue + 1)">+</button>
  </div>
</template>

<style scoped>
.qtd {
  display: inline-flex;
  align-items: center;
  border: 2px solid var(--royal);
  border-radius: 999px;
  overflow: hidden;
  background: var(--branco);
}

button {
  width: 38px;
  height: 38px;
  border: 0;
  background: var(--royal);
  color: var(--branco);
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: background 0.2s;
}

button:hover {
  background: var(--royal-700);
}

input {
  width: 52px;
  height: 38px;
  border: 0;
  text-align: center;
  font: inherit;
  font-weight: 700;
  color: var(--royal-900);
  -moz-appearance: textfield;
  appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input:focus {
  outline: none;
  background: var(--royal-50);
}

.pequeno button {
  width: 32px;
  height: 32px;
  font-size: 1rem;
}

.pequeno input {
  width: 40px;
  height: 32px;
  font-size: 0.9rem;
}
</style>
