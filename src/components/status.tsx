import React from 'react';

export const StatusCell = ({ status }: { status: string }) => {
  console.log('status: ', status);
  let statusClass = '';

  switch (status) {
    case 'SUCCESS':
      statusClass = 'text-success';
      break;
    case 'Inactive':
      statusClass = 'text-secondary';
      break;
    case 'PENDING':
      statusClass = 'text-warning';
      break;
    case 'Banned':
      statusClass = 'text-danger';
      break;
    default:
      statusClass = 'text-muted';
  }

  return <span className={statusClass}>{status}</span>;
};
