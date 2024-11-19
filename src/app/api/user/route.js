import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import prisma from "@/utils/connect";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse("Não autenticado", { status: 401 });

  try {
    // Buscando todos os usuários com o campo 'role'
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true },
    });

    if (!users || users.length === 0) {
      return new NextResponse("Nenhum usuário encontrado", { status: 404 });
    }

    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return new NextResponse("Erro ao buscar usuários", { status: 500 });
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
