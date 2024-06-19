import { Columns } from '../../types/columns';
import { Chip } from '@nextui-org/chip';
export const columns: Columns[] = [
  {
    header: 'Name',
    accessorKey: 'name',
    active: true,
  },
  { header: 'Category', accessorKey: 'category', active: true },
  { header: 'Capacity', accessorKey: 'capacity', active: true },
  { header: 'Color', accessorKey: 'color', active: true },
  { header: 'Price', accessorKey: 'price', active: true },
  {
    header: 'Hexa Color',
    accessorKey: 'colorHex',
    active: true,
    cell: (ele: any) => (
      <Chip style={{ background: ele.getValue() }}>
        <span className="text-white">{ele.getValue()}</span>
      </Chip>
    ),
  },
  // { header: '', accessorKey: 'description', active: true },
  { header: '', accessorKey: 'actions', active: true },
];
