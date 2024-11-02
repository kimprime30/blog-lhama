"use client";
import { signIn, useSession } from "next-auth/react";
import styles from "./loginpage.module.css";
import { useRouter } from "next/navigation";

const Loginpage = () => {
  const { data, status } = useSession();

  const router = useRouter();

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "authenticated") {
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.socialButton} onClick={() => signIn("google")}>
          Login com o Google
        </div>
        <div className={styles.socialButton}>Login com o Github</div>
        <div className={styles.socialButton}>Login com o Facebook</div>
      </div>
    </div>
  );
};

export default Loginpage;
