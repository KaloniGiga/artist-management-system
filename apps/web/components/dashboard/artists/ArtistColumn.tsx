"use client";
import { AritstData } from "@web/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { ActionDropdown } from "@web/components/core/data-table/ActionDropdown";

export const artistColumns: ColumnDef<AritstData>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "gender",
    header: "gender",
  },
  {
    accessorKey: "first_release_year",
    header: "First Release Year",
  },
  {
    accessorKey: "no_of_albums_released",
    header: "No of Albums Released",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return <ActionDropdown rowDataId={user.id} />;
    },
  },
];
