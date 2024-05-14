"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { createStory } from "~/lib/actions";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "../ui/dialog";
import StoryDialogForm from "../forms/story-dialog-form";

export default function AddStoryButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <PlusIcon size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="border border-border">
        <DialogHeader>Add new story</DialogHeader>
        <DialogDescription>
          Please enter the name of the story you want to add.
        </DialogDescription>
        <StoryDialogForm submitAction={createStory} setDialogOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
