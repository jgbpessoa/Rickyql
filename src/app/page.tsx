import { query } from "@/libs/apollo/apollo-client";
import styles from "./page.module.scss";
import {
  GetCharactersDocument,
  GetCharactersQuery,
  GetCharactersQueryVariables,
} from "@/libs/graphql/generated";

import CharactersGrid from "@/components/charactersGrid";

export default async function Home() {
  const { data } = await query<GetCharactersQuery, GetCharactersQueryVariables>(
    {
      query: GetCharactersDocument,
      variables: {
        page: 1,
      },
    }
  );

  const characters = data?.characters?.results;

  return (
    <div className="grid">
      <h1 className={styles.title}>Ricky and Morty</h1>
      <p className={styles.description}>Teste da font Creepster</p>
      <CharactersGrid characters={characters} />
    </div>
  );
}
