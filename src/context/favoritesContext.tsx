"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext<{
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
}>({
  favoriteIds: [],
  toggleFavorite: () => {},
});

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("favoriteCharacters");
    if (storedData) {
      setFavoriteIds(JSON.parse(storedData));
    }
  }, []);

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) => {
      let newFavorites;
      if (prev.includes(id)) {
        newFavorites = prev.filter((favId) => favId !== id);
      } else {
        newFavorites = [...prev, id];
      }
      localStorage.setItem("favoriteCharacters", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
