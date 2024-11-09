"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import styles from "./loginPage.module.css";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      console.log("Usuário autenticado, redirecionando para a página inicial.");
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className={styles.loading}>Carregando...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Tentando fazer login com:", { email, password });

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      console.error("Erro ao fazer login:", res.error);
      setError(res.error);
    } else {
      console.log("Login bem-sucedido, redirecionando para a página inicial.");
      router.push("/");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Login</h2>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Senha
            </label>
            <input
              type="password"
              id="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Entrar
          </button>
        </form>
        <div className={styles.footer}>
          <span>Ainda não tem uma conta? </span>
          <a href="/register" className={styles.link}>
            Cadastre-se
          </a>
        </div>
        <div className={styles.socialWrapper}>
          <div className={styles.socialButton} onClick={() => signIn("google")}>
            Entrar com Google
          </div>
          <div className={styles.socialButton} onClick={() => signIn("github")}>
            Entrar com Github
          </div>
          <div
            className={styles.socialButton}
            onClick={() => signIn("facebook")}
          >
            Entrar com Facebook
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
