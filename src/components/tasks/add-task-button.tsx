"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { createTask } from "~/lib/actions";
import TaskDialogForm from "../forms/task-dialog-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";

export default function AddTaskButton({ storyId }: { storyId: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <PlusIcon size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="border border-border">
        <DialogHeader>Add new task</DialogHeader>
        <DialogDescription>
          Please fill in the fields to add a new task.
        </DialogDescription>
        <TaskDialogForm
          submitAction={createTask}
          setDialogOpen={setOpen}
          storyId={storyId}
        />
      </DialogContent>
    </Dialog>
  );
}
