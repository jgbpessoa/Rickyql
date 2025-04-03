import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

const Header = () => {
  return (
    <header className={styles.container}>
      <Link href="/">
        <Image
          className={styles.logo}
          src="/logo.webp"
          alt="Ricky and Morty"
          width={409}
          height={170}
        />
      </Link>
    </header>
  );
};

export default Header;
