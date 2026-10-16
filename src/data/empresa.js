export const empresa = {
  nome: 'Royal Locações',
  slogan: 'Soluções para o seu evento',
  endereco: 'Rua Santa Clara, 26, Ahú, Curitiba-PR',
  telefone: '(41) 9 9125-3081',
  telefoneLink: 'tel:+5541991253081',
  whatsapp: '5541991253081',
  email: 'royallocacoes.contato@gmail.com',
  expediente: [
    'De Seg. à Sex das 10:00 às 17:00',
    'Sáb. das 10:00 às 12:00',
  ],
  mapaEmbed:
    'https://www.google.com/maps?q=' +
    encodeURIComponent('Rua Santa Clara, 26 - Ahú, Curitiba - PR') +
    '&output=embed',
  mapaLink:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Rua Santa Clara, 26 - Ahú, Curitiba - PR'),
}

export function linkWhatsApp(mensagem = 'Olá! Vim pelo site da Royal Locações e gostaria de um orçamento.') {
  const texto = encodeURIComponent(mensagem)
  const mobile = typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
  return mobile
    ? `https://wa.me/${empresa.whatsapp}?text=${texto}`
    : `https://web.whatsapp.com/send?phone=${empresa.whatsapp}&text=${texto}`
}
