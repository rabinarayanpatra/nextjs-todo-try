"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import AddTodo from "@/components/add-todo";
import { Todo } from "@prisma/client";
import axios from "axios";
import { TodoCard } from "@/components/todo-card";
import toast from "react-hot-toast";

// Import framer-motion
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [addTodoModalOpen, setAddTodoModalOpen] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  // Fetch existing todos
  async function fetchTodos() {
    try {
      const response = await axios.get("/api/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  // Handle deleting a todo
  async function handleDelete(todoId: Todo["id"]) {
    setIsLoading(true);
    try {
      await axios.delete(`/api/todos/${todoId}`);
      // Remove from local state so AnimatePresence can trigger the exit animation
      setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
      toast.success("Todo deleted");
    } catch {
      toast.error("Could not delete the todo");
    } finally {
      setIsLoading(false);
    }
  }

  // Re-fetch or update after adding a new todo
  function handleCloseModal() {
    setAddTodoModalOpen(false);
    fetchTodos();
  }

  return (
    <main className="p-4 flex flex-col items-center gap-8">
      <div className="flex justify-end">
        <Button onClick={() => setAddTodoModalOpen(true)}>
          Add <PlusCircle />
        </Button>

        <AddTodo isOpen={addTodoModalOpen} onClose={handleCloseModal} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Wrap the items in AnimatePresence for mount/unmount animations */}
        <AnimatePresence>
          {todos.map((todo) => (
            <motion.div
              key={todo.id}
              // Animate layout changes (e.g. reordering when items are removed)
              layout
              // Appear animation
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              // Exit animation
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <TodoCard
                id={todo.id}
                userId={todo.userId}
                title={todo.title}
                description={todo.description}
                onDelete={handleDelete}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
}
