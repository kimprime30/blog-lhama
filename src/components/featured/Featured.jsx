import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";

const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Olá, DoctorKim na área! Pronto para explorar o incrível mundo da química
        de uma maneira única?
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src="/p1.jpeg" alt="" width={250} height={200} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h1>
          <p className={styles.postDesc}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto
            laborum autem hic amet rerum quia culpa ducimus ut iure deleniti
            fugiat vitae est, commodi voluptatum delectus veritatis ipsa quae
            quod.
          </p>
        </div>
        <button className={styles.button}>Leia mais</button>
      </div>
    </div>
  );
};
export default Featured;
