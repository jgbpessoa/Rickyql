import Link from "next/link";
import styles from "./styles.module.scss";

const BackButton = () => {
  return (
    <Link href="/" className={styles.button}>
      <i className={styles.icon} />
      <span className={styles.text}>Voltar para a listagem</span>
    </Link>
  );
};

export default BackButton;
