import { query } from "@/libs/apollo/apollo-client";
import styles from "./page.module.scss";
import { GET_CHARACTERS } from "@/libs/graphql/queries/characters";
import CharacterCard from "@/components/characterCard";

export default async function Home() {
  const { data, error } = await query({
    query: GET_CHARACTERS,
    variables: {
      page: 1,
    },
  });

  const characters = data?.characters?.results;

  return (
    <div className="grid">
      <h1 className={styles.title}>Ricky and Morty</h1>
      <p className={styles.description}>Teste da font Creepster</p>
      <div className={styles.grid}>
        {characters?.map((character: any) => (
          <CharacterCard
            id={character.id}
            imgSrc={character.image}
            name={character.name}
            species={character.species}
            key={character.id}
          />
        ))}
      </div>
    </div>
  );
}
