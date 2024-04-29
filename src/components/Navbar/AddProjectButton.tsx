import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import AddProjectDialogForm from "../forms/AddProjectDialogForm";

export default function AddProjectButton() {
  return (
    <Dialog>
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
        <AddProjectDialogForm />
      </DialogContent>
    </Dialog>
  );
}
