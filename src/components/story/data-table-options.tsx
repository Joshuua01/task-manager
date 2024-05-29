"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { Button } from "../ui/button";
import { startTransition, useState } from "react";
import { changeStoryStatus, deleteStory, editStory } from "~/lib/actions";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "../ui/dialog";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import StoryDialogForm from "../forms/story-dialog-form";
import { statusEnum, statuses, type Story } from "~/app/models";
import { capitalizeFirstLetter } from "~/lib/utils";

interface DataTableOptionsProps<TData> {
  row: Story;
}

export function DataTableOptions<Story>({ row }: DataTableOptionsProps<Story>) {
  const onClickDelete = () => {
    startTransition(async () => {
      await deleteStory(Number(row.id));
    });
  };

  const onClickEditStatus = (status: "to do" | "in progress" | "done") => {
    startTransition(async () => {
      await changeStoryStatus(row.id, status);
    });
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"}>
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-border" align="end">
          {statusEnum.map((status) => (
            <DropdownMenuItem
              key={status}
              className="cursor-pointer"
              onClick={() => onClickEditStatus(status)}
              disabled={status === row.status}
            >
              {capitalizeFirstLetter(status)}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator className="my-1 border-t border-border" />
          <DialogTrigger asChild>
            <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
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
        <StoryDialogForm
          editedStory={row}
          setDialogOpen={setDialogOpen}
          submitAction={editStory}
        />
      </DialogContent>
    </Dialog>
  );
}
