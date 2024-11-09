import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "./passwordReset.module.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const { token } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      await axios.post("/api/reset-password", { token, password });
      setSuccess("Senha alterada com sucesso!");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setError("Erro ao resetar senha, tente novamente.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Resetar Senha</h2>

        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Nova Senha
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
              Confirmar Nova Senha
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
            Resetar Senha
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
