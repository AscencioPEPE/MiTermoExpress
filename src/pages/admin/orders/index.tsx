import { Link, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';

const columns = [
  {
    id: crypto.randomUUID(),
    name: 'Hola',
    email: 'hola@test.com',
    orders: [
      {
        status: 'Paid',
        id: crypto.randomUUID(),
        productName: 'Thermos',
      },
    ],
  },
  {
    name: 'actions',
  },
];

// const user

const AdminOrders = () => {
  return (
    <div className="flex h-dvhContainer items-center justify-center">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.id} align={column.name === 'actions' ? 'center' : 'start'}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={[]}>
          {(item) => (
            <TableRow key={item.id}>
              <></>
              {/* {(columnKey) => {
                return <TableCell>{renderCell(item, columnKey)}</TableCell>;
              }} */}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminOrders;
