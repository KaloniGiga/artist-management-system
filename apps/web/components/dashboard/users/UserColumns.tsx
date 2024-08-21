"use client";
import { UserData } from "@web/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { EditDeleteUserOptions } from "./EditDeleteUserOptions";

export const userColumns: ColumnDef<UserData>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "first_name",
    header: "Firstname",
  },
  {
    accessorKey: "last_name",
    header: "Lastname",
  },
  {
    accessorKey: "role_type",
    header: "Role",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return <EditDeleteUserOptions rowData={user} />;
    },
  },
];
