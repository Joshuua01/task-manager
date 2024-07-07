"use client";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { deleteStory, editStory } from "~/lib/actions";
import { Project, Story } from "~/models";
import StoryDialogForm from "../forms/story-dialog-form";
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
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import AddTaskButton from "../tasks/add-task-button";

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
    <div className="flex items-center justify-between border-b border-border px-10 py-5">
      <div>
        <div className="flex items-end gap-2">
          <h3 className="spacing text-lg font-light">
            {" "}
            {project?.name} / Story-{story?.id}
          </h3>
        </div>
        <h1 className="text-2xl font-semibold">{story.name}</h1>
      </div>

      <div className="flex gap-3">
        <AddTaskButton storyId={story.id} />
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
