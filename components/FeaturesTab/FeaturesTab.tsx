import { Icon } from "../Icon/Icon";
import styles from "./FeaturesTab.module.css";

export const FeaturesTab = ({ camper }: { camper: any }) => {
  return (
    <div className={styles.container}>
      <div className={styles.tags}>
        {/* Трансмісія */}
        <div className={styles.tag}>
          <Icon id="diagram" width={20} height={20} />
          <span>{camper.transmission}</span>
        </div>

        {/* AC */}
        <div className={styles.tag}>
          <Icon id="wind" width={20} height={20} />
          <span>AC</span>
        </div>

        {/* Пальне (динамічна логіка: підставляє diesel, petrol тощо) */}
        <div className={styles.tag}>
          <Icon id={camper.engine.toLowerCase()} width={20} height={20} />
          <span>{camper.engine}</span>
        </div>

        {/* Кухня */}
        <div className={styles.tag}>
          <Icon id="cup-hot" width={20} height={20} />
          <span>Kitchen</span>
        </div>

        {/* Додаткові теги, якщо вони є в об'єкті */}
        {camper.radio && (
          <div className={styles.tag}>
            <Icon id="radio" width={20} height={20} />
            <span>Radio</span>
          </div>
        )}
        {camper.bathroom && (
          <div className={styles.tag}>
            <Icon id="water" width={20} height={20} />
            <span>Bathroom</span>
          </div>
        )}
      </div>

      <div className={styles.vehicleDetails}>
        <h3 className={styles.detailsTitle}>Vehicle details</h3>
        <hr className={styles.divider} />
        <ul className={styles.detailsList}>
          <li>
            <span>Form</span>
            <span className={styles.capitalize}>
              {camper.form === "panelTruck" ? "Van" : camper.form}
            </span>
          </li>
          <li>
            <span>Length</span> <span>{camper.length}</span>
          </li>
          <li>
            <span>Width</span> <span>{camper.width}</span>
          </li>
          <li>
            <span>Height</span> <span>{camper.height}</span>
          </li>
          <li>
            <span>Tank</span> <span>{camper.tank}</span>
          </li>
          <li>
            <span>Consumption</span> <span>{camper.consumption}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
