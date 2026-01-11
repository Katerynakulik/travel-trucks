"use client";

import { useEffect, useState } from "react";
import { useCamperStore } from "@/store/useCamperStore";

// Тимчасово залишимо ці компоненти тут або імпортуємо, якщо вже створили
// import { CamperHeader } from "./CamperHeader";
// import { CamperGallery } from "./CamperGallery";

import styles from "./CamperDetailsContent.module.css";
import { BookingForm } from "../Booking/BookingForm";

export default function CamperDetailsContent({ id }: { id: string }) {
  const [activeTab, setActiveTab] = useState<"features" | "reviews">(
    "features"
  );
  const {
    currentCamper: camper,
    isLoading,
    fetchCamperById,
  } = useCamperStore();

  useEffect(() => {
    if (id) fetchCamperById(id);
  }, [id, fetchCamperById]);

  if (isLoading || !camper)
    return <div className={styles.loader}>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      {/* 1. Header & Meta (Винесемо пізніше) */}
      <section className={styles.header}>
        <h1 className={styles.name}>{camper.name}</h1>
        {/* Тут буде рейтинг та локація */}
        <p className={styles.price}>€{Number(camper.price).toFixed(2)}</p>
      </section>

      {/* 2. Gallery (Винесемо пізніше) */}
      <section className={styles.gallery}>
        {camper.gallery?.map((img: any, idx: number) => (
          <div key={idx} className={styles.imageThumb}>
            <img src={img.original} alt={camper.name} />
          </div>
        ))}
      </section>

      <p className={styles.description}>{camper.description}</p>

      {/* 3. Navigation Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === "features" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "reviews" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      {/* 4. Основний контент: Таби + Форма */}
      <div className={styles.contentLayout}>
        <div className={styles.tabContent}>
          {activeTab === "features" ? (
            <div>{/* Тут буде FeaturesTab */}</div>
          ) : (
            <div>{/* Тут буде ReviewsTab */}</div>
          )}
        </div>

        <aside className={styles.sidebar}>
          <BookingForm />
        </aside>
      </div>
    </div>
  );
}
