export interface SidebarProps {
  label: string;
  category: string;
  key: string | number;
  inputs: { name: string; value: string; type: string; id: string | number }[];
}

export const items: SidebarProps[] = [
  {
    key: 1,
    label: 'Price',
    category: 'priceOrder',
    inputs: [
      { name: 'High to low', value: 'desc', type: 'radio', id: crypto.randomUUID() },
      { name: 'Low to high', value: 'asc', type: 'radio', id: crypto.randomUUID() },
    ],
  },
  {
    key: 2,
    label: 'Category',
    category: 'categories',
    inputs: [
      { name: 'Stanley', value: 'Stanley', type: 'checkbox', id: crypto.randomUUID() },
      { name: 'Yeti', value: 'Yeti', type: 'checkbox', id: crypto.randomUUID() },
    ],
  },
  {
    key: 3,
    label: 'Size',
    category: 'sizes',
    inputs: [
      { name: '15oz', value: '15', type: 'checkbox', id: crypto.randomUUID() },
      { name: '20oz', value: '20', type: 'checkbox', id: crypto.randomUUID() },
      { name: '30oz', value: '30', type: 'checkbox', id: crypto.randomUUID() },
      { name: '40oz', value: '40', type: 'checkbox', id: crypto.randomUUID() },
    ],
  },
];
