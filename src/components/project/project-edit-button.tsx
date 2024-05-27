"use client";

import { Settings } from "lucide-react";
import { Button } from "../ui/button";
import ProjectDialogForm from "../forms/project-dialog-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "../ui/dialog";
import { editProject } from "~/lib/actions";
import { useState } from "react";
import { type Project } from "~/app/models";

export default function ProjectEditButton({
  currentProject,
}: {
  currentProject: Project | null;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"outline"} disabled={!currentProject}>
          <Settings size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="border border-border">
        <DialogHeader>Edit current project</DialogHeader>
        <DialogDescription>
          Please enter new name and/or description.
        </DialogDescription>
        <ProjectDialogForm
          activeProject={currentProject ? currentProject : undefined}
          submitAction={editProject}
          setDialogOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
