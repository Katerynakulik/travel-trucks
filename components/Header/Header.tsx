import Link from "next/link";
import styles from "./Header.module.css";
import Image from "next/image";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo.svg"
            alt="TravelTrucks Logo"
            width={136}
            height={16}
            priority
          />
        </Link>

        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/catalog" className={styles.navLink}>
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
};
