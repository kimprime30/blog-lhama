"use client";

import React, { useEffect, useState } from "react";
import styles from "./users.module.css"; // Importando o CSS module

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();

        if (Array.isArray(data)) {
          setUsers(data); // Agora 'data' é um array de usuários
        } else {
          console.error("Esperado um array de usuários, mas obteve:", data);
        }
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Usuários</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className={styles.loading}>
                Carregando usuários...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
