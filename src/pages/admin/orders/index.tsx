import { useAllOrdersQuery } from '../../../services/useOrder';
import { columns } from '../../../components/table-columns/admin-orders-columns';
import NestedTable from '../../../components/nested-table';
import { useColumns } from '../../../hooks/useColumns';

const AdminOrders = () => {
  const { data = [], isLoading } = useAllOrdersQuery();

  const deleteVoidData = data.filter((d) => d.status !== '' && d.products.length > 0);

  const { columnsTable } = useColumns({ columns });

  return (
    <div className="flex  flex-col items-center justify-center p-10">
      <h2 className="mb-5 w-full text-start text-2xl font-bold">All Orders</h2>
      <NestedTable columns={columnsTable} data={deleteVoidData} showFooter />
    </div>
  );
};

export default AdminOrders;
