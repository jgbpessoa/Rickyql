import Image from "next/image";
import styles from "./styles.module.scss";
import Link from "next/link";
import FavoriteButton from "../favoriteButton";
import { GetCharactersQuery } from "@/libs/graphql/generated";
import clsx from "clsx";

type PropsType = {
  character: NonNullable<
    NonNullable<GetCharactersQuery["characters"]>["results"]
  >[number];
  isInfoCard?: boolean;
};

const CharacterCard = ({ character, isInfoCard }: PropsType) => {
  return (
    <Link
      href={`character/${character?.id || ""}`}
      className={clsx(styles.container, isInfoCard && styles.infoCard)}
    >
      <Image
        src={character?.image || ""}
        alt={character?.name || ""}
        width={223}
        height={223}
        className={styles.image}
      />
      <FavoriteButton id={character?.id || ""} />
      <p className={styles.name}>
        {character?.name} - {character?.species}
      </p>
    </Link>
  );
};

export default CharacterCard;
