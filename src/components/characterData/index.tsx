import { GetCharacterQuery } from "@/libs/graphql/generated";
import Info from "../info";
import styles from "./styles.module.scss";

type PropsType = {
  character: NonNullable<NonNullable<GetCharacterQuery["character"]>>;
};

const CharacterData = ({ character }: PropsType) => {
  const date = new Date(character?.created || "");
  const formattedDate = date.toLocaleDateString("pt-BR");

  return (
    <div className={styles.container}>
      <div className={styles.data}>
        <Info title="Nome" text={character?.name || ""} />
        <Info title="Espécie" text={character?.species || ""} />
        <Info title="Gênero" text={character?.gender || ""} />
        <Info title="Data de criação" text={formattedDate} />
      </div>
    </div>
  );
};

export default CharacterData;
