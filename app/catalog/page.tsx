import styles from "./catalog.module.css";
import { getCampers } from "@/lib/api";

export default async function CatalogPage() {
  const campers = await getCampers();
  return (
    <div className="container">
      <h1 className="page-title">Explore our campers</h1>
      <div className={styles.layout}>
        <section className={styles.list}>
          {campers.items.map((camper: any) => (
            <div key={camper.id} className="card">
              {camper.name} - {camper.price}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
