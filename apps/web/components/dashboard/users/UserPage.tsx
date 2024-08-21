"use client";
import { TableLayout } from "@web/components/core/data-table/TableLayout";
import { userColumns } from "./UserColumns";
import { GenderEnum, RoleEnum } from "@web/types/types";
import { Dialog, DialogTrigger } from "@web/components/ui/dialog";
import { Button } from "@web/components/ui/button";
import { PlusCircle } from "lucide-react";
import AddEditUserDialog from "../dialogs/AddEditUserDialog";

export function UserPage() {
  const data = [
    {
      id: 1,
      first_name: "dipak",
      last_name: "kalauni",
      gender: GenderEnum.MALE,
      role_type: RoleEnum.SUPERADMIN,
    },
    {
      id: 2,
      first_name: "dipak",
      last_name: "kalauni",
      gender: GenderEnum.MALE,
      role_type: RoleEnum.SUPERADMIN,
    },
    {
      id: 3,
      first_name: "dipak",
      last_name: "kalauni",
      gender: GenderEnum.MALE,
      role_type: RoleEnum.SUPERADMIN,
    },
    {
      id: 4,
      first_name: "dipak",
      last_name: "kalauni",
      gender: GenderEnum.MALE,
      role_type: RoleEnum.SUPERADMIN,
    },
    {
      id: 5,
      first_name: "dipak",
      last_name: "kalauni",
      gender: GenderEnum.MALE,
      role_type: RoleEnum.SUPERADMIN,
    },
    {
      id: 6,
      first_name: "dipak",
      last_name: "kalauni",
      gender: GenderEnum.MALE,
      role_type: RoleEnum.SUPERADMIN,
    },
    {
      id: 7,
      first_name: "dipak",
      last_name: "kalauni",
      gender: GenderEnum.MALE,
      role_type: RoleEnum.SUPERADMIN,
    },
    {
      id: 8,
      first_name: "dipak",
      last_name: "kalauni",
      gender: GenderEnum.MALE,
      role_type: RoleEnum.SUPERADMIN,
    },
    {
      id: 9,
      first_name: "dipak",
      last_name: "kalauni",
      gender: GenderEnum.MALE,
      role_type: RoleEnum.SUPERADMIN,
    },
    {
      id: 10,
      first_name: "dipak",
      last_name: "kalauni",
      gender: GenderEnum.MALE,
      role_type: RoleEnum.SUPERADMIN,
    },
    {
      id: 11,
      first_name: "dipak",
      last_name: "kalauni",
      gender: GenderEnum.MALE,
      role_type: RoleEnum.SUPERADMIN,
    },
  ];

  return (
    <TableLayout
      title={"Users List"}
      description={""}
      onClickAdd={() => console.log("add clicked")}
      data={data}
      columns={userColumns}
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" className="ml-auto gap-1">
            Add
            <PlusCircle className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <AddEditUserDialog isEdit={false} editData={null} />
      </Dialog>
    </TableLayout>
  );
}
