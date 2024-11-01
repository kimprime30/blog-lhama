import styles from "./loginpage.module.css";

const Loginpage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.socialButton}>Login com o Google</div>
        <div className={styles.socialButton}>Login com o Github</div>
        <div className={styles.socialButton}>Login com o Facebook</div>
      </div>
    </div>
  );
};

export default Loginpage;
