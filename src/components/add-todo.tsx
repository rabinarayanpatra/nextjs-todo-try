"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface AddTodoProps {
  trigger: React.ReactNode;
}

// 1. Define the Zod schema for your form.
const todoFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  dueDate: z.string().optional(),
});

type TodoFormValues = z.infer<typeof todoFormSchema>;

export default function AddTodo({ trigger }: AddTodoProps) {
  // 2. Initialize react-hook-form with the Zod resolver.
  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
    },
  });

  // 3. Handle form submission.
  function onSubmit(values: TodoFormValues) {
    // Replace with your own logic (e.g., API call).
    console.log("New Todo:", values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a todo</DialogTitle>
        </DialogHeader>

        {/* 4. Wrap the form elements with the shadcn <Form> component. */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Buy groceries" {...field} />
                  </FormControl>
                  <FormDescription>
                    A short, descriptive title for your to-do item.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Eggs, milk, and bread"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Optional details about this to-do.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Due Date Field */}
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="YYYY-MM-DD" {...field} />
                  </FormControl>
                  <FormDescription>
                    Optional due date for this to-do.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
