"use client";

import { useEffect, useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCamperStore } from "@/store/useCamperStore"; // Імпорт нашого стору
import { CamperCard } from "../CamperCard/CamperCard";
import styles from "./CamperList.module.css";

export const CamperList = () => {
  const searchParams = useSearchParams();
  const LIMIT = 4;

  // Отримуємо дані та методи з Zustand
  const {
    items,
    total,
    isLoading,
    setItems,
    setTotal,
    setLoading,
    resetItems,
  } = useCamperStore();

  // Локальний стан для пагінації залишаємо, бо це стосується тільки цього списку
  const [page, setPage] = useState(1);

  const fetchCampers = useCallback(
    async (currentPage: number, isNewSearch: boolean) => {
      setLoading(true);

      // Вимога ТЗ: перед новим пошуком скидаємо результати
      if (isNewSearch) resetItems();

      try {
        const url = new URL(
          "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers"
        );
        url.searchParams.append("page", currentPage.toString());
        url.searchParams.append("limit", LIMIT.toString());

        searchParams.forEach((value, key) => {
          if (value) url.searchParams.append(key, value);
        });

        const res = await fetch(url.toString());

        if (res.status === 404) {
          return; // Zustand вже скинув items через resetItems()
        }

        const data = await res.json();
        const newItems = Array.isArray(data) ? data : data.items || [];

        // Записуємо дані в глобальний стор
        setItems(newItems, isNewSearch);
        setTotal(data.total || 32);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    },
    [searchParams, setLoading, setItems, setTotal, resetItems]
  );

  // Реакція на зміну фільтрів
  useEffect(() => {
    setPage(1);
    fetchCampers(1, true);
  }, [searchParams, fetchCampers]);

  // Реакція на Load More
  useEffect(() => {
    if (page > 1) {
      fetchCampers(page, false);
    }
  }, [page, fetchCampers]);

  const hasMore = items.length > 0 && items.length < total;

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {items.map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
      </div>

      {isLoading && <p>Loading...</p>}

      {hasMore && !isLoading && (
        <button
          className={styles.loadMoreBtn}
          onClick={() => setPage((p) => p + 1)}
        >
          Load more
        </button>
      )}
    </div>
  );
};
