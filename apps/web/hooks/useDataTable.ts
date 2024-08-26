import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction, useMemo } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

interface ITableMetaData {
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  setPagination: Dispatch<
    SetStateAction<{ pageIndex: number; pageSize: number }>
  >;
}

type TableLayoutProps<TData, TValue> = DataTableProps<TData, TValue> &
  ITableMetaData;

export default function useDataTables<TData, TValue>({
  data,
  columns,
  pageCount,
  pageIndex,
  pageSize,
  setPagination,
}: TableLayoutProps<TData, TValue>) {
  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const table = useReactTable({
    pageCount,
    data,
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  });

  return { table };
}
