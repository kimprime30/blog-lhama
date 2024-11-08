import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page"), 10) || 1; // Garante que `page` seja ao menos `1`
  const cat = searchParams.get("cat");
  const mostViewed = searchParams.get("mostViewed") === "true"; // Novo parâmetro

  const POST_PER_PAGE = 2;

  const query = {
    take: mostViewed ? 4 : POST_PER_PAGE,
    skip: mostViewed ? 0 : POST_PER_PAGE * (Math.max(page, 1) - 1), // Garante que `skip` seja ao menos `0`
    where: {
      ...(cat && { catSlug: cat }),
    },
    ...(mostViewed && { orderBy: { views: "desc" } }), // Ordena por mais visualizados se mostViewed for true
  };

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);
    return new NextResponse(JSON.stringify({ posts, count }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

// CREATE A POST
export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const body = await req.json();
    const post = await prisma.post.create({
      data: { ...body, userEmail: session.user.email },
    });

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
