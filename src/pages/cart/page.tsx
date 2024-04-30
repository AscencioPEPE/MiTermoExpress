import { faker } from '@faker-js/faker';
import { Button, Divider, Image } from '@nextui-org/react';

const Cart = () => {
  const dummyStore = Array(10)
    .fill({})
    .map(() => ({
      id: crypto.randomUUID(),
      name: faker.commerce.product(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
      quantity: 1,
    }));

  return (
    <div className="flex w-full">
      <div className="flex w-2/3 flex-col justify-between gap-3 p-3">
        {dummyStore.map((product) => (
          <div key={product.id} className="w-full rounded-md bg-[#1A1A1A] py-5 shadow-lg">
            <div className="w-100 flex h-[100px] w-full items-center ">
              <div className="h-100 w-100 flex w-full items-center  gap-3 ">
                <Image
                  src="https://thermos.com/cdn/shop/products/SK2020MDB_PRES_1000px.png?v=1624023598"
                  classNames={{ img: 'size-[100px]' }}
                  alt="thermos"
                />
                <div className="flex flex-col gap-2">
                  <h3 className="text-softWhite/80">{product.name}</h3>
                  <p className="text-softWhite/50">{product.description}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-between rounded-lg border-1 border-softWhite/40">
                      <Button className="bg-transparent text-softWhite/80">+</Button>
                      <span className="text-softWhite/70">{product.quantity}</span>
                      <Button className="bg-transparent text-softWhite/80">-</Button>
                    </div>
                    <Button className="bg-transparent text-softWhite/80">Eliminar</Button>
                  </div>
                </div>
              </div>
              <div className="w-/3">
                <span className="text-softWhite/80">{`${product.price}`}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Divider orientation="vertical" className="mx-2 border-1 border-white bg-white text-white" />
      <div className="fixed right-0 w-1/3">
        <div className="flex flex-col p-3">
          <div className="flex flex-col justify-center gap-5 rounded-md bg-[#1A1A1A] px-2 py-5 shadow-lg">
            <div className="flex items-center gap-5">
              <span className="text-softWhite/60">{`Producto (${dummyStore.length}):`}</span>
              <span className="text-softWhite/80">$500</span>
            </div>
            <div className="flex items-center gap-5">
              <span className="text-softWhite/60">Envio:</span>
              <span className="text-softWhite/80">Gratis</span>
            </div>
            <Divider className="bg-softWhite/20" />
            <div className="flex items-center gap-5">
              <span className="text-softWhite/60">Total: </span>
              <span className="text-softWhite/80">{`${dummyStore.reduce((a, b) => a + Number(b.price), 0)}`}</span>
            </div>
            <Button className="bg-blue-500 font-bold text-white">Continuar compra</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
