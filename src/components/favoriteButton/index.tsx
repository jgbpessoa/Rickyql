"use client";

import styles from "./styles.module.scss";
import clsx from "clsx";
import { useFavorites } from "@/context/favoritesContext";

type PropTypes = {
  id?: string;
};

const FavoriteButton = ({ id }: PropTypes) => {
  const { favoriteIds, toggleFavorite } = useFavorites();

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite(id || "");
  };

  const isFavorite = favoriteIds.includes(id || "");

  return (
    <button
      className={clsx(styles.button, isFavorite && styles.isFavorite)}
      onClick={handleClick}
    >
      {isFavorite ? "Favoritar" : "Desfavoritar"}
    </button>
  );
};

export default FavoriteButton;
