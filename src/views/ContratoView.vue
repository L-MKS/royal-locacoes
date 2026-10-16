<script setup>
import PageHeader from '../components/PageHeader.vue'

const regras = [
  'No ato da **RETIRADA DO MATERIAL**, efetuar a conferência dos itens e suas quantidades. Não serão aceitas reclamações posteriores.',
  'Respeitar os **PRAZOS DE ENTREGA**. A cada dia de atraso será gerada uma nova locação.',
  '**QUEBRAS** e **AVARIAS** dos itens devolvidos deverão ser ressarcidas pelo cliente sempre no ato da devolução.',
  'Todo material em **TECIDO** (toalhas, sobretoalhas, guardanapos etc.) que apresentar algum tipo de avaria (vela derretida, buracos de cigarro, líquido de pulseiras de neon) deverá ser ressarcido pelo cliente no valor constado no pedido.',
  'É importante estar presente no ato da **BUSCA DO MATERIAL** para efetuar a contagem dos itens. Em caso de ausência prevalece a nossa conferência, sem direito a reclamações posteriores.',
  'O material deverá ser devolvido **LIMPO**. Em caso de necessidade será cobrada uma **TAXA DE LIMPEZA**, que varia de acordo com os itens e suas quantidades.',
  'O material deverá ser devolvido em suas **RESPECTIVAS EMBALAGENS**. Se houver falta, o cliente deverá ressarcir esses itens.',
  'Os materiais em **METAL** (prata, alumínio ou inox) não devem ser lavados com **ESPONJAS ABRASIVAS** ou **DE AÇO**, nem com saponáceos ou semelhantes. Não devem ser levados **AO FOGO** em hipótese alguma.',
  'O serviço de **ENTREGAS** está disponível de segunda a sexta das 9h00 às 18h00 e sábado das 9h00 às 12h00. Entregas e buscas fora do horário, mediante prévia consulta diretamente com o entregador.',
  'Caso o cliente esqueça algum item no ato da devolução, é cobrado o valor especificado no contrato, e o valor é devolvido após a devolução do item.',
]

function formatar(texto) {
  return texto.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
}
</script>

<template>
  <div>
    <PageHeader titulo="Contrato" subtitulo="Regras e orientações para a locação dos materiais" />

    <section class="secao">
      <div class="container estreito">
        <div class="intro">
          <p>
            <strong>Caro cliente,</strong> com o objetivo de sempre melhorar nosso atendimento, solicitamos seguir as
            regras abaixo citadas:
          </p>
        </div>

        <ol class="regras">
          <li v-for="(r, i) in regras" :key="i">
            <span class="num">{{ String(i + 1).padStart(2, '0') }}</span>
            <p v-html="formatar(r)"></p>
          </li>
        </ol>

        <div class="pagamento">
          <h2>Opções de pagamento</h2>
          <div class="formas">
            <div class="forma">
              <h3>Retirada na empresa</h3>
              <p>Na retirada do material em nossa empresa, o cliente deve fazer o pagamento no ato da <strong>RETIRADA</strong>.</p>
            </div>
            <div class="forma">
              <h3>Serviço de entrega</h3>
              <p>No serviço de entregas, o cliente deve efetuar o pagamento no ato do <strong>RECEBIMENTO</strong> do material.</p>
            </div>
          </div>
        </div>

        <p class="fechamento">
          Pedimos a colaboração de todos, pois seguindo as orientações acima solicitadas, poderemos sempre atuar com
          <strong>preço justo</strong> em nossos produtos.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.estreito {
  max-width: 900px;
}

.intro {
  background: var(--branco);
  border-left: 5px solid var(--ouro);
  border-radius: var(--raio);
  padding: 22px 26px;
  box-shadow: var(--sombra);
  margin-bottom: 36px;
  font-size: 1.05rem;
}

.intro p {
  margin: 0;
}

.regras {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 14px;
}

.regras li {
  display: flex;
  gap: 18px;
  align-items: flex-start;
  background: var(--branco);
  border-radius: var(--raio);
  padding: 18px 22px;
  border: 1px solid rgba(3, 16, 147, 0.08);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.regras li:hover {
  border-color: var(--gelo);
  box-shadow: var(--sombra);
}

.num {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--royal);
  color: var(--ouro);
  font-family: var(--fonte-titulo);
  font-weight: 700;
}

.regras p {
  margin: 0;
  padding-top: 9px;
  color: #2c3150;
}

.regras :deep(strong) {
  color: var(--royal);
}

.pagamento {
  margin-top: 50px;
  padding: 36px;
  border-radius: var(--raio);
  background: linear-gradient(135deg, var(--royal), var(--royal-700));
  color: var(--branco);
}

.pagamento h2 {
  color: var(--ouro);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 1.4rem;
  text-align: center;
  margin-bottom: 24px;
}

.formas {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.forma {
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(200, 216, 240, 0.25);
  border-radius: 12px;
  padding: 20px 22px;
}

.forma h3 {
  color: var(--branco);
  font-size: 1.05rem;
}

.forma p {
  margin: 0;
  color: var(--gelo);
}

.forma strong {
  color: var(--ouro);
}

.fechamento {
  text-align: center;
  margin: 40px auto 0;
  max-width: 680px;
  font-size: 1.05rem;
  color: var(--cinza);
}

.fechamento strong {
  color: var(--royal);
}

@media (max-width: 640px) {
  .formas {
    grid-template-columns: 1fr;
  }
  .pagamento {
    padding: 26px 18px;
  }
  .regras li {
    padding: 16px;
    gap: 14px;
  }
  .num {
    width: 38px;
    height: 38px;
    font-size: 0.9rem;
  }
  .regras p {
    padding-top: 6px;
  }
}
</style>
