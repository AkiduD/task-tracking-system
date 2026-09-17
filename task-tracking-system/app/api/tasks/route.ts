import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/app/utils/connect";
import { error } from "console";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { title, description, date, completed, important } = await req.json();

    if (!title || !description || !date) {
      return NextResponse.json(
        { error: "Missing required field" },
        { status: 400 },
      );
    }

    if (title.length < 3) {
      return NextResponse.json(
        { error: "Title must be at least 3 characters long" },
        { status: 400 },
      );
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
        userId,
      },
    });

    //console.log("Task created: ", task);

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.log("ERROR CREATING TASK: ", error);
    return NextResponse.json({ error: "Error creating task" }, { status: 500 });
  }
}

export async function GET(req: Request) {

  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });

    console.log("Task: ", tasks);
    return NextResponse.json(tasks);
  } catch (error) {
    console.log("ERROR GETTING TASK: ", error);
    return NextResponse.json({ error: "Error updating task", status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      id,
      title,
      description,
      date,
      completed,
      important,
      isCompleted,
    } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Task id is required" }, { status: 400 });
    }

    const existingTask = await prisma.task.findFirst({
      where: { id, userId },
    });

    if (!existingTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const data: {
      title?: string;
      description?: string;
      date?: string;
      isCompleted?: boolean;
      isImportant?: boolean;
    } = {};

    if (title !== undefined) data.title = title;
    if (description !== undefined) data.description = description;
    if (date !== undefined) data.date = date;
    if (typeof completed === "boolean") data.isCompleted = completed;
    else if (typeof isCompleted === "boolean") data.isCompleted = isCompleted;
    if (typeof important === "boolean") data.isImportant = important;

    const task = await prisma.task.update({
      where: { id },
      data,
    });

    return NextResponse.json(task);

  } catch (error) {
    console.log("ERROR UPDATING TASK: ", error);
    return NextResponse.json({ error: "Error updating task" }, { status: 500 });
  }
}


/*export async function DELETE(req: Request) {
  try {
  } catch (error) {
    console.log("ERROR DELETING TASK: ", error);
    return NextResponse.json({ error: "Error deleting task", status: 500 });
  }
}*/
