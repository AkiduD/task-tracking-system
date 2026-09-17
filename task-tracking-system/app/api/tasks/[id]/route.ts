import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/app/utils/connect";

export async function DELETE(
  res: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { userId } = await auth();
    const { id } = await params;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const task = await prisma.task.delete({
      where: {
        id,
      },
    });
    console.log("Task deleted: ", task);
    return NextResponse.json(task);
  } catch (error) {
    console.log("ERROR DELETING TASKL ", error);
    return NextResponse.json({
      error: "ERROR DELETING TASK"},
      {status: 500,
    });
  }
}
