import Link from "next/link";
import React from "react";
import styles from "./menuCategories.module.css";

const MenuCategories = () => {
  return (
    <div className={styles.categoryList}>
      <Link
        href="/blog?cat=style"
        className={`${styles.categoryItem} ${styles.geral}`}
      >
        Geral
      </Link>
      <Link
        href="/blog"
        className={`${styles.categoryItem} ${styles.organica}`}
      >
        Orgânica
      </Link>
      <Link
        href="/blog"
        className={`${styles.categoryItem} ${styles.travel}`}
      ></Link>
      <Link href="" className={`${styles.categoryItem} ${styles.curiosidades}`}>
        Curiosidades
      </Link>
      <Link href="" className={`${styles.categoryItem} ${styles.bioquimica}`}>
        Bioquímica
      </Link>
      <Link href="" className={`${styles.categoryItem} ${styles.nobel}`}>
        Nobel
      </Link>
    </div>
  );
};

export default MenuCategories;
