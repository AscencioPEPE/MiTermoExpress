export const formattedPrice = (number: number): string => {
  return number.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
};

export const formattedFixed = (number: number): string => {
  return number?.toFixed(2);
};
