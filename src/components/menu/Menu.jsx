import React from "react";
import styles from "./menu.module.css";
import MenuPosts from "../menuPosts/MenuPosts";
import MenuCategories from "../menuCategories/MenuCategories";

const sections = [
  {
    id: 1,
    title: "Mais Populares",
    subtitle: "Em destaque",
    component: <MenuPosts withImage={false} type="mostViewed" />, // Exibe posts mais visualizados
  },
  {
    id: 2,
    title: "Categorias",
    subtitle: "Encontre por Assuntos",
    component: <MenuCategories />,
  },
  {
    id: 3,
    title: "Recomendação do Editor",
    subtitle: "Escolha do editor",
    component: <MenuPosts withImage={true} type="recommended" />, // Exibe posts recomendados
  },
];

const Menu = () => {
  return (
    <div className={styles.container}>
      {sections.map((section) => (
        <div key={section.id}>
          <h2 className={styles.subtitle}>{section.subtitle}</h2>
          <h1 className={styles.title}>{section.title}</h1>
          {React.cloneElement(section.component, { key: section.id })}{" "}
        </div>
      ))}
    </div>
  );
};

export default Menu;
