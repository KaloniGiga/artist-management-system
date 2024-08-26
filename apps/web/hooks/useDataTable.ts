import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

interface ITableMetaData {
  pageCount: number;
  page: number;
  limit: number;
}

type TableLayoutProps<TData, TValue> = DataTableProps<TData, TValue> &
  ITableMetaData;

export default function useDataTables<TData, TValue>({
  data,
  columns,
  pageCount,
  page,
  limit,
}: TableLayoutProps<TData, TValue>) {
  const [{ pageIndex, pageSize }] = useState({
    pageIndex: page - 1,
    pageSize: limit,
  });

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
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  });

  return { table };
}
