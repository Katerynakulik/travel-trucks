import styles from "./catalog.module.css";
import { getCampers } from "@/lib/api";
import { Filters } from "@/components/Filters/Filters";
import { CamperCard } from "@/components/CamperCard/CamperCard";

export default async function CatalogPage() {
  const data = await getCampers();

  const campers = data.items || data;

  return (
    <div className="container">
      <section className={styles.catalogSection}>
        <h1 className="page-title hidden">Explore our campers</h1>
        <div className={styles.layout}>
          <Filters />

          <section className={styles.list}>
            {campers.map((camper: any) => (
              <CamperCard key={camper.id} camper={camper} />
            ))}
          </section>
        </div>
      </section>
    </div>
  );
}
