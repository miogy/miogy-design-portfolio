"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./graphics.module.css";
import Slider from "./slider";

import {
  GRAPHIC_FILTERS,
  GRAPHIC_WORKS,
  MAIN_GRAPHIC_WORKS,
  GraphicCategory,
  GraphicWork,
} from "@/data/graphicsData";

type FilterKey = "all" | GraphicCategory;

export default function GraphicsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filteredWorks: GraphicWork[] =
    activeFilter === "all"
      ? GRAPHIC_WORKS
      : GRAPHIC_WORKS.filter((work) => work.category === activeFilter);

  return (
    <main className={styles.main}>
      <div className={styles.pageContainer}>
        {/* 0. 메인 슬라이드 */}
        <Slider works={MAIN_GRAPHIC_WORKS} />

        {/* 1. 상단 소개 영역 */}
        <section className={styles.hero}>
          <h1 className={styles.title}>Graphic &amp; Textile Works</h1>
          <p className={styles.subtitle}>
            의류 그래픽, 텍스타일 패턴, T-shirt 아트워크, 브랜딩 작업까지
            한눈에 볼 수 있는 그래픽 포트폴리오입니다.
          </p>
          <p className={styles.subtitle}>
            시즌/카테고리별로 정리된 작업들을 통해 제가 어떤 무드와 방향성을
            가진 디자이너인지 확인하실 수 있어요.
          </p>
        </section>

        {/* 2. 필터 탭 */}
        <div className={styles.filterRow}>
          {GRAPHIC_FILTERS.map((filter) => (
            <button
              key={filter.key}
              className={`${styles.filterButton} ${
                activeFilter === filter.key ? styles.activeFilter : ""
              }`}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* 3. 카드 그리드 */}
        <section className={styles.gridSection}>
          {filteredWorks.length === 0 ? (
            <p className={styles.emptyText}>
              아직 이 카테고리에 등록된 작업이 없습니다. (곧 채워질 예정이에요!)
            </p>
          ) : (
            <div className={styles.cardGrid}>
              {filteredWorks.map((work) => (
                <article key={work.id} className={styles.card}>
                  <div className={styles.thumbnailWrapper}>
                    <Image
                      src={work.thumbnail}
                      alt={work.title}
                      width={600}
                      height={400}
                      className={styles.thumbnail}
                    />
                    <span className={styles.categoryChip}>
                      {
                        GRAPHIC_FILTERS.find(
                          (f) => f.key === work.category
                        )?.label
                      }
                    </span>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.metaRow}>
                      <span className={styles.year}>{work.year}</span>
                      {work.client && (
                        <span className={styles.client}>{work.client}</span>
                      )}
                    </div>

                    <h2 className={styles.cardTitle}>{work.title}</h2>
                    <p className={styles.summary}>{work.summary}</p>

                    {work.tags.length > 0 && (
                      <ul className={styles.tagList}>
                        {work.tags.map((tag) => (
                          <li key={tag} className={styles.tagItem}>
                            #{tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
