import React from 'react';
import { classNames } from '../lib/classes';

export const StatusCell = ({ status }: { status: string }) => {
  console.log('status: ', status);
  let statusClass = '';

  switch (status) {
    case 'paid':
      statusClass = 'text-success';
      break;
    case 'PENDING':
      statusClass = 'text-warning';
      break;
    case 'canceled':
      statusClass = 'text-danger';
      break;

    default:
      statusClass = 'text-muted';
  }

  return <span className={classNames(statusClass, 'uppercase')}>{status}</span>;
};
