"use client";
import { SongData } from "@web/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { EditDeleteSongOptions } from "./EditDeleteSongOption";

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
      const song = row.original;

      return <EditDeleteSongOptions rowData={song} />;
    },
  },
];
