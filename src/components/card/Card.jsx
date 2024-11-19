import DOMPurify from "dompurify";
import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

const Card = ({ item, withImage }) => {
  // Verifica se está no ambiente cliente para evitar erros no SSR
  const sanitizedDesc =
    typeof window !== "undefined"
      ? DOMPurify.sanitize(item.desc.substring(0, 60))
      : item.desc.substring(0, 60);

  return (
    <div className={styles.container}>
      {withImage && item.img && (
        <div className={styles.imageContainer}>
          <Image src={item.img} alt="" fill className={styles.image} />
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {item.createdAt.substring(0, 10)} -{" "}
          </span>
          <span className={styles.category}>{item.catSlug}</span>
        </div>
        <Link href={`/posts/${item.slug}`}>
          <h1>{item.title}</h1>
        </Link>
        <div
          className={styles.desc}
          dangerouslySetInnerHTML={{ __html: sanitizedDesc }}
        ></div>
        <Link href={`/posts/${item.slug}`} className={styles.link}>
          Leia mais
        </Link>
      </div>
    </div>
  );
};

export default Card;
