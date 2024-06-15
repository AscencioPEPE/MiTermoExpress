import { RowData } from '@tanstack/react-table';
import DropdownActions from '../components/dropdown-actions';
export interface Column {
  header: string;
  active: boolean;
  accessorKey?: string;
  cell?: RowData;
}

export interface UseColumn<T> {
  columns: Column[];
  detailsHandler?: (item: T) => void;
  downloadHandler?: (item: T) => void;
  deleteHandler?: (item: T) => void;
  editHandler?: (item: T) => void;
}

export const useColumns = <T,>({
  columns,
  detailsHandler,
  deleteHandler,
  downloadHandler,
  editHandler,
}: UseColumn<T>) => {
  const columnsTable = [...columns].map((column) => {
    if (column.accessorKey !== 'actions') return { ...column };

    return {
      ...column,
      cell: ({ row: { original } }: { row: { original: T } }) => (
        <DropdownActions {...{ detailsHandler, original, downloadHandler, deleteHandler, editHandler }} />
      ),
    };
  });

  return { columnsTable };
};
