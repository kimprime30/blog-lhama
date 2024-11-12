import bcrypt from "bcrypt";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { name, email, password } = body; // Incluindo o nome

    if (!name || !email || !password) {
      return new NextResponse(
        JSON.stringify({ message: "Nome, e-mail e senha são obrigatórios." }),
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ message: "Email já registrado" }),
        { status: 409 }
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: {
        name, // Passando o nome para o banco de dados
        email,
        password: hashedPassword,
      },
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
