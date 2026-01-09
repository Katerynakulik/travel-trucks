"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { CamperCard } from "../CamperCard/CamperCard";
import styles from "./CamperList.module.css";

export const CamperList = () => {
  const [campers, setCampers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0); // Зберігаємо загальну кількість для ліміту

  const searchParams = useSearchParams();
  const LIMIT = 4;

  const fetchCampers = useCallback(
    async (currentPage: number, isNewSearch: boolean) => {
      setIsLoading(true);
      try {
        const url = new URL(
          "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers"
        );
        url.searchParams.append("page", currentPage.toString());
        url.searchParams.append("limit", LIMIT.toString());

        // Додаємо фільтри з URL
        searchParams.forEach((value, key) => {
          if (value) url.searchParams.append(key, value);
        });

        const res = await fetch(url.toString());

        // Якщо MockAPI повертає 404 (нічого не знайдено), обнуляємо список
        if (res.status === 404) {
          if (isNewSearch) setCampers([]);
          setTotal(0);
          return;
        }

        const data = await res.json();
        const items = Array.isArray(data) ? data : data.items || [];

        // Встановлюємо загальну кількість (MockAPI зазвичай повертає total в об'єкті)
        // Якщо total немає, використовуємо 32 (загальна кількість у базі)
        setTotal(data.total || 32);

        setCampers((prev) => {
          if (isNewSearch) return items; // Для нового пошуку замінюємо масив

          // Фільтруємо нові дані, щоб уникнути помилки дублікатів ключів (key error)
          const uniqueItems = items.filter(
            (newItem) => !prev.some((oldItem) => oldItem.id === newItem.id)
          );
          return [...prev, ...uniqueItems];
        });
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [searchParams]
  );

  // Викликається при зміні фільтрів (Search)
  useEffect(() => {
    setPage(1);
    fetchCampers(1, true);
  }, [searchParams, fetchCampers]);

  // Викликається при натисканні Load More (зміна сторінки)
  useEffect(() => {
    if (page > 1) {
      fetchCampers(page, false);
    }
  }, [page, fetchCampers]);

  // Логіка показу кнопки: є дані, і їх менше ніж загальна кількість
  const hasMore = campers.length > 0 && campers.length < total;

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {campers.map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
      </div>

      {isLoading && <p>Loading...</p>}

      {/* Показуємо кнопку лише якщо не вантажимо і є що ще показати */}
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
