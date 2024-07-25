import { formattedPrice } from '../../lib/formater';
import { useOrdersCustomerQuery } from '../../services/useOrder';
import useUserStore from '../../zustand/user';
import { Accordion, AccordionItem, Button, Card, Image, Link, Pagination } from '@nextui-org/react';
import { Product } from '@/src/types/products';
import { ModalSimple } from '../../components/modal-simple';
import { ModalReLogin } from '../../components/modal-re-login';

const Orders = () => {
  const { currentUser } = useUserStore();
  const { data, isLoading, isError } = useOrdersCustomerQuery(currentUser?.email);

  if (isError) {
    return (
      <ModalSimple isOpen={isError} size="lg" className="bg-[#1A1A1A]">
        <ModalReLogin />
      </ModalSimple>
    );
  }

  const title = (product: Product, status: string) => {
    return (
      <div className="flex justify-between">
        <h3>{`${product?.name}`} </h3>
        <span>{`Status: ${status}`} </span>
      </div>
    );
  };

  const preview = (product: Product) => {
    return <Image src={product?.urlImage} className="size-[50px]" />;
  };

  return (
    <div className="flex flex-col gap-4  px-10 py-5">
      <Accordion>
        {data?.orders.slice(1).map((item, index) => (
          <AccordionItem
            className="mb-5"
            classNames={{ trigger: 'bg-[#0000007c] ' }}
            key={index}
            title={title(item?.products?.[0] as Product, item?.status)}
            startContent={preview(item?.products?.[0] as Product)}
          >
            {item.products.map((product, idx) => (
              <Card key={idx} className="flex w-full gap-3 bg-[#0f0e0eb1] p-4 lg:flex-row">
                <div className="w-[90px] min-w-[80px]">
                  <Image src={product.urlImage} alt={product.name} className="size-full object-contain" />
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-softWhite">{product.name}</h3>
                  </div>
                  <span className="text-sm text-white/70">color: {product.color}</span>
                  <span className="text-sm font-semibold text-white/75">price: {formattedPrice(product.price)}</span>
                  <p className="text-sm text-white/80">{product.description}</p>
                </div>
              </Card>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Orders;
