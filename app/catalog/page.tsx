import styles from "./catalog.module.css";

export default function CatalogPage() {
  return (
    <div className="container">
      <section className={styles.catalogSection}>
        <h1 className="page-title">Our Campers</h1>

        <div className={styles.layout}>
          <aside className={styles.filters}>
            <p>Filters will be here</p>
          </aside>

          <div className={styles.list}>
            <p>Camper cards will be here</p>
          </div>
        </div>
      </section>
    </div>
  );
}
