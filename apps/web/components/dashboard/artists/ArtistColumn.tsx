"use client";
import { ArtistData, GenderEnum } from "@web/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { EditDeleteArtistOptions } from "./EditDeleteArtistOption";
import { genderLabel } from "@web/lib/constant";
import Link from "next/link";

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
    cell: ({ getValue }) => {
      const value = getValue<GenderEnum>();
      return <div>{genderLabel[value]}</div>;
    },
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

      return (
        <div className="flex gap-4 items-center justify-center">
          <div>
            <Link
              className="hover:text-[blue]"
              href={`/dashboard/songs/${artist.id}`}
            >
              View Songs
            </Link>
          </div>
          <EditDeleteArtistOptions rowData={artist} />
        </div>
      );
    },
  },
];
