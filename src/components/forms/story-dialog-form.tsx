"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { StorySchema } from "~/lib/formSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { type Story } from "~/models";
import { type Dispatch, type SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface StoryDialogFormProps {
  editedStory?: Story;
  submitAction: (
    payload: Story,
    id?: number,
  ) => Promise<{ error?: string } | undefined>;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function StoryDialogForm({
  editedStory,
  submitAction,
  setDialogOpen,
}: StoryDialogFormProps) {
  const form = useForm<z.infer<typeof StorySchema>>({
    resolver: zodResolver(StorySchema),
    defaultValues: {
      name: editedStory?.name ?? "",
      description: editedStory?.description ?? "",
      priority: editedStory?.priority ?? "medium",
      status: editedStory?.status ?? "to do",
    },
  });

  async function onSubmit(data: z.infer<typeof StorySchema>) {
    let result = undefined;
    if (editedStory?.id) {
      result = await submitAction(data as Story, editedStory?.id);
    } else {
      result = await submitAction(data as Story);
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
                <Input placeholder="Enter your name..." {...field} />
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
                <Input placeholder="Enter your description..." {...field} />
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

        <Button type="submit" className="w-full">
          {editedStory ? "Edit story" : "Add story"}
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
