"use client";
import { TableLayout } from "@web/components/core/data-table/TableLayout";
import { GenreEnum } from "@web/types/types";
import { songColumns } from "./SongColumns";
import { usePathname } from "next/navigation";
import { Dialog, DialogTrigger } from "@web/components/ui/dialog";
import { Button } from "@web/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddEditSongDialog } from "../dialogs/AddEditSongDialog";

export function SongPage() {
  const pathname = usePathname();
  console.log(pathname);
  const data = [
    {
      id: 1,
      title: "dipak",
      album_name: "kalauni",
      genre: GenreEnum.CLASSIC,
    },
    {
      id: 2,
      title: "dipak",
      album_name: "kalauni",
      genre: GenreEnum.CLASSIC,
    },
    {
      id: 3,
      title: "dipak",
      album_name: "kalauni",
      genre: GenreEnum.CLASSIC,
    },
    {
      id: 4,
      title: "dipak",
      album_name: "kalauni",
      genre: GenreEnum.CLASSIC,
    },
    {
      id: 5,
      title: "dipak",
      album_name: "kalauni",
      genre: GenreEnum.CLASSIC,
    },
  ];

  return (
    <TableLayout
      title={"Songs List"}
      description={"This table contains the list of songs of artist."}
      onClickAdd={() => console.log("add clicked")}
      data={data}
      columns={songColumns}
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" className="ml-auto gap-1">
            Add
            <PlusCircle className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <AddEditSongDialog isEdit={false} editData={null} />
      </Dialog>
    </TableLayout>
  );
}
