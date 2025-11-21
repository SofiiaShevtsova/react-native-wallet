export const formatAmount = (amount: number, style: 'currency' | 'decimal' = 'currency') => {
  return new Intl.NumberFormat('uk-UA', {
    style: style,
    currency: 'UAH',
    minimumFractionDigits: 2,
  }).format(amount);
};
