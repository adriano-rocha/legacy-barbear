/**
 * Domínio: Serviços da barbearia.
 *
 * Fonte da verdade: docs/spec-negocio.md, seção 2 (Catálogo de serviços).
 * Qualquer alteração de preço/duração/serviço deve começar pela spec,
 * não por este arquivo — este arquivo apenas reflete o que já foi decidido.
 *
 * Este módulo não conhece Vue, DOM ou qualquer detalhe de apresentação.
 * Componentes consomem estes dados prontos; formatação de exibição
 * (ex: "R$ 45,00") é responsabilidade da camada de apresentação, não daqui.
 */

export interface Servico {
  readonly id: string;
  readonly nome: string;
  readonly duracaoMinutos: number;
  readonly precoEmCentavos: number;
  readonly destaque?: boolean;
}

/**
 * Preço é armazenado em centavos (inteiro), não em reais (float).
 * Isso evita a classe inteira de bugs de arredondamento de ponto flutuante
 * ao somar ou comparar valores monetários (ex: 0.1 + 0.2 !== 0.3 em JS).
 * A conversão para exibição ("R$ 45,00") fica a cargo de uma função
 * de formatação na camada de apresentação — nunca fazemos essa conta
 * "no meio do template" de um componente.
 */

export const SERVICOS: readonly Servico[] = [
  {
    id: 'corte-tradicional',
    nome: 'Corte tradicional',
    duracaoMinutos: 30,
    precoEmCentavos: 4_500,
  },
  {
    id: 'corte-barba',
    nome: 'Corte + barba',
    duracaoMinutos: 50,
    precoEmCentavos: 7_000,
    destaque: true,
  },
  {
    id: 'barba',
    nome: 'Barba',
    duracaoMinutos: 25,
    precoEmCentavos: 3_500,
  },
  {
    id: 'sobrancelha',
    nome: 'Sobrancelha (navalha)',
    duracaoMinutos: 10,
    precoEmCentavos: 1_500,
  },
  {
    id: 'corte-infantil',
    nome: 'Corte infantil (até 12 anos)',
    duracaoMinutos: 30,
    precoEmCentavos: 4_000,
  },
] as const;

/**
 * Formata centavos para o padrão monetário brasileiro (ex: 4500 -> "R$ 45,00").
 * Usa Intl.NumberFormat em vez de concatenação manual de string: cobre
 * separador de milhar, vírgula decimal e símbolo de moeda corretamente,
 * sem reinventar regras de localização.
 */
export function formatarPreco(precoEmCentavos: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(precoEmCentavos / 100);
}

/**
 * Busca um serviço pelo id. Retorna `undefined` explicitamente em vez de
 * lançar exceção — chamar código com um id inválido é um erro de uso
 * previsível (ex: link quebrado, id digitado errado), não uma condição
 * excepcional que deva interromper o fluxo. Quem chama decide o que fazer
 * com o `undefined` (mostrar fallback, ignorar, logar).
 */
export function buscarServicoPorId(id: string): Servico | undefined {
  return SERVICOS.find((servico) => servico.id === id);
}