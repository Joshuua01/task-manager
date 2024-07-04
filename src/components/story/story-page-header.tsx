"use client";
import React, { startTransition, useState } from "react";
import { deleteStory, editStory, getStoryById } from "~/lib/actions";
import { Button } from "../ui/button";
import { Project, Story } from "~/models";
import StoryDialogForm from "../forms/story-dialog-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

interface StoryPageHeaderProps {
  project: Project;
  story: Story;
}

const StoryPageHeader = ({ project, story }: StoryPageHeaderProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const handleStoryDelete = () => {
    startTransition(async () => {
      await deleteStory(Number(story.id));
    });
    router.replace("/");
  };

  return (
    <div className="flex justify-between border-b border-border px-10 py-5">
      <div className="flex items-end gap-2">
        <h1 className="text-2xl font-semibold">{project?.name + " /"} </h1>
        <h2 className="text-xl font-normal"> Story-{story?.id}</h2>
      </div>
      <div className="flex gap-3">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant={"outline"}>Edit</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>Edit current project</DialogHeader>
            <DialogDescription>
              Please enter new name and/or description.
            </DialogDescription>
            <StoryDialogForm
              editedStory={story}
              setDialogOpen={setDialogOpen}
              submitAction={editStory}
            />
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"}>Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                story.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleStoryDelete}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default StoryPageHeader;
