"use client";
import { GenderEnum, RoleEnum, UserData } from "@web/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { EditDeleteUserOptions } from "./EditDeleteUserOptions";
import { genderLabel, userRoleLabel } from "@web/lib/constant";

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
    cell: ({ getValue }) => {
      const value = getValue<RoleEnum>();
      return <div>{userRoleLabel[value]}</div>;
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ getValue }) => {
      const value = getValue<GenderEnum>();
      return <div>{genderLabel[value]}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return <EditDeleteUserOptions rowData={user} />;
    },
  },
];
