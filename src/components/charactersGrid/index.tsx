import { GetCharactersQuery } from "@/libs/graphql/generated";
import CharacterCard from "../characterCard";
import styles from "./styles.module.scss";

type PropTypes = {
  characters: NonNullable<GetCharactersQuery["characters"]>["results"];
};

const CharactersGrid = ({ characters }: PropTypes) => {
  return (
    <div className={styles.grid}>
      {characters?.map((character) => (
        <CharacterCard
          id={character?.id || ""}
          imgSrc={character?.image || ""}
          name={character?.name || ""}
          species={character?.species || ""}
          key={character?.id}
        />
      ))}
    </div>
  );
};

export default CharactersGrid;
