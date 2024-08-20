"use client";
import { TableLayout } from "@web/components/core/data-table/TableLayout";
import { GenreEnum } from "@web/types/types";
import { songColumns } from "./SongColumns";
import { usePathname } from "next/navigation";

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
      description={""}
      onClickAdd={() => console.log("add clicked")}
      data={data}
      columns={songColumns}
    />
  );
}
