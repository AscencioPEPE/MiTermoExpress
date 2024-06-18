import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';

interface DropdownActionsProps<T> {
  original: T;
  detailsHandler?: (item: T) => void;
  downloadHandler?: (item: T) => void;
  deleteHandler?: (item: T) => void;
  editHandler?: (item: T) => void;
}

interface DropdownActionsTypes<T> {
  handler?: (item: T) => void;
  key: string;
  label: string;
}
const DropdownActions = <T,>(props: DropdownActionsProps<T>) => {
  const { detailsHandler, original, deleteHandler, downloadHandler, editHandler } = props;

  const dropdownActions = () => {
    const actions: JSX.Element[] = [];

    const addAction = ({ handler, key, label }: DropdownActionsTypes<T>) => {
      if (handler) {
        actions.push(
          <DropdownItem key={key} onClick={() => handler(original)} className={key === 'delete' ? 'text-danger' : ''}>
            {label}
          </DropdownItem>
        );
      }
    };

    addAction({ handler: detailsHandler, key: 'details', label: 'Detalles' });
    addAction({ handler: downloadHandler, key: 'download', label: 'Descargar' });
    addAction({ handler: editHandler, key: 'edit', label: 'Editar' });
    addAction({ handler: deleteHandler, key: 'delete', label: 'Eliminar' });

    return actions;
  };

  return (
    <Dropdown className="border border-white/20 bg-[#1A1A1A]">
      <DropdownTrigger className="hover:bg-[#0f0e0e8c]">
        <Button
          isIconOnly
          variant="ghost"
          className="border-none outline-none hover:bg-[#0f0e0e8c] focus:border-0 focus:outline-none"
        >
          <EllipsisVerticalIcon className="size-6 text-white/50" aria-hidden="true" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions">{dropdownActions()}</DropdownMenu>
    </Dropdown>
  );
};

export default DropdownActions;
