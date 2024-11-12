import { PrismaAdapter } from "@auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./connect";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        console.log("Autorizando com credenciais:", credentials);
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (user) {
          const passwordMatch = await bcrypt.compare(
            credentials?.password || "",
            user.password
          );
          console.log("Senha válida?", passwordMatch);

          if (passwordMatch) {
            console.log("Usuário encontrado:", user);
            return {
              id: user.id,
              email: user.email,
              role: user.role,
            }; // Retornar apenas o necessário
          } else {
            console.error(
              "Senha incorreta para o usuário:",
              credentials?.email
            );
            return null;
          }
        } else {
          console.error("Usuário não encontrado:", credentials?.email);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // Adicionando role no JWT
      }
      return token;
    },
    async session({ session, token }) {
      // Aqui você usa o JWT para atualizar a sessão
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role; // Atribuindo role do JWT à sessão
      } else {
        console.error("Token não encontrado");
      }
      return session;
    },
    async signIn({ user }) {
      // Garantir que a senha não está sendo enviada para o cliente
      if (user && user.password) {
        delete user.password; // Remover a senha para não ser exposta
      }
      return true;
    },
  },
  pages: {
    signIn: "/login", // Página personalizada de login
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Usar JWT em vez de sessões baseadas em banco
  },
};

export const getAuthSession = () => getServerSession(authOptions);
