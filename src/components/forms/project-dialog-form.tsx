"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { CreateProjectSchema } from "~/lib/formSchema";
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
import { type Project } from "~/app/models";
import { type Dispatch, type SetStateAction } from "react";

interface ProjectDialogFormProps {
  activeProject?: Project;
  submitAction: (payload: Project) => Promise<{ error?: string } | undefined>;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ProjectDialogForm({
  activeProject,
  submitAction,
  setDialogOpen,
}: ProjectDialogFormProps) {
  const form = useForm<z.infer<typeof CreateProjectSchema>>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      name: activeProject?.name ?? "",
      description: activeProject?.description ?? "",
    },
  });

  async function onSubmit(data: z.infer<typeof CreateProjectSchema>) {
    const result = await submitAction(data as Project);
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
        <Button type="submit" className="w-full">
          {activeProject ? "Edit project" : "Add project"}
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
