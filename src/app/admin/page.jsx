import styles from "./adminPage.module.css";

const DashboardHome = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>
      <p className={styles.welcomeText}>
        Bem-vindo ao painel de administração.
      </p>
      {/* Coloque métricas, gráficos e outros dados de resumo aqui */}
      <div
        className={`${styles.gridContainer} grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}
      >
        <div className={styles.metricCard}>
          <h2 className={styles.cardTitle}>Métricas</h2>
          <p className={styles.cardText}>Dados de resumo...</p>
        </div>
        <div className={styles.metricCard}>
          <h2 className={styles.cardTitle}>Gráficos</h2>
          <p className={styles.cardText}>Dados de resumo...</p>
        </div>
        <div className={styles.metricCard}>
          <h2 className={styles.cardTitle}>Outros Dados</h2>
          <p className={styles.cardText}>Dados de resumo...</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
