// app/components/ScrollToTopButton.tsx
"use client";

import styles from "./ScrollToTopButton.module.css";

export default function ScrollToTopButton() {
  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button type="button" className={styles.scrollButton} onClick={handleClick}>
      <span className={styles.arrow}>↑</span>
      <span className={styles.label}>SCROLL TO TOP</span>
    </button>
  );
}

