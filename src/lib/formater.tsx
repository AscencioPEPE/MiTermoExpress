export const formattedPrice = (number: number): string => {
  return number.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
};

export const formattedFixed = (number: number, decimals = 2): string => {
  return number?.toFixed(decimals);
};
