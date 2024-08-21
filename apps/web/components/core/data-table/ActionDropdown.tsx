"use client";
import { Button } from "@web/components/ui/button";
import { Dialog } from "@web/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@web/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

interface IActionDropdown {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setIsDeleteClicked: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

export function ActionDropdown({
  open,
  setOpen,
  setIsDeleteClicked,
  children,
}: IActionDropdown) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              setIsDeleteClicked(false);
              setOpen(true);
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setIsDeleteClicked(true);
              setOpen(true);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {children}
    </Dialog>
  );
}
