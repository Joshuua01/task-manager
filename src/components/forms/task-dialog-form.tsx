"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { TaskSchema } from "~/lib/formSchema";
import { Task } from "~/models";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface TaskDialogFormProps {
  editedTask?: Task;
  submitAction: (
    payload: Task,
    id?: number,
  ) => Promise<{ error?: string } | undefined>;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  storyId?: number;
}

export default function TaskDialogForm({
  editedTask,
  submitAction,
  setDialogOpen,
  storyId,
}: TaskDialogFormProps) {
  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      name: editedTask?.name ?? "",
      description: editedTask?.description ?? "",
      priority: editedTask?.priority ?? "medium",
      status: editedTask?.status ?? "to do",
      expectedTime: editedTask?.expectedTime ?? 0,
    },
  });

  async function onSubmit(data: z.infer<typeof TaskSchema>) {
    let result = undefined;
    data.id = editedTask?.id;
    if (editedTask?.id) {
      result = await submitAction(data as Task, editedTask?.id);
    } else {
      data.storyId = storyId;
      result = await submitAction(data as Task);
    }
    if (result?.error) {
      form.setError("root", {
        type: "custom",
        message: result.error,
      });
      return;
    } else {
      setDialogOpen(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="to do">To do</SelectItem>
                    <SelectItem value="in progress">In progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expectedTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated time in days</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter days..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {editedTask ? "Edit task" : "Add task"}
        </Button>
        {form.formState.errors.root && (
          <p className="w-full text-center font-semibold text-destructive">
            {form.formState.errors.root.message}
          </p>
        )}
      </form>
    </Form>
  );
}
