import { PrismaClient } from "@prisma/client";

let prisma;

// Verifica se o ambiente é de produção
if (process.env.NODE_ENV === "production") {
  // Em produção, cria uma única instância de PrismaClient
  prisma = new PrismaClient();
} else {
  // No ambiente de desenvolvimento, verifica se já existe uma instância global
  if (!global.prisma) {
    // Se não houver, cria uma nova instância e armazena-a na variável global
    global.prisma = new PrismaClient();
  }
  // Reutiliza a instância armazenada na variável global
  prisma = global.prisma;
}

export default prisma;
