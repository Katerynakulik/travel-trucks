"use client";

import { Icon } from "../Icon/Icon";
import styles from "./LocationFilter.module.css";

interface LocationFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const LocationFilter = ({ value, onChange }: LocationFilterProps) => {
  return (
    <div className={styles.container}>
      <label htmlFor="location" className={styles.label}>
        Location
      </label>
      <div className={styles.inputWrapper}>
        <Icon
          id="map"
          width={20}
          height={20}
          className={value ? styles.iconActive : styles.iconDefault}
        />
        <input
          id="location"
          type="text"
          placeholder="City, Country"
          className={styles.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};
