import styles from "./Spinner.module.css";

export const Spinner = () => {
  return (
    <div className={styles.spinner} data-testid="spinner" role="progressbar" />
  );
};
