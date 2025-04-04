"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";
import clsx from "clsx";

const filterOptions = [
  { label: "👽 Alien", value: "alien" },
  { label: "👤 Human", value: "human" },
  { label: "⭐️ Favorites", value: "favorites" },
];

const FilterDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isAnchor = (event.target as HTMLElement).closest("a");

      if (
        (dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)) ||
        !!isAnchor
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button className={styles.button} type="button" onClick={toggleDropdown}>
        <i className={styles.icon} /> Filter
      </button>
      <ul className={clsx(styles.dropdown, isOpen && styles.isOpen)}>
        {filterOptions.map((option) => (
          <li key={option.value}>
            <Link
              href={{
                pathname: "/",
                query: { filter: option.value },
              }}
              className={styles.option}
            >
              {option.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterDropdown;
