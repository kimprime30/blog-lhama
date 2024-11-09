import bcrypt from "bcrypt";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { token, password } = body;

    // Verifica o token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });
    if (!verificationToken || verificationToken.expires < new Date()) {
      return new NextResponse(
        JSON.stringify({ message: "Token inválido ou expirado" }),
        { status: 400 }
      );
    }

    // Gera o hash da nova senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Atualiza a senha do usuário
    await prisma.user.update({
      where: { email: verificationToken.identifier },
      data: { password: hashedPassword },
    });

    // Remove o token de verificação
    await prisma.verificationToken.delete({ where: { token } });

    return new NextResponse(
      JSON.stringify({ message: "Senha alterada com sucesso!" }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Erro ao resetar senha, tente novamente." }),
      { status: 500 }
    );
  }
};
