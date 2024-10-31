import Image from "next/image";
import styles from "./singlePage.module.css";
import Menu from "@/components/menu/Menu";
import Comments from "@/components/comments/Comments";

const SinglePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
          </h1>
          <div className={styles.user}>
            <div className={styles.userImageContainer}>
              <Image src="/p1.jpeg" alt="" fill className={styles.avatar} />
            </div>
            <div className={styles.userTextContainer}>
              <span className={styles.username}>DoctorKim</span>
              <span className={styles.date}>30/10/2024</span>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image src="/p1.jpeg" alt="" fill className={styles.image} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.description}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perferendis, eum? Reiciendis magnam, aliquam id nemo quidem minima
              exercitationem tempore quam fugit. Hic voluptates aspernatur
              eligendi doloribus molestias. Maiores, saepe officia?
            </p>
            <h2>Lorem, ipsum dolor sit amet</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perferendis, eum? Reiciendis magnam, aliquam id nemo quidem minima
              exercitationem tempore quam fugit. Hic voluptates aspernatur
              eligendi doloribus molestias. Maiores, saepe officia?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perferendis, eum? Reiciendis magnam, aliquam id nemo quidem minima
              exercitationem tempore quam fugit. Hic voluptates aspernatur
              eligendi doloribus molestias. Maiores, saepe officia?
            </p>
            <div className={styles.comment}>
              <Comments />
            </div>
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;
