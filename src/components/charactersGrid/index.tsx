"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  GetCharactersDocument,
  GetCharactersQuery,
  GetCharactersByIdDocument,
  GetCharactersByIdQuery,
} from "@/libs/graphql/generated";

import CharacterCard from "../characterCard";
import PlaceholderCard from "../placeholderCard";
import Loading from "../loading";
import styles from "./styles.module.scss";
import { useFavorites } from "@/context/favoritesContext";
import NoResults from "../noResults";

type PropTypes = {
  initialCharacters: NonNullable<GetCharactersQuery["characters"]>["results"];
  filter: string;
  search: string;
  hasMoreThanInitial: number | null;
};

const CharactersGrid = ({
  initialCharacters,
  filter,
  search,
  hasMoreThanInitial,
}: PropTypes) => {
  const { favoriteIds } = useFavorites();

  const [characters, setCharacters] = useState(initialCharacters || []);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);

  const hasMounted = useRef(false);

  const [favoriteCharacters, setFavoriteCharacters] = useState<
    GetCharactersByIdQuery["charactersByIds"]
  >([]);

  const [loadCharacters] = useLazyQuery(GetCharactersDocument, {
    fetchPolicy: "network-only",
  });

  const {
    data: favoritesData,
    loading: loadingFavorites,
    error: errorFavorites,
  } = useQuery<GetCharactersByIdQuery>(GetCharactersByIdDocument, {
    skip: filter !== "favorites" || favoriteIds.length === 0,
    variables: { ids: favoriteIds },
  });

  useEffect(() => {
    if (favoritesData?.charactersByIds) {
      setFavoriteCharacters(favoritesData.charactersByIds);
    }
  }, [favoritesData]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    setPage(1);
    setHasMore(true);
    setIsLoadingMore(false);

    if (filter === "favorites") return;

    setIsRefetching(true);

    loadCharacters({
      variables: { page: 1, filter: { species: filter, name: search } },
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        const results = data.characters?.results || [];
        const hasNext = data.characters?.info?.next;

        setCharacters(results);
        setHasMore(!!hasNext);
        setIsRefetching(false);
      },
      onError: () => {
        setIsRefetching(false);
      },
    });
  }, [loadCharacters, filter, search]);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingMore) return;

    setIsLoadingMore(true);
    loadCharacters({
      variables: { page: page + 1, filter: { species: filter, name: search } },
      onCompleted: (data) => {
        const newResults = data.characters?.results || [];
        const endReached = !data.characters?.info?.next;

        setCharacters((prev) => [...prev, ...newResults]);
        setPage((prev) => prev + 1);
        setHasMore(!endReached);
        setIsLoadingMore(false);
      },
      onError: () => {
        setIsLoadingMore(false);
      },
    });
  }, [loadCharacters, filter, search, page, hasMore, isLoadingMore]);

  useEffect(() => {
    if (!observerRef.current || filter === "favorites" || !hasMoreThanInitial)
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 1.0 }
    );

    const target = observerRef.current;
    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [loadMore, filter, hasMoreThanInitial]);

  const displayedCharacters =
    filter === "favorites" ? favoriteCharacters : characters;

  return (
    <section>
      {(loadingFavorites || isRefetching) && <Loading />}
      {errorFavorites && (
        <p>Error loading favorites: {errorFavorites.message}</p>
      )}

      <ul className={styles.grid}>
        {loadingFavorites || isRefetching
          ? Array.from({ length: 20 }).map((_, index) => (
              <li className={styles.listItem} key={`placeholder-${index}`}>
                <PlaceholderCard />
              </li>
            ))
          : displayedCharacters?.map((character) => (
              <li className={styles.listItem} key={character?.id}>
                <CharacterCard character={character} />
              </li>
            ))}

        {filter !== "favorites" &&
          isLoadingMore &&
          Array.from({ length: 20 }).map((_, index) => (
            <li className={styles.listItem} key={`loading-${index}`}>
              <PlaceholderCard />
            </li>
          ))}
      </ul>

      {!displayedCharacters?.length && !isRefetching && !loadingFavorites && (
        <NoResults search={search} />
      )}

      {filter !== "favorites" && (
        <div ref={observerRef} style={{ height: 1 }} />
      )}
    </section>
  );
};

export default CharactersGrid;
