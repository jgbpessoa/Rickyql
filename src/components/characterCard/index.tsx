import Image from "next/image";
import styles from "./styles.module.scss";
import Link from "next/link";
import FavoriteButton from "../favoriteButton";

type PropsTye = {
  name?: string;
  id?: string;
  species?: string;
  imgSrc?: string;
};

const CharacterCard = ({ id, name, species, imgSrc }: PropsTye) => {
  return (
    <Link href={`character/${id}`} className={styles.container}>
      <Image
        src={imgSrc || ""}
        alt={name || ""}
        width={223}
        height={223}
        className={styles.image}
      />
      <FavoriteButton id={id} />
      <p className={styles.name}>
        {name} - {species}
      </p>
    </Link>
  );
};

export default CharacterCard;
