import { query } from "@/libs/apollo/apollo-client";
import {
  GetCharactersDocument,
  GetCharactersQuery,
  GetCharactersQueryVariables,
} from "@/libs/graphql/generated";
import styles from "./page.module.scss";
import CharactersGrid from "@/components/charactersGrid";
import FilterDropdown from "@/components/filterDropdown";
import SearchInput from "@/components/searchInput";

export default async function Home({
  searchParams,
}: {
  searchParams: { filter: string; search?: string };
}) {
  const { filter, search } = await searchParams;
  const filterValue = filter || "";
  const searchValue = search || "";

  const { data } = await query<GetCharactersQuery, GetCharactersQueryVariables>(
    {
      query: GetCharactersDocument,
      variables: {
        filter: {
          species: filterValue,
          name: searchValue,
        },
        page: 1,
      },
    }
  );

  const characters = data?.characters?.results;
  const hasMoreThanInitial = data?.characters?.info?.next || null;

  return (
    <main className="grid">
      <SearchInput />
      <section className={styles.section}>
        <FilterDropdown />
        <CharactersGrid
          key={`${filterValue}-${searchValue}`}
          initialCharacters={characters}
          filter={filterValue}
          search={searchValue}
          hasMoreThanInitial={hasMoreThanInitial}
        />
      </section>
    </main>
  );
}
