import styles from "./catalog.module.css";
import { getCampers } from "@/lib/api";
import { Filters } from "@/components/Filters/Filters";
export default async function CatalogPage() {
  const data = await getCampers();

  const campers = data.items || data;

  return (
    <div className="container">
      <section className={styles.catalogSection}>
        <h1 className="page-title">Explore our campers</h1>

        <div className={styles.layout}>
          <Filters />

          <section className={styles.list}>
            {campers.map((camper: any) => (
              <div key={camper.id} className={styles.tempCard}>
                <h3 className={styles.camperName}>{camper.name}</h3>
                <p>Price: {camper.price.toFixed(2)}€</p>
              </div>
            ))}
          </section>
        </div>
      </section>
    </div>
  );
}
