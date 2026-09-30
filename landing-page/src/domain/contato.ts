/**
 * Domínio: contato da barbearia.
 *
 * TODO: substituir o placeholder pelo número real assim que a Evolution API
 * estiver conectada a um chip de teste (Fase 3 do roteiro). Até lá, este
 * número não recebe mensagens reais.
 *
 * Formato exigido pelo link wa.me: código do país + DDD + número, só dígitos,
 * sem espaços, traços ou o símbolo "+".
 */
const WHATSAPP_NUMERO = '5511999999999';

const MENSAGEM_PADRAO =
  'Olá! Vim pelo site da Legacy Barber e gostaria de agendar um horário.';

/**
 * Monta a URL do wa.me. Mensagem é opcional — quando omitida, usa a padrão.
 * encodeURIComponent é obrigatório aqui: sem ele, espaços e acentos quebram
 * a URL ou chegam corrompidos do lado do WhatsApp.
 */
export function montarLinkWhatsapp(mensagem: string = MENSAGEM_PADRAO): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
}

/**
 * Perfil fictício — não existe de fato, é só para preencher o rodapé
 * dentro do escopo didático do projeto.
 */
export const INSTAGRAM_URL = 'https://instagram.com/legacybarber';