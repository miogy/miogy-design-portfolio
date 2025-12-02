// app/graphics/FeaturedSlider.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./graphics.module.css";
import { GraphicWork } from "./graphicsData";

interface FeaturedSliderProps {
  works: GraphicWork[];
}

const VISIBLE_COUNT = 2; // 한 번에 보일 아트웍 수

export default function FeaturedSlider({ works }: FeaturedSliderProps) {
  const [index, setIndex] = useState(0);
  const total = works.length;

  if (total === 0) return null;

  // 현재 인덱스부터 2개씩 보여주기 (루프)
  const visibleWorks: GraphicWork[] = [];
  for (let i = 0; i < VISIBLE_COUNT; i++) {
    const work = works[(index + i) % total];
    visibleWorks.push(work);
  }

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % total);
  };

  return (
    <section className={styles.sliderSection}>
      <div className={styles.sliderRow}>
        {visibleWorks.map((work) => (
          <div key={work.id} className={styles.slideItem}>
            <Image
              src={work.thumbnail}
              alt={work.title}
              fill
              sizes="50vw"
              className={styles.slideImage}
            />
          </div>
        ))}
      </div>

      <div className={styles.sliderControls}>
        <button type="button" onClick={handlePrev}>
          PREV
        </button>
        <span className={styles.sliderDivider}>|</span>
        <button type="button" onClick={handleNext}>
          NEXT
        </button>
      </div>
    </section>
  );
}
