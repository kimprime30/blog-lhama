import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import prisma from "@/utils/connect";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse("Não autenticado", { status: 401 });

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { name: true, email: true },
    });
    if (!user)
      return new NextResponse("Usuário não encontrado", { status: 404 });
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    return new NextResponse("Erro ao buscar perfil", { status: 500 });
  }
};

export const PUT = async (req) => {
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse("Não autenticado", { status: 401 });

  try {
    const body = await req.json();
    const { name, email, password } = body;

    const dataToUpdate = { name, email };

    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      dataToUpdate.password = hashedPassword;
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: dataToUpdate,
    });

    return new NextResponse(
      JSON.stringify({ message: "Perfil atualizado com sucesso" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    return new NextResponse("Erro ao atualizar perfil", { status: 500 });
  }
};
