"use client";
import { TableLayout } from "@web/components/core/data-table/TableLayout";
import { GenderEnum } from "@web/types/types";
import { artistColumns } from "./ArtistColumn";

export function ArtistPage() {
  const data = [
    {
      id: 1,
      name: "dipak kalauni",
      gender: GenderEnum.MALE,
      first_release_year: 2020,
      no_of_albums_released: 3,
    },
    {
      id: 2,
      name: "dipak kalauni",
      gender: GenderEnum.MALE,
      first_release_year: 2019,
      no_of_albums_released: 2,
    },
  ];

  return (
    <TableLayout
      title={"Artist"}
      description={""}
      onClickAdd={() => console.log("add clicked")}
      data={data}
      columns={artistColumns}
    />
  );
}
