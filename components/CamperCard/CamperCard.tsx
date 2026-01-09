"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "../Icon/Icon";
import styles from "./CamperCard.module.css";

export const CamperCard = ({ camper }: { camper: any }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  // Мапа для типів кузова
  const formIcons: Record<string, string> = {
    alcove: "bi_grid-3x3-gap",
    fullyIntegrated: "bi_grid",
    van: "bi_grid-1x2",
  };

  const formatForm = (form: string) => {
    if (form === "alcove") return "Alcove";
    if (form === "fullyIntegrated") return "Fully Integrated";
    if (form === "van") return "Van";
    return form;
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={camper.gallery[0].thumb}
          alt={camper.name}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 290px"
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h2 className={styles.name}>{camper.name}</h2>
            <div className={styles.priceRow}>
              <span className={styles.price}>€{camper.price.toFixed(2)}</span>
              <button
                type="button"
                className={`${styles.favoriteBtn} ${
                  isFavorite ? styles.active : ""
                }`}
                onClick={toggleFavorite}
                aria-label="Add to favorites"
              >
                <Icon id="heart" width={26} height={24} />
              </button>
            </div>
          </div>

          <div className={styles.meta}>
            <span className={styles.rating}>
              ⭐ {camper.rating} ({camper.reviews.length} Reviews)
            </span>
            <span className={styles.location}>
              <Icon id="map" width={16} height={16} />
              {camper.location}
            </span>
          </div>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.features}>
          {/* Тип кузова */}
          <span className={styles.tag}>
            <Icon id={formIcons[camper.form]} />
            {formatForm(camper.form)}
          </span>

          {/* Трансмісія */}
          <span className={styles.tag}>
            <Icon id="diagram" />
            {camper.transmission === "automatic" ? "Automatic" : "Manual"}
          </span>

          {/* Кондиціонер */}
          {camper.AC && (
            <span className={styles.tag}>
              <Icon id="wind" />
              AC
            </span>
          )}

          {/* Кухня */}
          {camper.kitchen && (
            <span className={styles.tag}>
              <Icon id="cup-hot" />
              Kitchen
            </span>
          )}
        </div>

        <Link href={`/catalog/${camper.id}`} className={styles.button}>
          Show more
        </Link>
      </div>
    </article>
  );
};
