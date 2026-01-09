"use client";

import { useState, useEffect } from "react";
import { CamperCard } from "../CamperCard/CamperCard";
import styles from "./CamperList.module.css";

const LIMIT = 5;
export const CamperList = () => {
  const [campers, setCampers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchCampers = async (currentPage: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers?page=${currentPage}&limit=${LIMIT}`
      );
      const data = await res.json();

      setCampers((prev) =>
        currentPage === 1 ? data.items : [...prev, ...data.items]
      );
      setTotal(data.total);
    } catch (error) {
      console.error("Помилка при завантаженні:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCampers(page);
  }, [page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const hasMore = campers.length < total;

  return (
    <section className={styles.container}>
      <div className={styles.list}>
        {campers.map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
      </div>

      {isLoading && <p className={styles.loader}>Loading...</p>}

      {hasMore && !isLoading && (
        <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </section>
  );
};
