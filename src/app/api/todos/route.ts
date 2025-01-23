// app/api/todos/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    new NextResponse("Authorized access", { status: 401 });
  }

  try {
    // 1) Parse the request body as JSON
    const body = await req.json();

    // 2) Validate required data
    if (!body.title) {
      return NextResponse.json(
        { error: "Missing required field: title" },
        { status: 400 },
      );
    }

    body.userId = userId;

    const newTodo = await prisma.todo.create({
      data: body,
    });

    // 4) Return a JSON response (with a status code, if desired)
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error("POST /api/todos error:", JSON.stringify(error));
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Authorized access", { status: 401 });
  }

  try {
    const todos = await prisma.todo.findMany({
      where: { userId },
      orderBy: { title: "asc" },
    });

    return NextResponse.json(todos);
  } catch (error) {
    console.error("GET /api/todos error:", JSON.stringify(error));
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
