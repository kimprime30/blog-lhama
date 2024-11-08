"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./menuPosts.module.css";

const MenuPosts = ({ withImage, type }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/posts?type=${type}`);
        if (!response.ok) throw new Error("Erro ao buscar posts");

        const data = await response.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
        setError("Não foi possível carregar os posts.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [type]);

  if (isLoading) {
    return <p className={styles.loading}>Carregando posts...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  console.log("Rendering MenuPosts with posts:", posts); // Adiciona um log para verificar os posts

  return (
    <div className={styles.items}>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Link
            key={`${post.id}-${post.slug}`} // Chave combinando id e slug
            href={`/post/${post.slug}`}
            className={styles.item}
          >
            {withImage && post.imageUrl && (
              <div className={styles.imageContainer}>
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className={styles.image}
                />
              </div>
            )}
            <div className={styles.textContainer}>
              <span
                className={`${styles.category} ${
                  post.category ? styles[post.category.toLowerCase()] : ""
                }`}
              >
                {post.category || "Sem Categoria"}
              </span>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <div className={styles.detail}>
                <span className={styles.username}>{post.author}</span>
                <span className={styles.date}>{post.date}</span>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className={styles.noPosts}>Nenhum post encontrado</p>
      )}
    </div>
  );
};

export default MenuPosts;
