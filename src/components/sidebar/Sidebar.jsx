"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUser, FaFileAlt, FaComments } from "react-icons/fa";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const router = useRouter();

  const menuItems = [
    { name: "Usuários", path: "/admin/users", icon: <FaUser /> },
    { name: "Posts", path: "/admin/posts", icon: <FaFileAlt /> },
    { name: "Comentários", path: "/admin/comments", icon: <FaComments /> },
  ];

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>
        <Link href="/admin" className={styles.link}>
          Painel de controle
        </Link>
      </h2>
      <nav>
        <ul className={styles.navList}>
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={`${styles.navItem} ${
                router.pathname === item.path ? styles.navItemActive : ""
              }`}
            >
              <span className={styles.icon}>{item.icon}</span>
              <Link href={item.path} className={styles.link}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
