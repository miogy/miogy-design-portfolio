"use client";

import { useState } from "react";
import homeData from "@/data/home.json";
import Image from "next/image";
import styles from "./home.module.css";
import ScrollToTopButton from "./components/ScrollToTopButton";
import SectionTabs, {
  TabKey as SectionTabKey,
} from "./components/SectionTabs";

// 탭 정의
const HOME_TABS = [
  { key: "introduction", label: "Introduction" },
  { key: "career", label: "Career" },
  { key: "activity", label: "Archive" }, // 혹은 Activity/Archive 등 너가 원하는 이름
] as const;

type HomeTabKey = (typeof HOME_TABS)[number]["key"]; // "intro" | "career" | "archive"


export default function Home() {
  const [activeTab, setActiveTab] = useState<HomeTabKey>("introduction");
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className={styles.main}>
      {/* 1. 사진 */}
      <section className={styles.hero}>
        <div className={styles.profileWrapper}>
          <div className={styles.photoCircle}>
            <Image
              src={homeData.profileImage.src} // public 폴더의 이미지 이름에 맞게 수정
              alt={homeData.profileImage.alt}
              fill
              sizes="260px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* 2. 탭 */}
      <SectionTabs
        tabs={HOME_TABS}
        activeKey={activeTab}
        onChange={(key) => {
          setActiveTab(key as HomeTabKey);  // 상태 업데이트
          scrollToSection(key);             // 해당 섹션으로 스크롤 (원하면 유지)
        }}
      />

      {/* 탭 콘텐츠 공통 영역 */}
<section className={styles.section} id="tab-content">
  {activeTab === "introduction" && (
    <>
      <h2 className={styles.sectionTitle}>
  {homeData.introduction.title}
</h2>
{homeData.introduction.paragraphs.map((text, idx) => (
  <p key={idx} className={styles.bodyText}>
    {text}
  </p>
))}
    </>
  )}

  {activeTab === "career" && (
    <>
      <h2 className={styles.sectionTitle}>Career</h2>
      <ul className={styles.careerList}>
        {/* … 기존 Career 내용 그대로 … */}
          <li>
            2011.06 ~ 현재 &nbsp;|&nbsp; 여성복 Apparel Graphic Designer – 시즌별
            그래픽/텍스타일 개발 및 상품 기획 협업
          </li>
          <li>
            2022.12 ~ 2023.05 &nbsp;|&nbsp; Front-end 학습 및 개인 프로젝트
            (React, Next, TypeScript)
          </li>
          <li>
            2023.05 ~ 2023.08 &nbsp;|&nbsp; UI · Graphic Design & Web – 브랜드
            웹 페이지 디자인과 퍼블리싱 경험
          </li>
      </ul>
    </>
  )}

  {activeTab === "activity" && (
    <>
      <h2 className={styles.sectionTitle}>Archive</h2>
      {/* … 기존 Activity/Archive 내용 그대로 … */}
       <p className={styles.bodyText}>
          작업물과 일상, 디자인 아카이브를 여러 채널에 기록하고 있습니다.
        </p>
        <ul className={styles.activityList}>
          <li>
            <a
              href="https://www.instagram.com/mi_ogy"
              target="_blank"
              rel="noreferrer"
            >
              Instagram – @mi_ogy
            </a>
          </li>
          <li>
            <a
              href="https://github.com/miogy"
              target="_blank"
              rel="noreferrer"
            >
              GitHub – Front-end & Toy Projects
            </a>
          </li>
          <li>
            <a
              href="https://www.pinterest.com"
              target="_blank"
              rel="noreferrer"
            >
              Pinterest – Visual reference & moodboard
            </a>
          </li>
        </ul>
    </>
  )}
</section>
      {/* 스크롤 업 버튼 (컴포넌트) */}
      <ScrollToTopButton />
    </main>
  );
}
