"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface TodoCardProps {
  id: string;
  userId: string;
  title: string;
  description: string;
  onEdit?: (todoId: string) => void;
  onDelete?: (todoId: string) => void;
}

export function TodoCard({
  id,
  userId,
  title,
  description,
  onEdit,
  onDelete,
}: TodoCardProps) {
  return (
    // We wrap the entire Card with motion
    <motion.div
      // subtle scale on hover
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
      className="w-full max-w-sm"
    >
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {description || "No description provided."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">Todo ID: {id}</p>
          <p className="text-sm text-muted-foreground">User ID: {userId}</p>
        </CardContent>

        {(onEdit || onDelete) && (
          <CardFooter className="flex gap-2">
            {onEdit && (
              <Button variant="secondary" onClick={() => onEdit(id)}>
                Edit
              </Button>
            )}
            {onDelete && (
              <Button variant="destructive" onClick={() => onDelete(id)}>
                Delete
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}
