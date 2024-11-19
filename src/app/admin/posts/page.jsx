"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "../../../components/pagination/Pagination"; // Importando o componente de paginação
import styles from "./posts.module.css";

// Função para buscar os posts paginados
const getData = async (page, cat) => {
  const res = await fetch(
    `http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const PostsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [cat, setCat] = useState(searchParams.get("cat") || "");

  // Atualiza a página quando os parâmetros de URL mudarem
  useEffect(() => {
    const newPage = Number(searchParams.get("page")) || 1;
    if (newPage !== page) {
      setPage(newPage);
    }
  }, [searchParams]);

  useEffect(() => {
    // Fetch dos posts com base na página atual
    getData(page, cat)
      .then((data) => {
        setPosts(data.posts);
        setHasPrev(page > 1);
        setHasNext(page * 6 < data.count); // 6 é a quantidade de posts por página
      })
      .catch((error) => console.error("Erro ao carregar posts:", error));
  }, [page, cat]); // Recarregar quando a página ou a categoria mudar

  const handleDelete = (id) => {
    fetch(`/api/posts/${id}`, { method: "DELETE" })
      .then(() => setPosts(posts.filter((post) => post.id !== id)))
      .catch((error) => console.error("Erro ao deletar post:", error));
  };

  const toggleRecommended = (id, currentStatus) => {
    fetch("/api/posts/recommend", {
      method: "PATCH",
      body: JSON.stringify({ id, recommended: !currentStatus }),
    })
      .then((res) => res.json())
      .then((updatedPost) => {
        setPosts(posts.map((post) => (post.id === id ? updatedPost : post)));
      })
      .catch((error) => console.error("Erro ao alterar status:", error));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Posts</h2>
      <button
        className={styles.newPost}
        onClick={() => router.push("/admin/write")}
      >
        Novo Post
      </button>
      <ul className={styles.postsList}>
        {posts.map((post) => (
          <li key={post.id} className={styles.postItem}>
            <h3>{post.title}</h3>
            <button
              className={styles.recommendButton}
              onClick={() => toggleRecommended(post.id, post.recommended)}
            >
              {post.recommended
                ? "Desmarcar como recomendado"
                : "Marcar como recomendado"}
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(post.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>

      {/* Componente de Paginação */}
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default PostsPage;
