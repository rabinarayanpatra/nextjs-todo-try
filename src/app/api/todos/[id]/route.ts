// app/api/todos/[id]/route.ts

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";

// Define an interface for the dynamic route parameters
interface Params {
  params: {
    id: string; // The todo ID from the URL
  };
}

// The DELETE method here receives the `params` from the route
export async function DELETE(req: Request, { params }: Params) {
  // 1. Check user authentication
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const todoId = params.id;

    // 2. (Optional) Check if the user owns the todo before deleting:
    const existingTodo = await prisma.todo.findUnique({
      where: { id: todoId },
    });

    if (!existingTodo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    if (existingTodo.userId !== userId) {
      return NextResponse.json(
        { error: "You do not have permission to delete this todo" },
        { status: 403 },
      );
    }

    // 3. Delete the todo
    const deletedTodo = await prisma.todo.delete({
      where: { id: todoId },
    });

    // 4. Return the deleted todo (or a success message)
    return NextResponse.json(deletedTodo, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/todos/[id] error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
