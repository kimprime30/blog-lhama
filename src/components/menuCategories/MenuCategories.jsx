import Link from "next/link";
import React from "react";
import styles from "./menuCategories.module.css";

const categories = [
  { slug: "geral", title: "Geral" },
  { slug: "organica", title: "Orgânica" },
  { slug: "cotidiano", title: "Cotidiano" },
  { slug: "curiosidades", title: "Curiosidades" },
  { slug: "bioquimica", title: "Bioquímica" },
  { slug: "nobel", title: "Nobel" },
];

const MenuCategories = () => {
  return (
    <div className={styles.categoryList}>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/blog?cat=${category.slug}`}
          className={`${styles.categoryItem} ${styles[category.slug]}`}
        >
          {category.title}
        </Link>
      ))}
    </div>
  );
};

export default MenuCategories;
