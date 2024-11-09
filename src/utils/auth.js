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

        if (
          user &&
          (await bcrypt.compare(credentials?.password || "", user.password))
        ) {
          console.log("Usuário encontrado:", user);
          return user;
        } else {
          console.error("Usuário não encontrado ou senha incorreta.");
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      console.log("Sessão criada para o usuário:", user);
      session.user.id = user.id;
      session.user.role = user.role;
      return session;
    },
    async signIn({ user, account, profile }) {
      console.log("Tentativa de login:", { user, account, profile });
      // Caso o login seja via OAuth, uma senha não é necessária
      if (!user.password) {
        user.password = ""; // Define um valor padrão ou deixa em branco
      }
      return true;
    },
  },
  pages: {
    signIn: "/login", // Customiza a página de login se necessário
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const getAuthSession = () => getServerSession(authOptions);
