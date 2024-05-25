export const getBgColor = (color: string) => {
  const colors: { [key: string]: string } = {
    'azul marino': 'bg-[#001F3F]',
    morado: 'bg-[#800080]',
    negro: 'bg-[#000000]',
    rojo: 'bg-[#CB0A0A]',
    gris: 'bg-[#808080]',
    purpura: 'bg-[#800080]',
    rosa: 'bg-[#FFC0CB]',
    'verde militar': 'bg-[#556B2F]',
    amarillo: 'bg-[#FFFF00]',
    'azul cielo': 'bg-[#87CEEB]',
    naranja: 'bg-[#FFA500]',
  };

  return colors[color];
};
