import { useState } from 'react';
import ReactTable from '../../../components/react-table';
import { useListProductQuery } from '../../../services/useProduct';
import { columns } from '../../../components/table-columns/products-columns';
import { useColumns } from '../../../hooks/useColumns';
import { Button } from '@nextui-org/react';
import { ModalSimple } from '../../../components/modal-simple';
import { ModalCreateProduct } from '../../../components/modal-create-product';
import { ModalReLogin } from '../../../components/modal-re-login';

const Products = () => {
  const { data: allProducts, isError } = useListProductQuery({ limit: 5000 });
  const { columnsTable } = useColumns({ columns });

  const [isOpenCreate, setIsOpenCreate] = useState(false);

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
      <ModalSimple isOpen={isOpenCreate} onClose={() => setIsOpenCreate(false)} size="3xl" className="bg-[#1A1A1A]">
        <ModalCreateProduct onClose={() => setIsOpenCreate(false)} />
      </ModalSimple>
    </div>
  );
};

export default Products;
