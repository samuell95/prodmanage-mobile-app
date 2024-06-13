import { formatCurrency } from './formatCurrency';

describe('formatCurrency', () => {
  it('deve formatar o número 1000 como moeda BRL', () => {
    const resultado = formatCurrency(1000);
    expect(resultado).toBe('R$1.000,00');
  });

  it('deve formatar o número 0 como moeda BRL', () => {
    const resultado = formatCurrency(0);
    expect(resultado).toBe('R$0,00');
  });

  it('deve falhar para um formato incorreto', () => {
    const resultado = formatCurrency(1234567.89); 
    expect(resultado).toBe('R$1.234.567,89');
  });
});