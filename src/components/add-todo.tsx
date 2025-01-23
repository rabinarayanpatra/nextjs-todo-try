"use client";

import * as React from "react";
import { useState } from "react";
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
import axios from "axios";
import toast from "react-hot-toast";

interface AddTodoProps {
  isOpen: boolean;
  onClose: () => void;
}

// 1. Define the Zod schema for your form.
const todoFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

type TodoFormValues = z.infer<typeof todoFormSchema>;

export default function AddTodo({ isOpen, onClose }: AddTodoProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // 3. Handle form submission.
  async function onSubmit(values: TodoFormValues) {
    setIsLoading(true);
    try {
      await axios.post("/api/todos", values);
      toast.success("Todo saved");
      onClose();
    } catch {
      toast.error("Something went wrong, try again");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
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

            <DialogFooter>
              <Button
                disabled={isLoading}
                variant={"outline"}
                type="button"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button disabled={isLoading} type="submit">
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
