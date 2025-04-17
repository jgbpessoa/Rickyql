import Image from "next/image";
import styles from "./styles.module.scss";

type PropTypes = {
  search: string;
};

const NoResults = ({ search }: PropTypes) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>
        {search ? (
          <>
            Não encontramos resultados para <span>{search}</span>
          </>
        ) : (
          <>Não encontramos nenhum favorito</>
        )}
      </p>
      <Image
        className={styles.image}
        src="/rick.webp"
        alt="Morty"
        width={564}
        height={398}
      />
    </div>
  );
};

export default NoResults;
