// app/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./home.module.css";
import ScrollToTopButton from "./components/ScrollToTopButton";
import SectionTabs from "./components/SectionTabs";
import {homeData} from "../data/homeData";

const HOME_TABS = [
  { key: "introduction", label: "Introduction" },
  { key: "career", label: "Career" },
  { key: "activity", label: "Archive" },
] as const;

type HomeTabKey = (typeof HOME_TABS)[number]["key"];

export default function Home() {
  const [activeTab, setActiveTab] = useState<HomeTabKey>("introduction");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className={styles.main}>
      {/* ✅ 페이지 전체를 감싸는 컨테이너 */}
      <div className={styles.pageContainer}>
        {/* 1. 상단 프로필 영역 */}
        <section className={styles.hero}>
          <div className={styles.profileWrapper}>
            <div className={styles.photoCircle}>
              <Image
                src={homeData.profileImage.src}
                alt={homeData.profileImage.alt}
                fill
                sizes="260px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </section>

        {/* 2. 상단 탭 */}
        <SectionTabs
          tabs={HOME_TABS}
          activeKey={activeTab}
          onChange={(key) => {
            setActiveTab(key as HomeTabKey);
            scrollToSection("tab-content");
          }}
        />

        {/* 3. 탭 공통 컨텐츠 영역 */}
        <section id="tab-content" className={styles.section}>

          {/* 1. Introduction */}
          {activeTab === "introduction" && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Introduction</h2>
              <div className={styles.introBox}>
                {homeData.introduction.paragraphs.map((text, idx) => (
                  <p key={idx} className={styles.introBody}>
                    {text}
                  </p>
                ))}
              </div>
            </section>
          )}


          {/* 2. Career – 상세 버전 */}
          {activeTab === "career" && (
  <section className={styles.section}>
    <div className={styles.careerSection}>
      <h2 className={styles.sectionTitle}>{homeData.career.title}</h2>

      <ul className={styles.careerList}>
        {homeData.career.items.map((item, idx) => {
          // summaryLines가 배열일 수도, summary 하나일 수도 있어서 정규화
          const lines =
            Array.isArray(item.summaryLines) && item.summaryLines.length > 0
              ? item.summaryLines
              : item.summary
              ? [item.summary]
              : [];

          return (
            <li key={idx} className={styles.careerItem}>
              {/* 왼쪽: 기간 / 회사 / 직무 */}
              <div className={styles.careerMeta}>
                <p className={styles.careerPeriod}>{item.period}</p>
                <p className={styles.careerCompany}>{item.company}</p>
                <p className={styles.careerRole}>{item.role}</p>
              </div>

              {/* 오른쪽: 요약(여러 줄) */}
              <div className={styles.careerSummary}>
                {item.summary.map((line, i) =>
    line.trim() === "" ? (
      // 🔸 빈 문자열 → 줄 띄우기용 요소
      <p
        key={`space-${i}`}
        className={styles.summaryLineSpacer}
      >
        &nbsp;
      </p>
    ) : (
      <p key={i} className={styles.summaryLine}>
        {line}
      </p>
    )
  )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
)}

          {/* 아카이브 */}
          {activeTab === "activity" && (
            <>
              <h2 className={styles.sectionTitle}>
                {homeData.archive.title}
              </h2>
              <div className={styles.archiveGrid}>
                {homeData.archive.columns.map((col) => (
                  <div
                    key={col.id}
                    className={styles.archiveColumn}
                  >
                    <h3 className={styles.archiveSubtitle}>
                      {col.title}
                    </h3>
                    <ul className={styles.archiveList}>
                      {col.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* 4. 스크롤 투 탑 버튼 */}
        <ScrollToTopButton />
      </div>
    </main>
  );
}
