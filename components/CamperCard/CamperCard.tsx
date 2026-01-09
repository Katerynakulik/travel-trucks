import Image from "next/image";
import Link from "next/link";
import styles from "./CamperCard.module.css";

export const CamperCard = ({ camper }: { camper: any }) => {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={camper.gallery[0].thumb}
          alt={camper.name}
          fill
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h2 className={styles.name}>{camper.name}</h2>
            <div className={styles.priceRow}>
              <span className={styles.price}>€{camper.price.toFixed(2)}</span>
              <button className={styles.favoriteBtn}>♡</button>
            </div>
          </div>

          <div className={styles.meta}>
            <span className={styles.rating}>
              ⭐ {camper.rating} ({camper.reviews.length} Reviews)
            </span>
            <span className={styles.location}>📍 {camper.location}</span>
          </div>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.features}>
          {camper.AC && <span className={styles.tag}>AC</span>}
          {camper.transmission === "automatic" && (
            <span className={styles.tag}>Automatic</span>
          )}
          {camper.kitchen && <span className={styles.tag}>Kitchen</span>}
        </div>

        <Link href={`/catalog/${camper.id}`} className={styles.button}>
          Show more
        </Link>
      </div>
    </article>
  );
};
