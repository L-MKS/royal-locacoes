<script setup>
import { linkWhatsApp } from '../data/empresa'
</script>

<template>
  <a class="whats" :href="linkWhatsApp()" target="_blank" rel="noopener" aria-label="Falar com a Royal Locações pelo WhatsApp" title="Fale conosco pelo WhatsApp" >
    <span class="rotulo">Fale conosco pelo WhatsApp</span>
    <span class="botao">
      <span class="onda" aria-hidden="true"></span>
      <span class="onda onda-2" aria-hidden="true"></span>
      <svg viewBox="0 0 32 32" width="42" height="42" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.004 3C8.832 3 3 8.83 3 16c0 2.29.6 4.53 1.74 6.5L3 29l6.68-1.71A12.96 12.96 0 0 0 16.004 29C23.17 29 29 23.17 29 16S23.17 3 16.004 3Zm0 23.64c-2 0-3.96-.54-5.67-1.56l-.41-.24-3.96 1.02 1.05-3.86-.27-.4A10.6 10.6 0 0 1 5.37 16c0-5.86 4.77-10.63 10.64-10.63 5.86 0 10.62 4.77 10.62 10.63 0 5.87-4.77 10.64-10.63 10.64Zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66 0 1.57 1.14 3.09 1.3 3.3.16.21 2.25 3.43 5.45 4.81.76.33 1.35.52 1.81.67.76.24 1.46.21 2.01.13.61-.09 1.89-.77 2.15-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z"
        />
      </svg>
    </span>
  </a>
</template>

<style scoped>
.whats {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.botao {
  position: relative;
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: #25d366;
  color: #fff;
  display: grid;
  place-items: center;
  border: 4px solid #fff;
  box-shadow: 0 12px 30px -6px rgba(0, 0, 0, 0.45);
  transition: transform 0.2s, background 0.2s;
  animation: chamar 10s ease-in-out infinite;
}

.whats:hover .botao {
  background: #1ebe5b;
  transform: scale(1.1);
  animation-play-state: paused;
}

.onda {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 4px solid #25d366;
  opacity: 0;
  pointer-events: none;
  animation: onda 10s ease-out infinite;
}

.onda-2 {
  animation-delay: 0.35s;
}

.rotulo {
  background: #fff;
  color: #128c4b;
  font-weight: 700;
  font-size: 0.95rem;
  padding: 10px 18px;
  border-radius: 999px;
  box-shadow: 0 8px 22px -8px rgba(0, 0, 0, 0.35);
  border: 2px solid #25d366;
  white-space: nowrap;
  animation: rotulo 10s ease-in-out infinite;
}

.whats:hover .rotulo {
  opacity: 1;
  transform: none;
  animation: none;
}

@keyframes chamar {
  0%, 12%, 100% { transform: scale(1) rotate(0); }
  2% { transform: scale(1.15) rotate(-12deg); }
  4% { transform: scale(1.15) rotate(12deg); }
  6% { transform: scale(1.15) rotate(-10deg); }
  8% { transform: scale(1.15) rotate(8deg); }
  10% { transform: scale(1.05) rotate(0); }
}

@keyframes onda {
  0% { transform: scale(1); opacity: 0.8; }
  15% { transform: scale(1.9); opacity: 0; }
  100% { transform: scale(1.9); opacity: 0; }
}

@keyframes rotulo {
  0% { opacity: 0; transform: translateX(10px); }
  3%, 45% { opacity: 1; transform: none; }
  50%, 100% { opacity: 0; transform: translateX(10px); }
}

@media (max-width: 600px) {
  .whats {
    right: 16px;
    bottom: 16px;
  }
  .botao {
    width: 66px;
    height: 66px;
  }
  .botao svg {
    width: 36px;
    height: 36px;
  }
  .rotulo {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .botao,
  .onda,
  .rotulo {
    animation: none;
  }
  .rotulo {
    opacity: 1;
  }
}
</style>
