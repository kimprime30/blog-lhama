import React from "react";
import styles from "./menu.module.css";
import MenuPosts from "../menuPosts/MenuPosts";
import MenuCategories from "../menuCategories/MenuCategories";

const Menu = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>{"Em destaque"}</h2>
      <h1 className={styles.title}>Mais Populares</h1>
      <MenuPosts withImage={false} />
      <h2 className={styles.subtitle}>{"Encontre por Assuntos"}</h2>
      <h1 className={styles.title}>Categorias</h1>
      <MenuCategories />
      <h2 className={styles.subtitle}>{"Escolha do editor"}</h2>
      <h1 className={styles.title}>Recomendação do Editor</h1>
      <MenuPosts withImage={true} />
    </div>
  );
};
export default Menu;
