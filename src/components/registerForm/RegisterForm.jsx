"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./registerForm.module.css";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validação extra no frontend
    if (!email || !password || !confirmPassword) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      const response = await axios.post("/api/register", { email, password });
      setSuccess("Usuário registrado com sucesso!");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("Email já registrado");
      } else {
        setError("Erro ao criar conta, tente novamente.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Crie sua conta</h2>

        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

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

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Criar Conta
          </button>
        </form>

        <div className={styles.footer}>
          <span>Já tem uma conta? </span>
          <a href="/login" className={styles.link}>
            Faça login
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
