import { query } from "@/libs/apollo/apollo-client";

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
    <main className="grid">
      <CharactersGrid characters={characters} />
    </main>
  );
}
