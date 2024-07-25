import { useState } from 'react';
import ReactTable from '../../../components/react-table';
import { useListProductQuery, useRemoveProductQuery } from '../../../services/useProduct';
import { columns } from '../../../components/table-columns/products-columns';
import { useColumns } from '../../../hooks/useColumns';
import { Button } from '@nextui-org/react';
import { ModalSimple } from '../../../components/modal-simple';
import { ModalCreateProduct } from '../../../components/modal-create-product';
import { ModalReLogin } from '../../../components/modal-re-login';
import { Product } from '@/src/types/products';
import { ModalConfirmation } from '../../../components/modal-confirmation';
import useProductStore from '../../../zustand/product';
import { ModalUpdateProduct } from '../../../components/modal-update-product';

const Products = () => {
  const { data: allProducts, isError } = useListProductQuery({ limit: 5000 });
  const { mutateAsync: deleteProduct } = useRemoveProductQuery();
  const { currentProduct, removeCurrentProduct, storageCurrentProduct } = useProductStore();

  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const deleteHandler = (product: Product) => {
    storageCurrentProduct(product);
    setIsOpenDelete(true);
  };

  const editHandler = (product: Product) => {
    storageCurrentProduct(product);
    setIsOpenUpdate(true);
  };

  const { columnsTable } = useColumns({ columns, deleteHandler, editHandler });

  if (isError) {
    return (
      <ModalSimple isOpen={isError} size="lg" className="bg-[#1A1A1A]">
        <ModalReLogin />
      </ModalSimple>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div className="mb-5 flex w-full items-center justify-between ">
        <h2 className="w-full text-start text-lg font-bold">List of products</h2>
        <Button onPress={() => setIsOpenCreate(true)} className="bg-primary">
          Create product
        </Button>
      </div>
      <ReactTable data={allProducts?.products ?? []} columns={columnsTable} showFooter limit={5} />
      <ModalSimple isOpen={isOpenCreate} onClose={() => setIsOpenCreate(false)} size="4xl" className="bg-[#1A1A1A]">
        <ModalCreateProduct onClose={() => setIsOpenCreate(false)} />
      </ModalSimple>
      <ModalSimple isOpen={isOpenUpdate} onClose={() => setIsOpenUpdate(false)} size="4xl" className="bg-[#1A1A1A]">
        <ModalUpdateProduct onClose={() => setIsOpenUpdate(false)} />
      </ModalSimple>
      <ModalConfirmation
        title="Eliminar Producto"
        isOpen={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        onOk={() => {
          deleteProduct(currentProduct.sku);
          removeCurrentProduct();
          setIsOpenDelete(false);
        }}
        onOkText="Eliminar"
        content="Estas seguro de que deseas eliminar el administrador?"
      />
    </div>
  );
};

export default Products;
