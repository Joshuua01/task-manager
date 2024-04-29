"use client";

import { Settings } from "lucide-react";
import { Button } from "../ui/button";
import AddProjectDialogForm from "../forms/AddProjectDialogForm";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "../ui/dialog";

export default function ProjectEditButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <Settings size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="border border-border">
        <DialogHeader>Add new project</DialogHeader>
        <DialogDescription>
          Please enter the name of the project you want to add.
        </DialogDescription>
        <AddProjectDialogForm />
      </DialogContent>
    </Dialog>
  );
}
