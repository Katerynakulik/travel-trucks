// components/CamperList/CamperList.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCamperStore } from "@/store/useCamperStore";
import { CamperCard } from "../CamperCard/CamperCard";
import styles from "./CamperList.module.css";

export const CamperList = () => {
  const searchParams = useSearchParams();
  const { items, total, isLoading, fetchCampers } = useCamperStore();

  // Локальний стан для сторінки
  const [page, setPage] = useState(1);
  const limit = 4;

  // 1. Скидаємо сторінку при зміні фільтрів (URL)
  useEffect(() => {
    setPage(1);
    const filters = Object.fromEntries(searchParams.entries());
    fetchCampers({ page: 1, limit, isNewSearch: true, ...filters });
  }, [searchParams, fetchCampers]);

  // 2. Функція для завантаження наступної сторінки
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    // Отримуємо поточні фільтри з URL, щоб не загубити їх при пагінації
    const filters = Object.fromEntries(searchParams.entries());

    fetchCampers({
      page: nextPage,
      limit,
      isNewSearch: false, // ВАЖЛИВО: додаємо до існуючого списку
      ...filters,
    });
  };

  const hasMore = items.length < total;

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {items.map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
      </div>

      {isLoading && <p>Loading...</p>}

      {!isLoading && hasMore && (
        <button className={styles.loadMore} onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </div>
  );
};
