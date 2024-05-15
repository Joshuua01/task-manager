"use client";

import { type Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { Button } from "../ui/button";
import { startTransition } from "react";
import { changeStoryStatus, deleteStory } from "~/lib/actions";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "../ui/dialog";

interface DataTableActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableActions<TData>({ row }: DataTableActionsProps<TData>) {
  const onClickDelete = () => {
    startTransition(async () => {
      await deleteStory(Number(row.getValue("id")));
    });
  };

  const onClickEditStatus = (status: "to do" | "in progress" | "done") => {
    startTransition(async () => {
      await changeStoryStatus(row.getValue("id"), status);
    });
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"}>
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-border" align="end">
          {row.getValue("status") === "to do" && (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => onClickEditStatus("in progress")}
            >
              Start progress
            </DropdownMenuItem>
          )}
          {row.getValue("status") === "in progress" && (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => onClickEditStatus("done")}
            >
              Close
            </DropdownMenuItem>
          )}
          <DialogTrigger asChild>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem className="cursor-pointer" onClick={onClickDelete}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>Edit current project</DialogHeader>
        <DialogDescription>
          Please enter new name and/or description.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
