import styles from "./styles.module.scss";

type PropsType = {
  title: string;
  text: string;
};

const Info = ({ title, text }: PropsType) => {
  return (
    <p className={styles.title}>
      {title}: <span>{text}</span>
    </p>
  );
};

export default Info;
