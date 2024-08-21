"use client";
import { ArtistData } from "@web/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { EditDeleteArtistOptions } from "./EditDeleteArtistOptions";

export const artistColumns: ColumnDef<ArtistData>[] = [
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
      const artist = row.original;

      return <EditDeleteArtistOptions rowData={artist} />;
    },
  },
];
