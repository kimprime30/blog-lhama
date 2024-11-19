// /src/app/admin/layout.jsx
import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./layout.module.css";

const AdminLayout = ({ children }) => {
  return (
    <div className={styles.layoutContainer}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
};

export default AdminLayout;
