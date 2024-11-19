"use client";

import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const { status } = useSession();

  return (
    <>
      {status === "unauthenticated" ? (
        <>
          <Link href="/login" className={styles.link}>
            Login
          </Link>
          <Link href="/register" className={styles.link}>
            Registrar
          </Link>
        </>
      ) : (
        <>
          <Link href="/user" className={styles.link}>
            Usuário
          </Link>
          <span className={styles.link} onClick={signOut}>
            Logout
          </span>
        </>
      )}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link href="/">Homepage</Link>
          <Link href="/">Contatos</Link>
          <Link href="/">Sobre</Link>
          {status === "unauthenticated" ? (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Registrar</Link>
            </>
          ) : (
            <>
              <Link href="/user">Usuário</Link>
              <span className={styles.link} onClick={signOut}>
                Logout
              </span>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
