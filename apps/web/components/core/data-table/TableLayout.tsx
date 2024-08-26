"use client";
import { Dispatch, SetStateAction } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { DataTable } from "./DataTable";
import { ColumnDef } from "@tanstack/react-table";
import useDataTables from "@web/hooks/useDataTable";
import { Loader2 } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

interface ITableMetaData {
  title: string;
  description: string;
  children: React.ReactNode;
  loading: boolean;
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  setPagination: Dispatch<
    SetStateAction<{ pageIndex: number; pageSize: number }>
  >;
}

type TableLayoutProps<TData, TValue> = DataTableProps<TData, TValue> &
  ITableMetaData;
export function TableLayout<TData, TValue>({
  title,
  description,
  children,
  columns,
  data,
  loading,
  pageCount,
  pageIndex,
  pageSize,
  setPagination,
}: TableLayoutProps<TData, TValue>) {
  const { table } = useDataTables({
    data,
    columns,
    pageCount,
    pageIndex,
    pageSize,
    setPagination,
  });
  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader className="flex flex-row justify-between items-center">
          <div className="grid gap-2">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {children}
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <DataTable columnsLength={columns.length} table={table} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
