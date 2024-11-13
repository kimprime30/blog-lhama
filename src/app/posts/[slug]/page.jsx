// Este código permanece com 'use client' para o uso de hooks como useState e useEffect
"use client";
import { useState, useEffect } from "react";
import Menu from "@/components/menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";

const SinglePage = ({ params }) => {
  const { slug } = params;
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const postData = await response.json();
        setData(postData);
      } catch (err) {
        setError(err);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  if (error) {
    return <div>Ocorreu um erro ao carregar os dados: {error.message}</div>;
  }

  if (!data) {
    return <div>Carregando...</div>;
  }

  // Formata a data para o formato desejado
  const formattedDate = new Date(data.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data.title}</h1>
          <div className={styles.user}>
            {data.user?.image && (
              <div className={styles.userImageContainer}>
                <Image
                  src={data.user.image}
                  alt="Avatar do usuário"
                  fill
                  sizes="(max-width: 768px) 50px, 100px"
                  className={styles.avatar}
                  defaultSrc="/images/default-avatar.png"
                />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data.user?.name}</span>
              <span className={styles.date}>{formattedDate}</span>
            </div>
          </div>
        </div>
        {data.img && (
          <div className={styles.imageContainer}>
            <Image src={data.img} alt="" fill className={styles.image} />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data.desc }}
          />
          <div className={styles.comment}>
            <Comments postSlug={slug} />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;
