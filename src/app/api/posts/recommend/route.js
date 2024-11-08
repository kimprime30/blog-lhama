export const PATCH = async (req) => {
  const { id, recommended } = await req.json();

  try {
    const updatedPost = await prisma.post.update({
      where: { id },
      data: { recommended },
    });

    return new NextResponse(JSON.stringify(updatedPost), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
