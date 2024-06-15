import { Columns } from '../../types/columns';
import { StatusCell } from '../status';

export const columns: Columns[] = [
  {
    header: 'Status',
    accessorKey: 'status',
    active: true,
    cell: (ele: any) => <StatusCell status={ele.getValue()} />,
  },
  { header: 'Customer', accessorKey: 'customerName', active: true },
  { header: 'Phone', accessorKey: 'customerPhone', active: true },
  { header: 'Email', accessorKey: 'customerEmail', active: true },
  { header: 'Address', accessorKey: 'customerAddress', active: true },
  { header: 'CreatedAt', accessorKey: 'registeredDate', active: true },
  { header: 'UpdateAt', accessorKey: 'updateDate', active: true },
  { header: '', accessorKey: 'actions', active: true },
];
