import bcrypt from "bcrypt";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Validação extra no backend
    if (!email || !password) {
      return new NextResponse(
        JSON.stringify({ message: "Email e senha são obrigatórios." }),
        { status: 400 }
      );
    }

    // Verifica se o email já está registrado
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ message: "Email já registrado" }),
        { status: 409 }
      );
    }

    // Gera o hash da senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Log para depuração
    console.log("Email:", email);
    console.log("Hashed Password:", hashedPassword);

    // Cria o usuário no banco de dados com a senha hash
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return new NextResponse(JSON.stringify(user), { status: 201 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Erro ao criar conta, tente novamente." }),
      { status: 500 }
    );
  }
};
