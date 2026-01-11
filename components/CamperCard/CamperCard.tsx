"use client";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "../Icon/Icon";
import styles from "./CamperCard.module.css";
import { useCamperStore } from "@/store/useCamperStore";
import { Camper } from "@/types/camper";

// Визначаємо інтерфейс пропсів згідно з твоїм типом Camper
interface CamperCardProps {
  camper: Camper;
}

export const CamperCard = ({ camper }: CamperCardProps) => {
  const { favorites, toggleFavorite } = useCamperStore();
  const isFavorite = favorites.includes(camper.id);

  // Мапа для типів кузова
  const formIcons: Record<string, string> = {
    alcove: "bi_grid-3x3-gap",
    fullyIntegrated: "bi_grid",
    panelTruck: "bi_grid-1x2",
  };

  const formatForm = (form: string) => {
    const labels: Record<string, string> = {
      alcove: "Alcove",
      fullyIntegrated: "Fully Integrated",
      panelTruck: "Van",
    };
    return labels[form] || form;
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
              {/* Використовуємо .toFixed(2) як вимагає ТЗ */}
              <span className={styles.price}>€{camper.price.toFixed(2)}</span>
              <button
                type="button"
                className={styles.favoriteBtn}
                onClick={() => toggleFavorite(camper.id)}
                aria-label="Add to favorite"
              >
                <Icon
                  id="heart"
                  width={24}
                  height={24}
                  className={
                    isFavorite ? styles.heartActive : styles.heartDefault
                  }
                />
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
          {/* Тип кузова  */}
          <span className={styles.tag}>
            <Icon
              id={formIcons[camper.form] || "bi_grid-1x2"}
              width={20}
              height={20}
            />
            {formatForm(camper.form)}
          </span>

          {/* Трансмісія */}
          <span className={styles.tag}>
            <Icon id="diagram" width={20} height={20} />
            {camper.transmission === "automatic" ? "Automatic" : "Manual"}
          </span>

          {/* Кондиціонер */}
          {camper.AC && (
            <span className={styles.tag}>
              <Icon id="wind" width={20} height={20} />
              AC
            </span>
          )}

          {/* Кухня */}
          {camper.kitchen && (
            <span className={styles.tag}>
              <Icon id="cup-hot" width={20} height={20} />
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
