"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "../Icon/Icon";
import styles from "./Filters.module.css";
import { LocationFilter } from "../LocationFilter/LocationFilter";

const VEHICLE_TYPES = [
  { id: "panelTruck", label: "Van" },
  { id: "fullyIntegrated", label: "Fully Integrated" },
  { id: "alcove", label: "Alcove" },
];
export const Filters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState(searchParams.get("location") || "");

  // Локальний стан для кнопок (checkbox logic)
  const [equipment, setEquipment] = useState({
    AC: false,
    transmission: false, // Automatic
    kitchen: false,
    TV: false,
    bathroom: false,
  });

  // Локальний стан для типу кузова (radio logic)
  const [type, setType] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    // Додаємо тип, якщо обраний
    if (type) params.set("form", type);

    // Додаємо техніку тільки якщо true
    if (equipment.AC) params.set("AC", "true");
    if (equipment.transmission) params.set("transmission", "automatic");
    if (equipment.kitchen) params.set("kitchen", "true");
    if (equipment.TV) params.set("TV", "true");
    if (equipment.bathroom) params.set("bathroom", "true");

    // Оновлюємо URL (якщо params порожні, буде просто /catalog)
    router.push(`/catalog?${params.toString()}`);
  };

  return (
    <aside className={styles.filtersSide}>
      <LocationFilter value={location} onChange={setLocation} />
      {/* Vehicle equipment section */}
      <div className={styles.section}>
        <h3 className={styles.subTitle}>Vehicle equipment</h3>
        <hr className={styles.divider} />
        <div className={styles.categoriesGrid}>
          {Object.entries(equipment).map(([key, value]) => (
            <button
              key={key}
              type="button"
              className={`${styles.filterBtn} ${value ? styles.active : ""}`}
              onClick={() =>
                setEquipment((prev) => ({
                  ...prev,
                  [key]: !prev[key as keyof typeof equipment],
                }))
              }
            >
              <Icon
                id={
                  key === "transmission"
                    ? "diagram"
                    : key === "bathroom"
                    ? "ph_shower"
                    : key === "AC"
                    ? "wind"
                    : key === "kitchen"
                    ? "cup-hot"
                    : "tv"
                }
                width={32}
                height={32}
              />
              <span className={styles.btnText}>
                {key === "transmission" ? "Automatic" : key.toUpperCase()}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle type section */}
      <div className={styles.section}>
        <h3 className={styles.subTitle}>Vehicle type</h3>
        <hr className={styles.divider} />
        <div className={styles.categoriesGrid}>
          {VEHICLE_TYPES.map((vType) => (
            <button
              key={vType.id}
              type="button"
              className={`${styles.filterBtn} ${
                type === vType.id ? styles.active : ""
              }`}
              onClick={() =>
                setType((prev) => (prev === vType.id ? "" : vType.id))
              }
            >
              <Icon
                id={
                  vType.id === "panelTruck"
                    ? "bi_grid-1x2"
                    : vType.id === "fullyIntegrated"
                    ? "bi_grid"
                    : "bi_grid-3x3-gap"
                }
                width={32}
                height={32}
              />
              <span className={styles.btnText}>{vType.label}</span>
            </button>
          ))}
        </div>
      </div>

      <button onClick={handleSearch} className={styles.searchBtn}>
        Search
      </button>
    </aside>
  );
};
