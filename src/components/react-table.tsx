'use client';

import { Button } from '@nextui-org/react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { FaArrowDownWideShort, FaArrowUpWideShort } from 'react-icons/fa6';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './table';
import { Column } from '../hooks/useColumns';

interface RTableProps<T> {
  children?: React.ReactNode;
  data: T[];
  columns: Column[];
  setPage?: (page: number) => void;
  setLimit?: (limit: number) => void;
  limit?: number;
  q?: string;
  setQ?: (q: string) => void;
  searchHandler?: (e: string) => void;
  modal?: string;
  caption?: string;
  showFooter?: boolean;
}

const RTable = <T,>({ data, columns, limit, q, caption, showFooter }: RTableProps<T>) => {
  const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [visibleColumns, setVisibleColumns] = useState<{ header: string; active: boolean }[]>(columns);

  const table = useReactTable({
    data: data,
    columns: visibleColumns?.filter((item) => item.active),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: q,
    },
    onSortingChange: setSorting,
    // onGlobalFilterChange: setQ,
    // debugTable: true,
  });

  useEffect(() => {
    if (limit) {
      table?.setPageSize(Number(limit));
    } else {
      table?.setPageSize(50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  return (
    <>
      <Table className="overflow-auto rounded-lg bg-[#1A1A1A]">
        <TableCaption>{caption}</TableCaption>
        <TableHeader className=" rounded-lg bg-[#2b2828ca]">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="">
              {headerGroup.headers.map((header) => (
                <TableHead
                  className="text-muted border-0 border-b-0 px-2 py-0 text-opacity-80"
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div className="flex flex-row items-center justify-start gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === 'asc' ? (
                          <FaArrowUpWideShort />
                        ) : (
                          <FaArrowDownWideShort />
                        )
                      ) : null}
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table?.getRowModel()?.rows.map((row) => (
            <TableRow key={row.id} className="h-[40px] border-0 border-b-0 hover:bg-[#1f1f1f]">
              {row?.getVisibleCells()?.map((cell) => (
                <TableCell className="text-muted text-opacity-50" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {showFooter && (
        <div className="flex w-full items-center justify-between">
          <div>
            <p className="text-muted text-opacity-50">
              Showing <b>{table.getState().pagination.pageIndex + 1}</b> to{' '}
              <b>{table.getState().pagination.pageSize}</b> of <b>{table.getPageCount()}</b> results
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => table.previousPage()}
              className={`${!table.getCanPreviousPage() ? 'bg-muted/10  text-muted/30' : 'text-muted/80 bg-[#1A1A1A] '} w-[80px] rounded  border-0 p-2 shadow-md`}
              disabled={!table.getCanPreviousPage()}
            >
              <span>Previous</span>
            </Button>
            <Button
              onClick={() => table.nextPage()}
              className={`${!table.getCanNextPage() ? 'bg-muted/10  text-muted/30 ' : 'text-muted/80 bg-[#1A1A1A] '} w-[80px] rounded  border-0 p-2 shadow-md`}
              disabled={!table.getCanNextPage()}
            >
              <span>Next</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default RTable;
