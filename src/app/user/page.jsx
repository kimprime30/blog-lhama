"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import styles from "./profilePage.module.css";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (session) {
      // Checa se o nome do usuário está presente na sessão
      setEmail(session.user.email);

      if (session.user.name) {
        setName(session.user.name);
      } else {
        // Se o nome não estiver presente, buscar na API
        fetchUserData();
      }
    }
  }, [session]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/user");
      setName(response.data.name);
      setEmail(response.data.email);
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      setError("Erro ao carregar dados do usuário.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password && password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      await axios.put("/api/user", { name, email, password });
      setSuccess("Perfil atualizado com sucesso!");
    } catch (err) {
      setError("Erro ao atualizar perfil, tente novamente.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Perfil do Usuário</h2>
      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      <form onSubmit={handleUpdate} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Nova Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Confirmar Nova Senha</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Atualizar Perfil
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
