import { Columns } from '../../types/columns';

export const columns: Columns[] = [
  { header: 'ID', accessorKey: 'id', active: false },
  { header: 'User name', accessorKey: 'username', active: true },
  { header: 'Role', accessorKey: 'role', active: true },
  {
    header: '',
    accessorKey: 'actions',
    active: true,
  },
];
