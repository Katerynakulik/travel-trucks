import styles from "./Filters.module.css";

export const Filters = () => {
  return (
    <aside className={styles.filtersSide}>
      <div className={styles.locationGroup}>
        <label className={styles.label}>Location</label>
        <div className={styles.inputWrapper}>
          <input type="text" placeholder="City" className={styles.input} />
        </div>
      </div>

      <div className={styles.filterGroup}>
        <p className={styles.filterTitle}>Filters</p>
        <h3 className={styles.subTitle}>Vehicle equipment</h3>
        {/* AC, Automatic, Kitchen... */}
      </div>

      <button className={styles.searchBtn}>Search</button>
    </aside>
  );
};
