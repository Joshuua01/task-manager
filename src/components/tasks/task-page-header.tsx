"use client";
import { useRouter } from "next/navigation";
import { startTransition, useState, useTransition } from "react";
import { deleteTask, editTask, getUserFromToken } from "~/lib/actions";
import {
  EncryptedUser,
  Project,
  statusEnum,
  statuses,
  Story,
  Task,
} from "~/models";
import TaskDialogForm from "../forms/task-dialog-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { roleEnum } from "~/server/db/schema";
import { Loader2 } from "lucide-react";

interface TaskPageHeaderProps {
  project: Project;
  story: Story;
  task: Task;
  users: EncryptedUser[];
}

const TaskPageHeader = ({
  project,
  story,
  task,
  users,
}: TaskPageHeaderProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleTaskDelete = () => {
    startTransition(async () => {
      await deleteTask(task.id);
    });
    router.replace(`/story/${story.id}`);
  };
  const handleTaskAssign = (newAssigneeId: string) => {
    startTransition(async () => {
      await editTask({
        ...task,
        assigneeId: newAssigneeId != "null" ? Number(newAssigneeId) : null,
      });
    });
  };
  const handleAssignToMeButton = () => {
    startTransition(async () => {
      const currentUser = await getUserFromToken();
      if (!currentUser) return;
      if (currentUser.role === "admin") return;
      await editTask({
        ...task,
        assigneeId: Number(currentUser?.id),
      });
    });
  };
  const handleStatusChange = (newStatus: string) => {
    startTransition(async () => {
      switch (newStatus) {
        case statusEnum[0]:
          await editTask({
            ...task,
            status: statusEnum[0],
            startDate: null,
            endDate: null,
          });
          break;
        case statusEnum[1]:
          await editTask({
            ...task,
            status: statusEnum[1],
            startDate: new Date(),
            endDate: null,
          });
          break;
        case statusEnum[2]:
          await editTask({
            ...task,
            status: statusEnum[2],
            endDate: new Date(),
          });
          break;
        default:
          break;
      }
    });
  };

  return (
    <div className="flex items-center justify-between border-b border-border px-10 py-5">
      <div>
        <div className="flex items-end gap-2">
          <h3 className="spacing text-lg font-light">
            {`${project.name} / Story-${story.id} / ${story.name}`}
          </h3>
        </div>
        <h1 className="text-2xl font-semibold">{task.name}</h1>
      </div>
      <div className="flex gap-20">
        <div className="flex gap-3">
          {task.status === statusEnum[0] ? (
            <Button
              variant={"outline"}
              onClick={() => {
                handleStatusChange(statusEnum[1]);
              }}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Start"
              )}
            </Button>
          ) : task.status === statusEnum[1] ? (
            <>
              <Button
                variant={"outline"}
                onClick={() => {
                  handleStatusChange(statusEnum[2]);
                }}
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Finish"
                )}
              </Button>
              <Button
                variant={"outline"}
                onClick={() => {
                  handleStatusChange(statusEnum[0]);
                }}
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "To do"
                )}
              </Button>
            </>
          ) : (
            <Button
              variant={"outline"}
              onClick={() => {
                handleStatusChange(statusEnum[0]);
              }}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Reopen"
              )}
            </Button>
          )}
        </div>
        <div className="flex gap-3">
          <Select
            onValueChange={handleTaskAssign}
            value={task.assigneeId ? task.assigneeId.toString() : undefined}
            disabled={isPending}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Assign user" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"null"}>Unassign</SelectItem>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id.toString()}>
                  {user.name + " " + user.surname}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant={"outline"}
            onClick={handleAssignToMeButton}
            disabled={isPending}
            className="w-[120px]"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Assign to me"
            )}
          </Button>
        </div>

        <div className="flex gap-3">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant={"outline"}>Edit</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>Edit current task</DialogHeader>
              <DialogDescription>Please enter the data.</DialogDescription>
              <TaskDialogForm
                editedTask={task}
                setDialogOpen={setDialogOpen}
                submitAction={editTask}
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
                  task.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleTaskDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default TaskPageHeader;
