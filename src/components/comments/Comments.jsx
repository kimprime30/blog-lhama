import Link from "next/link";
import styles from "./comments.module.css";
import Image from "next/image";

const Comments = () => {
  const status = "autenticated";
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {status === "autenticated" ? (
        <div className={styles.write}>
          <textarea
            placeholder="escreva seu comentário..."
            className={styles.input}
          />
          <button className={styles.button}>Enviar</button>
        </div>
      ) : (
        <Link href="/login">Login necessário para comentar</Link>
      )}
      <div className={styles.comments}>
        <div className={styles.comment}>
          <div className={styles.user}>
            <Image
              src="/p1.jpeg"
              alt=""
              width={50}
              height={50}
              className={styles.image}
            />
            <div className={styles.userInfo}>
              <span className={styles.username}>Jhon Doe</span>
              <span className={styles.date}>31/10/2024</span>
            </div>
          </div>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            sit illo vero assumenda vitae sint consectetur earum, dolorem vel id
            itaque cumque voluptas aliquam quia facilis, officia aliquid
            dignissimos voluptatem.
          </p>
        </div>
      </div>
      <div className={styles.comments}>
        <div className={styles.comment}>
          <div className={styles.user}>
            <Image
              src="/p1.jpeg"
              alt=""
              width={50}
              height={50}
              className={styles.image}
            />
            <div className={styles.userInfo}>
              <span className={styles.username}>Jhon Doe</span>
              <span className={styles.date}>31/10/2024</span>
            </div>
          </div>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            sit illo vero assumenda vitae sint consectetur earum, dolorem vel id
            itaque cumque voluptas aliquam quia facilis, officia aliquid
            dignissimos voluptatem.
          </p>
        </div>
      </div>
      <div className={styles.comments}>
        <div className={styles.comment}>
          <div className={styles.user}>
            <Image
              src="/p1.jpeg"
              alt=""
              width={50}
              height={50}
              className={styles.image}
            />
            <div className={styles.userInfo}>
              <span className={styles.username}>Jhon Doe</span>
              <span className={styles.date}>31/10/2024</span>
            </div>
          </div>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            sit illo vero assumenda vitae sint consectetur earum, dolorem vel id
            itaque cumque voluptas aliquam quia facilis, officia aliquid
            dignissimos voluptatem.
          </p>
        </div>
      </div>
      <div className={styles.comments}>
        <div className={styles.comment}>
          <div className={styles.user}>
            <Image
              src="/p1.jpeg"
              alt=""
              width={50}
              height={50}
              className={styles.image}
            />
            <div className={styles.userInfo}>
              <span className={styles.username}>Jhon Doe</span>
              <span className={styles.date}>31/10/2024</span>
            </div>
          </div>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            sit illo vero assumenda vitae sint consectetur earum, dolorem vel id
            itaque cumque voluptas aliquam quia facilis, officia aliquid
            dignissimos voluptatem.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comments;
