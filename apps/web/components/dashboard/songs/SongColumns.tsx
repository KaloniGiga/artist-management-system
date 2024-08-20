"use client";
import { SongData } from "@web/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { ActionDropdown } from "@web/components/core/data-table/ActionDropdown";

export const songColumns: ColumnDef<SongData>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "title",
    header: "Tile",
  },
  {
    accessorKey: "album_name",
    header: "Album Name",
  },
  {
    accessorKey: "genre",
    header: "Genre",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return <ActionDropdown rowDataId={user.id} />;
    },
  },
];
