import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
  const { id } = params;
  const { action } = await req.json();

  try {
    let updatedComment;
    if (action === "approve") {
      updatedComment = await prisma.comment.update({
        where: { id },
        data: { approved: true },
      });
    } else if (action === "reject") {
      updatedComment = await prisma.comment.update({
        where: { id },
        data: { approved: false },
      });
    } else {
      return new NextResponse(JSON.stringify({ message: "Invalid action" }), {
        status: 400,
      });
    }

    return new NextResponse(JSON.stringify(updatedComment), { status: 200 });
  } catch (err) {
    console.error("Error updating comment:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

export const DELETE = async (req, { params }) => {
  const { id } = params;

  try {
    await prisma.comment.delete({
      where: { id },
    });

    return new NextResponse(JSON.stringify({ message: "Comment deleted" }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error deleting comment:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
