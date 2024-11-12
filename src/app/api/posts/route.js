import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page"), 10) || 1;
  const cat = searchParams.get("cat");
  const mostViewed = searchParams.get("mostViewed") === "true";
  const recommended = searchParams.get("recommended") === "true";

  const POST_PER_PAGE = 8; // Quantidade de posts por página

  // Definindo os parâmetros de consulta
  const query = {
    take: mostViewed || recommended ? 4 : POST_PER_PAGE,
    skip: mostViewed || recommended ? 0 : POST_PER_PAGE * (page - 1),
    where: {
      ...(cat && { catSlug: cat }),
      ...(recommended && { recommended: true }),
    },
    ...(mostViewed && { orderBy: { views: "desc" } }),
  };

  try {
    // Alteração aqui: contar o número total de posts sem considerar a paginação
    const [posts, totalPosts] = await prisma.$transaction([
      prisma.post.findMany(query), // Consulta com paginação
      prisma.post.count({ where: query.where }), // Contagem sem considerar 'take' e 'skip'
    ]);

    // Retornando os posts e o total de posts
    return new NextResponse(JSON.stringify({ posts, count: totalPosts }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
