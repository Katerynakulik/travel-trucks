import { Suspense } from "react";
import { Filters } from "@/components/Filters/Filters";
import { CamperList } from "@/components/CamperList/CamperList";
import styles from "./catalog.module.css";
// Створюємо окремий клієнтський компонент для контенту, щоб ізолювати Suspense
function CatalogContent() {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <Filters />
      </aside>
      <section className={styles.content}>
        <CamperList />
      </section>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <main className={styles.container}>
      {/* Огортаємо ВСЕ, що залежить від URL, в один Suspense */}
      <Suspense fallback={<div className={styles.loader}>Loading...</div>}>
        <CatalogContent />
      </Suspense>
    </main>
  );
}
