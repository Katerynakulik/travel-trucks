"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCamperStore } from "@/store/useCamperStore";
import { CamperCard } from "../CamperCard/CamperCard";
import styles from "./CamperList.module.css";

export const CamperList = () => {
  const searchParams = useSearchParams();
  const LIMIT = 4;
  const [page, setPage] = useState(1);

  // Отримуємо тільки те, що треба для відображення
  const { items, total, isLoading, fetchCampers } = useCamperStore();

  // Перетворюємо searchParams в об'єкт для передачі в стор
  const filters = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    setPage(1);
    fetchCampers({ page: 1, limit: LIMIT, ...filters });
  }, [searchParams, fetchCampers]);

  useEffect(() => {
    if (page > 1) {
      fetchCampers({ page, limit: LIMIT, ...filters });
    }
  }, [page, fetchCampers]);

  const hasMore = items.length > 0 && items.length < total;
  const noItemsFound = !isLoading && items.length === 0;

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {items.map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
      </div>

      {noItemsFound && (
        <p className={styles.noResults}>
          No campers found matching your criteria.
        </p>
      )}

      {isLoading && <p>Loading...</p>}

      {hasMore && !isLoading && (
        <button
          onClick={() => setPage((p) => p + 1)}
          className={styles.loadMoreBtn}
        >
          Load more
        </button>
      )}
    </div>
  );
};
