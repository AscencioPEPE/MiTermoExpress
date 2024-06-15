import { Link } from '@nextui-org/react';
import ReactTable from '../../components/react-table';
import { columns } from '../../components/table-columns/admin-columns';
import { faker } from '@faker-js/faker';

const Admin = () => {
  const foo = Array(4)
    .fill({})
    .map(() => ({
      id: crypto.randomUUID(),
      username: faker.person.fullName(),
    }));

  return (
    <div className="flex h-dvhContainer justify-center p-10">
      <div className="w-full space-y-6">
        <h2 className="text-2xl font-bold">List of admins </h2>
        <ReactTable columns={columns} data={foo} />
      </div>
    </div>
  );
};

export default Admin;
