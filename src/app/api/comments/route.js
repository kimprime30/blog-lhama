import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const postSlug = searchParams.get("postSlug"); // Obtém o postSlug da URL
    const commentId = searchParams.get("id"); // Obtém o id do comentário da URL

    let comments;

    if (postSlug) {
      // Se postSlug for fornecido, busque comentários por postSlug
      comments = await prisma.comment.findMany({
        where: { postSlug: postSlug, approved: true },
        include: {
          user: { select: { name: true } },
        },
        orderBy: { createdAt: "desc" },
      });
    } else if (commentId) {
      // Se commentId for fornecido, busque o comentário específico por id
      comments = await prisma.comment.findMany({
        where: { id: parseInt(commentId) }, // Certifique-se de que o id é um número
        include: {
          user: { select: { name: true } },
        },
      });
    } else {
      // Buscar todos os comentários caso nem postSlug nem commentId estejam presentes
      comments = await prisma.comment.findMany({
        include: {
          user: { select: { name: true } },
        },
        orderBy: { createdAt: "desc" },
      });
    }

    return new NextResponse(JSON.stringify({ comments }), { status: 200 });
  } catch (err) {
    console.error("Error fetching comments:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

// CREATE A COMMENT
export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }), {
      status: 401,
    });
  }

  try {
    const body = await req.json();

    if (!body.desc || !body.postSlug) {
      return new NextResponse(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    const comment = await prisma.comment.create({
      data: {
        desc: body.desc,
        postSlug: body.postSlug,
        userEmail: session.user.email,
        approved: false, // Comentário criado como não aprovado
      },
      include: {
        user: {
          select: { name: true, image: true },
        },
      },
    });

    return new NextResponse(JSON.stringify(comment), { status: 200 });
  } catch (err) {
    console.error("Erro ao criar comentário:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

// DELETE

export const DELETE = async (req) => {
  const { searchParams } = new URL(req.url);
  const commentId = searchParams.get("id");

  try {
    // Remover o comentário
    await prisma.comment.delete({
      where: { id: parseInt(commentId) }, // Certifique-se de que o id é um número
    });

    return new NextResponse(JSON.stringify({ message: "Comment deleted" }), {
      status: 200,
    });
  } catch (err) {
    console.error("Erro ao deletar comentário:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
