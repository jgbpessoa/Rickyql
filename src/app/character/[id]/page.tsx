import BackButton from "@/components/backButton";
import styles from "./page.module.scss";
import CharacterInfo from "@/components/characterInfo";
import { query } from "@/libs/apollo/apollo-client";
import {
  GetCharacterDocument,
  GetCharacterQuery,
  GetCharacterQueryVariables,
} from "@/libs/graphql/generated";

export default async function Character({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const { data } = await query<GetCharacterQuery, GetCharacterQueryVariables>({
    query: GetCharacterDocument,
    variables: {
      characterId: id,
    },
  });

  const { character } = data;

  return (
    <main className="grid">
      <section className={styles.section}>
        <BackButton />
        <CharacterInfo character={character || {}} />
      </section>
    </main>
  );
}
