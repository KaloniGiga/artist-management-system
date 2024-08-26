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
  handleDeleteDialog: Dispatch<SetStateAction<boolean>>;
  handleEditClick: () => void;
  handleDeleteClick: () => void;
  children: React.ReactNode;
}

export function ActionDropdown({
  open,
  handleDeleteDialog,
  handleEditClick,
  handleDeleteClick,
  children,
}: IActionDropdown) {
  return (
    <Dialog open={open} onOpenChange={handleDeleteDialog}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleEditClick}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={handleDeleteClick}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {children}
    </Dialog>
  );
}
