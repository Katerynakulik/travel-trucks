import styles from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={styles.overlay}>
      <span className={styles.spinner}></span>
    </div>
  );
};
