export const quantities = Array.from({ length: 10 }, (_, i) => {
  const value = i + 1;
  return {
    label: value === 10 ? '+10' : value.toString(),
    key: value === 10 ? '+10' : value.toString(),
    value: value === 10 ? '+10' : value.toString(),
  };
});
