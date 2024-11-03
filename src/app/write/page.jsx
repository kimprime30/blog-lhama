"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "./writePage.module.css";
import { useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// Importa o ReactQuill dinamicamente, apenas no lado do cliente
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const WritePage = () => {
  const { status } = useSession();

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  return (
    <div className={styles.container}>
      <input type="text" placeholder="Title" className={styles.input} />
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="/plus.png" alt="" width={16} height={16} />
        </button>
        {open && (
          <div className={styles.add}>
            <button className={styles.addbutton}>
              <Image src="/image.png" alt="" width={16} height={16} />
            </button>
            <button className={styles.addbutton}>
              <Image src="/external.png" alt="" width={16} height={16} />
            </button>
            <button className={styles.addbutton}>
              <Image src="/video.png" alt="" width={16} height={16} />
            </button>
          </div>
        )}
        <ReactQuill
          className={styles.textArea}
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Escreva seu texto..."
        />
      </div>
      <button className={styles.publish}>Publicar</button>
    </div>
  );
};

export default WritePage;
