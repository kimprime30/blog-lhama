"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation"; // Usando o hook useRouter
import styles from "./comments.module.css"; // Importando as classes CSS

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message || "Failed to fetch data");
    throw error;
  }

  return data;
};

const AdminCommentsPage = ({ postSlug }) => {
  const router = useRouter(); // Usando useRouter para pegar query params da URL
  const [commentId, setCommentId] = useState(null);

  // UseEffect para garantir que commentId seja atribuído após renderização
  useEffect(() => {
    if (router.query?.id) {
      setCommentId(router.query.id);
    }
  }, [router.query?.id]);

  // Condicional para buscar comentários com base no postSlug ou commentId
  const { data, mutate, isLoading } = useSWR(
    postSlug
      ? `/api/comments?postSlug=${postSlug}`
      : commentId
      ? `/api/comments?id=${commentId}`
      : "/api/comments", // Se nem postSlug nem commentId estiverem presentes, busca todos os comentários
    fetcher
  );

  const [isProcessing, setIsProcessing] = useState(false);

  const handleAction = async (id, action) => {
    setIsProcessing(true);
    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to process action");
      }

      mutate(); // Atualiza a lista de comentários após a ação
    } catch (error) {
      console.error("Error processing action:", error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (id) => {
    setIsProcessing(true);
    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete comment");
      }

      mutate(); // Atualiza a lista de comentários após a exclusão
    } catch (error) {
      console.error("Error deleting comment:", error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Admin - Comments Moderation</h1>
      {isLoading ? (
        <p>Loading comments...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Comment</th>
              <th>Post</th>
              <th>Approved</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.comments?.map((comment) => (
              <tr key={comment.id}>
                <td>{comment.id}</td>
                <td>{comment.user?.name || "Unknown"}</td>
                <td>{comment.desc}</td>
                <td>{comment.postSlug}</td>
                <td>{comment.approved ? "Yes" : "No"}</td>
                <td>
                  <button
                    className={`${styles.button} ${styles.approve}`}
                    onClick={() => handleAction(comment.id, "approve")}
                    disabled={isProcessing || comment.approved}
                  >
                    Approve
                  </button>
                  <button
                    className={`${styles.button} ${styles.reject}`}
                    onClick={() => handleAction(comment.id, "reject")}
                    disabled={isProcessing || !comment.approved}
                  >
                    Reject
                  </button>
                  <button
                    className={`${styles.button} ${styles.delete}`}
                    onClick={() => handleDelete(comment.id)}
                    disabled={isProcessing}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminCommentsPage;
