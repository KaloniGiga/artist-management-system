"use client";
import { TableLayout } from "@web/components/core/data-table/TableLayout";
import { GenderEnum } from "@web/types/types";
import { artistColumns } from "./ArtistColumn";
import { Dialog, DialogTrigger } from "@web/components/ui/dialog";
import { Button } from "@web/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddEditArtistDialog } from "../dialogs/AddEditArtistDialog";

export function ArtistPage() {
  const data = [
    {
      id: 1,
      name: "dipak kalauni",
      dob: new Date("2022/01/3"),
      address: "kathmandu",
      gender: GenderEnum.MALE,
      first_release_year: 2020,
      no_of_albums_released: 3,
    },
    {
      id: 2,
      name: "dipak kalauni",
      dob: new Date("2022/01/3"),
      address: "kathmandu",
      gender: GenderEnum.MALE,
      first_release_year: 2019,
      no_of_albums_released: 2,
    },
  ];

  return (
    <TableLayout
      title={"Artist Table"}
      description={"This table contains list of all the aritst"}
      data={data}
      columns={artistColumns}
      loading={false}
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" className="ml-auto gap-1">
            Add
            <PlusCircle className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <AddEditArtistDialog isEdit={false} editData={null} />
      </Dialog>
    </TableLayout>
  );
}
