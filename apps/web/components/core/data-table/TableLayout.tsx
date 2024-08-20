"use client";
import { PlusCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { DataTable } from "./DataTable";
import { ColumnDef } from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

interface ITableMetaData {
  title: string;
  description: string;
  onClickAdd: () => void;
}

type TableLayoutProps<TData, TValue> = DataTableProps<TData, TValue> &
  ITableMetaData;
export function TableLayout<TData, TValue>({
  title,
  description,
  onClickAdd,
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
          <Button size="sm" className="ml-auto gap-1" onClick={onClickAdd}>
            Add
            <PlusCircle className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable data={data} columns={columns} />
        </CardContent>
      </Card>
    </div>
  );
}
