"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  GetCharactersByIdDocument,
  GetCharactersByIdQuery,
  GetCharactersQuery,
} from "@/libs/graphql/generated";
import CharacterCard from "../characterCard";
import styles from "./styles.module.scss";
import { useFavorites } from "@/context/favoritesContext";

type PropTypes = {
  characters: NonNullable<GetCharactersQuery["characters"]>["results"];
  filter: string;
};

const CharactersGrid = ({ characters, filter }: PropTypes) => {
  const { favoriteIds } = useFavorites();
  const [favoriteCharacters, setFavoriteCharacters] = useState<
    GetCharactersByIdQuery["charactersByIds"]
  >([]);

  const { data, loading, error } = useQuery<GetCharactersByIdQuery>(
    GetCharactersByIdDocument,
    {
      skip: filter !== "favorites" || favoriteIds.length === 0, // Skip query if not filtering by favorites
      variables: { ids: favoriteIds },
    }
  );

  useEffect(() => {
    if (data?.charactersByIds) {
      setFavoriteCharacters(data.charactersByIds);
    }
  }, [data]);

  const displayedCharacters =
    filter === "favorites" ? favoriteCharacters : characters;

  return (
    <section>
      {loading && <p>Loading favorites...</p>}
      {error && <p>Error loading favorites: {error.message}</p>}
      <ul className={styles.grid}>
        {displayedCharacters?.map((character) => (
          <li className={styles.listItem} key={character?.id}>
            <CharacterCard character={character} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CharactersGrid;
