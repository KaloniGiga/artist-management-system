"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { DataTable } from "./DataTable";
import { ColumnDef } from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

interface ITableMetaData {
  title: string;
  description: string;
  children: React.ReactNode;
  onClickAdd: () => void;
}

type TableLayoutProps<TData, TValue> = DataTableProps<TData, TValue> &
  ITableMetaData;
export function TableLayout<TData, TValue>({
  title,
  description,
  children,
  columns,
  data,
}: TableLayoutProps<TData, TValue>) {
  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {children}
        </CardHeader>
        <CardContent>
          <DataTable data={data} columns={columns} />
        </CardContent>
      </Card>
    </div>
  );
}
