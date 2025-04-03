import { GetCharacterQuery } from "@/libs/graphql/generated";
import CharacterCard from "../characterCard";
import styles from "./styles.module.scss";
import CharacterData from "@/components/characterData";

type PropTypes = {
  character?: NonNullable<GetCharacterQuery["character"]>;
};

const CharacterInfo = ({ character }: PropTypes) => {
  return (
    <div className={styles.container}>
      <CharacterCard character={character || {}} isInfoCard />
      <CharacterData character={character || {}} />
    </div>
  );
};

export default CharacterInfo;
