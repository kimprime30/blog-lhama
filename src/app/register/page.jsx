import RegisterForm from "@/components/registerForm/RegisterForm";
import styles from "./registerPage.module.css"; // Estilos específicos da página de registro

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
