"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import ProjectDialogForm from "../forms/project-dialog-form";
import { createProject } from "~/lib/actions";
import { useState } from "react";

export default function AddProjectButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <PlusIcon size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="border border-border">
        <DialogHeader>Add new project</DialogHeader>
        <DialogDescription>
          Please enter the name of the project you want to add.
        </DialogDescription>
        <ProjectDialogForm
          submitAction={createProject}
          setDialogOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
