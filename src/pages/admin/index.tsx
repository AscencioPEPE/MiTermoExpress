import { useListAdminsQuery, useDeleteAdminQuery } from '../../services/useAdmin';
import ReactTable from '../../components/react-table';
import { columns } from '../../components/table-columns/admin-columns';
import { useColumns } from '../../hooks/useColumns';
import { Button } from '@nextui-org/react';
import { ModalSimple } from '../../components/modal-simple';
import { ModalCreateAdmin } from '../../components/modal-create-admin';
import { useState, useEffect } from 'react';
import { ModalUpdateAdmin } from '../../components/modal-update-admin';
import useAdminStore from '../../zustand/admin';
import { AdminResponseApi } from '@/src/types/admin';
import { ModalConfirmation } from '../../components/modal-confirmation';

const Admin = () => {
  const { data: admins = [], refetch } = useListAdminsQuery();
  const { mutateAsync: deleteAdmin } = useDeleteAdminQuery();
  const { storageCurrentAdmin, currentAdmin } = useAdminStore();

  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const deleteHandler = (admin: AdminResponseApi) => {
    storageCurrentAdmin(admin);
    setIsOpenDelete(true);
  };

  const editHandler = (admin: AdminResponseApi) => {
    storageCurrentAdmin(admin);
    setIsOpenUpdate(true);
  };

  const { columnsTable } = useColumns({ columns, deleteHandler, editHandler });

  useEffect(() => {
    refetch();
  }, [admins]);

  return (
    <div className="flex h-dvhContainer justify-center p-10">
      <div className="w-full space-y-6">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">List of admins </h2>
          <Button className="bg-primary" onPress={() => setIsOpenCreate(true)}>
            Create new admin
          </Button>
        </div>
        <ReactTable columns={columnsTable} data={admins} showFooter limit={10} />
      </div>
      <ModalSimple isOpen={isOpenCreate} onClose={() => setIsOpenCreate(false)} size="lg" className="bg-[#1A1A1A] pb-5">
        <ModalCreateAdmin onClose={() => setIsOpenCreate(false)} />
      </ModalSimple>
      <ModalSimple isOpen={isOpenUpdate} onClose={() => setIsOpenUpdate(false)} size="lg" className="bg-[#1A1A1A] pb-5">
        <ModalUpdateAdmin onClose={() => setIsOpenUpdate(false)} />
      </ModalSimple>
      <ModalConfirmation
        title="Eliminar Administrador"
        isOpen={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        onOk={() => {
          deleteAdmin(currentAdmin.username);
          setIsOpenDelete(false);
        }}
        onOkText="Eliminar"
        content="Estas seguro de que deseas eliminar el administrador?"
      />
    </div>
  );
};

export default Admin;
