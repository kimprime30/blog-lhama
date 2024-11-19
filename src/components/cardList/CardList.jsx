import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";

const getData = async (page, cat) => {
  const res = await fetch(
    `http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const CardList = async ({ page, cat }) => {
  const { posts, count } = await getData(page, cat);

  const POST_PER_PAGE = 6; // Ajuste conforme a quantidade de posts desejada por página
  const hasPrev = page > 1;
  const hasNext = page * POST_PER_PAGE < count; // Verifica se há mais posts que o limite da página atual

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Posts Recentes</h1>
      <div className={styles.posts}>
        {posts
          ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Ordena do mais recente para o mais antigo
          .map((item) => (
            <Card key={item._id} item={item} />
          ))}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default CardList;
