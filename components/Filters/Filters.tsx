import { Icon } from "../Icon/Icon";
import styles from "./Filters.module.css";

export const Filters = () => {
  return (
    <aside className={styles.filtersSide}>
      <div className={styles.filterGroup}>
        <p className={styles.filterTitle}>Filters</p>

        <h3 className={styles.subTitle}>Vehicle equipment</h3>
        <div className={styles.categoriesGrid}>
          <button className={styles.filterBtn}>
            <Icon id="wind" /> AC
          </button>
          <button className={styles.filterBtn}>
            <Icon id="diagram" /> Automatic
          </button>
          <button className={styles.filterBtn}>
            <Icon id="cup-hot" /> Kitchen
          </button>
          <button className={styles.filterBtn}>
            <Icon id="tv" /> TV
          </button>
          <button className={styles.filterBtn}>
            <Icon id="ph_shower" /> Shower
          </button>
        </div>

        <h3 className={styles.subTitle}>Vehicle type</h3>
        <div className={styles.categoriesGrid}>
          <button className={styles.filterBtn}>
            <Icon id="bi_grid-1x2" width={32} height={32} />
            Van
          </button>
          <button className={styles.filterBtn}>
            <Icon id="bi_grid" width={32} height={32} />
            Fully Integrated
          </button>
          <button className={styles.filterBtn}>
            <Icon id="bi_grid-3x3-gap" width={32} height={32} />
            Alcove
          </button>
        </div>
      </div>

      <button className={styles.searchBtn}>Search</button>
    </aside>
  );
};
