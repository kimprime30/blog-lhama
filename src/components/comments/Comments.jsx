"use client";

import Link from "next/link";
import styles from "./comments.module.css";
import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";

// Função para buscar dados da API com tratamento de erros
const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message || "Failed to fetch data");
    throw error;
  }

  return data;
};

const Comments = ({ postSlug }) => {
  const { status } = useSession();
  const { data, mutate, isLoading } = useSWR(
    `http://localhost:3000/api/comments?postSlug=${postSlug}&approved=true`,
    fetcher
  );

  const [desc, setDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!desc.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ desc, postSlug }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to submit comment");
      }

      // Chama o mutate para atualizar os dados dos comentários após o envio
      mutate(); // Isso deve revalidar os dados e atualizar a lista de comentários.

      setDesc(""); // Limpa o campo de descrição após o envio
    } catch (error) {
      console.error("Error submitting comment:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea
            placeholder="Write a comment..."
            className={styles.input}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button
            className={styles.button}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}

      <div className={styles.comments}>
        {isLoading
          ? "Loading..."
          : Array.isArray(data.comments) && data.comments.length > 0
          ? data.comments
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((item) => (
                <div className={styles.comment} key={item.id}>
                  <div className={styles.user}>
                    {item?.user?.image && (
                      <Image
                        src={item.user.image}
                        alt="User avatar"
                        width={50}
                        height={50}
                        className={styles.image}
                      />
                    )}
                    <div className={styles.userInfo}>
                      <span className={styles.username}>{item.user.name}</span>
                      <span className={styles.date}>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className={styles.desc}>{item.desc}</p>
                </div>
              ))
          : "No comments available."}
      </div>
    </div>
  );
};

export default Comments;
