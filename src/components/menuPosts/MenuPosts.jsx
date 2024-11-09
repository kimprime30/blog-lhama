"use client";

import { useEffect, useState } from "react";
import Card from "../card/Card";

const MenuPosts = ({ withImage, type }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/posts?${
            type === "mostViewed" ? "mostViewed=true" : "recommended=true"
          }`
        );
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type]);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Erro ao carregar posts: {error}</p>;

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post._id} item={post} withImage={withImage} />
        ))
      ) : (
        <p>Esta categoria ainda não possui conteúdo.</p>
      )}
    </div>
  );
};

export default MenuPosts;
