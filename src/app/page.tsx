import { query } from "@/libs/apollo/apollo-client";

import {
  GetCharactersDocument,
  GetCharactersQuery,
  GetCharactersQueryVariables,
} from "@/libs/graphql/generated";

import CharactersGrid from "@/components/charactersGrid";
import FilterDropdown from "@/components/filterDropdown";

export default async function Home({
  searchParams,
}: {
  searchParams: { filter: string };
}) {
  const { filter } = await searchParams;
  const filterValue = filter || "";

  const { data } = await query<GetCharactersQuery, GetCharactersQueryVariables>(
    {
      query: GetCharactersDocument,
      variables: {
        filter: {
          species: filterValue,
        },
        page: 1,
      },
    }
  );

  const characters = data?.characters?.results;

  return (
    <main className="grid">
      <FilterDropdown />
      <CharactersGrid
        key={filterValue}
        initialCharacters={characters}
        filter={filterValue}
      />
    </main>
  );
}
