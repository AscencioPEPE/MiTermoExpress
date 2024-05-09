import { Accordion, AccordionItem, Button, Checkbox, CheckboxGroup, Radio, RadioGroup } from '@nextui-org/react';
import { ModalSimple } from '../components/modal-simple';
import { useState } from 'react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
interface SidebarProps {
  label: string;
  category: string;
  key: string | number;
  inputs: { name: string; value: string; type: string; id: string | number }[];
}

interface ISidebar {
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
  filters: string[];
}

export const Sidebar = ({ filters, setFilters }: ISidebar) => {
  const [isOpenFilters, setIsOpenFilter] = useState(false);
  const [radioValue, setRadioValue] = useState('asc');

  const items: SidebarProps[] = [
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

  return (
    <>
      <div className="relative hidden md:inline">
        <aside className="md:fixed md:mx-6 md:h-sidebar">
          <Accordion
            selectionMode="multiple"
            isCompact
            className="flex h-full flex-col items-center justify-start rounded-xl bg-[#1A1A1A]  shadow-xl"
          >
            {items.map((item) => (
              <AccordionItem
                key={item.key}
                title={item.label}
                classNames={{ title: 'text-white' }}
                className="m-0 w-full"
              >
                {item.inputs.map((input) => {
                  if (item.category === 'priceOrder') {
                    return (
                      <RadioGroup
                        key={input.id}
                        value={radioValue}
                        onValueChange={(e) => {
                          setRadioValue(e);
                          setFilters((prevState) => {
                            /**
                             * Delete any value with priceOrder
                             */
                            const updatedFilters = prevState.filter((state: string) => !state.includes('priceOrder'));
                            /**
                             * Add to array the new item selected
                             */
                            updatedFilters.push(`${item.category}=${input.value}`);
                            // delete the others values duplicates generates by this function
                            const deleteDuplicates = Array.from(new Set(updatedFilters));

                            return deleteDuplicates;
                          });
                        }}
                      >
                        <Radio value={input.value} classNames={{ label: 'text-white text-xs', wrapper: 'my-2' }}>
                          {input.name}
                        </Radio>
                      </RadioGroup>
                    );
                  }

                  return (
                    <div key={input.id} className="flex w-full items-center">
                      <CheckboxGroup onChange={setFilters} value={filters}>
                        <Checkbox
                          value={`${item.category}=${input.value}`}
                          classNames={{ label: 'text-white text-xs', wrapper: 'my-2' }}
                        >
                          {input.name}
                        </Checkbox>
                      </CheckboxGroup>
                    </div>
                  );
                })}
              </AccordionItem>
            ))}
          </Accordion>
        </aside>
      </div>

      <div className="relative inline md:hidden">
        <Button
          className="flex w-full gap-3 rounded-none border-1 bg-[#1A1A1A] font-bold text-softWhite outline-none hover:outline-none focus:outline-none"
          onPress={() => setIsOpenFilter(true)}
        >
          Filtrar productos por:
          <AdjustmentsHorizontalIcon className="size-[20px]" />
        </Button>
        <aside className="md:fixed md:mx-6 md:h-sidebar">
          <ModalSimple
            isOpen={isOpenFilters}
            placement="top"
            size="5xl"
            className="bg-[#1A1A1A]"
            onClose={() => setIsOpenFilter(false)}
          >
            <Accordion
              selectionMode="multiple"
              isCompact
              className="flex h-full flex-col items-center justify-start rounded-xl bg-[#1A1A1A]  shadow-xl "
            >
              {items.map((item) => (
                <AccordionItem
                  key={item.key}
                  title={item.label}
                  classNames={{ title: 'text-white' }}
                  className="m-0 w-full outline-none hover:outline-none focus:outline-none"
                >
                  {item.inputs.map((input) => {
                    if (item.category === 'priceOrder') {
                      return (
                        <RadioGroup
                          key={input.id}
                          value={radioValue}
                          onValueChange={(e) => {
                            setRadioValue(e);
                            setFilters((prevState) => {
                              /**
                               * Delete any value with priceOrder
                               */
                              const updatedFilters = prevState.filter((state: string) => !state.includes('priceOrder'));
                              /**
                               * Add to array the new item selected
                               */
                              updatedFilters.push(`${item.category}=${input.value}`);
                              // delete the others values duplicates generates by this function
                              const deleteDuplicates = Array.from(new Set(updatedFilters));

                              return deleteDuplicates;
                            });
                          }}
                        >
                          <Radio value={input.value} classNames={{ label: 'text-white text-xs', wrapper: 'my-2' }}>
                            {input.name}
                          </Radio>
                        </RadioGroup>
                      );
                    }

                    return (
                      <div key={input.id} className="flex w-full items-center">
                        <CheckboxGroup onChange={setFilters} value={filters}>
                          <Checkbox
                            value={`${item.category}=${input.value}`}
                            classNames={{ label: 'text-white text-xs', wrapper: 'my-2' }}
                          >
                            {input.name}
                          </Checkbox>
                        </CheckboxGroup>
                      </div>
                    );
                  })}
                </AccordionItem>
              ))}
            </Accordion>
          </ModalSimple>
        </aside>
      </div>
    </>
  );
};
