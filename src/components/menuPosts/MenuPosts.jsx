"use client";

import { useEffect, useState } from "react";
import Card from "../card/Card";

const MenuPosts = ({ withImage, type }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/posts?${
            type === "mostViewed" ? "mostViewed=true" : "recommended=true"
          }`
        );
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  return (
    <div>
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length > 0 ? (
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
