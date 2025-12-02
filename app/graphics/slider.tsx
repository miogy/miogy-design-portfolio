"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./slider.module.css";
import type { GraphicWork } from "@/data/graphicsData";

type SliderProps = {
  works: GraphicWork[];
};

export default function GraphicsSlider({ works }: SliderProps) {
  const [index, setIndex] = useState(0);

  if (!works || works.length === 0) return null;

  const total = works.length;
  const nextIndex = (index + 1) % total;

  const handleNext = () => setIndex((prev) => (prev + 1) % total);
  const handlePrev = () => setIndex((prev) => (prev - 1 + total) % total);

  // 자동 재생
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [total]);

  const left = works[index];
  const right = works[nextIndex];

  return (
    <section className={styles.sliderWrapper}>
      <div className={styles.slideRow}>
        {[left, right].map((work) => (
          <figure key={work.id} className={styles.slideItem}>
            <div className={styles.imageWrapper}>
              <Image
                src={work.thumbnail}
                alt={work.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.slideImage}
              />
            </div>
          </figure>
        ))}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.controlButton}
          onClick={handlePrev}
        >
          PREV
        </button>
        <span>|</span>
        <button
          type="button"
          className={styles.controlButton}
          onClick={handleNext}
        >
          NEXT
        </button>
      </div>
    </section>
  );
}
