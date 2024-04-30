import { Accordion, AccordionItem, Checkbox, CheckboxGroup } from '@nextui-org/react';

interface SidebarProps {
  category: string;
  key: string | number;
  inputs: { name: string; type: string; id: string | number }[];
}

export const Sidebar = () => {
  const items: SidebarProps[] = [
    {
      key: 1,
      category: 'Price',
      inputs: [
        { name: 'High to low', type: 'checkbox', id: crypto.randomUUID() },
        { name: 'Low to high', type: 'checkbox', id: crypto.randomUUID() },
      ],
    },
    {
      key: 2,
      category: 'Category',
      inputs: [
        { name: 'Stanley', type: 'checkbox', id: crypto.randomUUID() },
        { name: 'Yeti', type: 'checkbox', id: crypto.randomUUID() },
      ],
    },
    {
      key: 3,
      category: 'Size',
      inputs: [
        { name: '15oz', type: 'checkbox', id: crypto.randomUUID() },
        { name: '20oz', type: 'checkbox', id: crypto.randomUUID() },
        { name: '30oz', type: 'checkbox', id: crypto.randomUUID() },
        { name: '40oz', type: 'checkbox', id: crypto.randomUUID() },
      ],
    },
  ];

  return (
    <div className="relative">
      <aside className="h-sidebar fixed mx-6 ">
        <Accordion
          selectionMode="multiple"
          isCompact
          className="flex h-full flex-col items-center justify-start rounded-xl bg-[#1A1A1A] p-5 shadow-xl"
        >
          {items.map((item) => (
            <AccordionItem
              key={item.key}
              title={item.category}
              classNames={{ title: 'text-white' }}
              className="m-0 w-full"
            >
              {item.inputs.map((input) => {
                return (
                  <div key={input.id} className="flex w-full items-center">
                    <CheckboxGroup>
                      <Checkbox classNames={{ label: 'text-white text-xs', wrapper: 'my-2' }}>{input.name}</Checkbox>
                    </CheckboxGroup>
                  </div>
                );
              })}
            </AccordionItem>
          ))}
        </Accordion>
      </aside>
    </div>
  );
};
