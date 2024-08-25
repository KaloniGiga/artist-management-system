"use client";
import { GenreEnum, SongData } from "@web/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { EditDeleteSongOptions } from "./EditDeleteSongOption";
import { genreLabel } from "@web/lib/constant";

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
    cell: ({ getValue }) => {
      const value = getValue<GenreEnum>();
      return <div>{genreLabel[value]}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const song = row.original;

      return <EditDeleteSongOptions rowData={song} />;
    },
  },
];
