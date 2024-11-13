import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Inter } from "next/font/google";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";
import "./globals.css";

import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth"; // Importando as opções de autenticação

const inter = Inter({ subsets: ["latin"] });

// Função para obter a sessão do servidor
export async function generateMetadata() {
  const session = await getServerSession(authOptions);
  return {
    title: "Blog App",
    description: "The best blog app!",
    session, // Passando a session para os componentes
  };
}

export default async function RootLayout({ children }) {
  // Obter a sessão do servidor
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider session={session}>
          {" "}
          {/* Aqui o SessionProvider é passado pelo AuthProvider */}
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="container">
                <div className="wrapper">
                  <Navbar />
                  {children}
                  <Footer />
                </div>
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
