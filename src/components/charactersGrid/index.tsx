import { GetCharactersQuery } from "@/libs/graphql/generated";
import CharacterCard from "../characterCard";
import styles from "./styles.module.scss";

type PropTypes = {
  characters: NonNullable<GetCharactersQuery["characters"]>["results"];
};

const CharactersGrid = ({ characters }: PropTypes) => {
  return (
    <section>
      <ul className={styles.grid}>
        {characters?.map((character) => (
          <li className={styles.listItem} key={character?.id}>
            <CharacterCard character={character} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CharactersGrid;
