import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

const Card = ({ key, item }) => {
  return (
    <div className={styles.container} key={key}>
      <div className={styles.imageContainer}>
        <Image src="/p1.jpeg" alt="" fill className={styles.image} />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>29/10/2024 - </span>
          <span className={styles.category}>CULTURE</span>
        </div>
        <Link href="/">
          <h1>{item.title}</h1>
        </Link>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
          cupiditate facilis illo porro veniam alias laudantium rem quas soluta
          saepe. Provident, minima beatae neque obcaecati ratione molestias
          veritatis nam deserunt?
        </p>
        <Link href="/" className={styles.link}>
          Leia mais
        </Link>
      </div>
    </div>
  );
};

export default Card;
