"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./styles.module.scss";

type PropsType = {
  placeholder?: string;
  debounceDelay?: number;
};

const SearchInput = ({
  placeholder = "Que personagem você gostaria de buscar?",
  debounceDelay = 300,
}: PropsType) => {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const router = useRouter();

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchTerm) {
        params.set("search", searchTerm);
      } else {
        params.delete("search");
      }

      router.replace(`?${params.toString()}`, { scroll: false });
    }, debounceDelay);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, debounceDelay, router, searchParams]);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.wrapper}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchInput;
