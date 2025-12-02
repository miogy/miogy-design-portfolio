"use client";

import { useState } from "react";
import { homeData } from "../data/homeData";
import Image from "next/image";
import styles from "./home.module.css";
import ScrollToTopButton from "./components/ScrollToTopButton";

type TabKey = "intro" | "career" | "archive";

export type HomeIntro = {
  title: string;
  paragraphs: string[];
};

export type HomeCareerItem = {
  period: string;
  role: string;
  company: string;
  summary: string;
  responsibilities: string[];
};

export type HomeArchiveColumn = {
  title: string;
  items: string[];
};

export default function Home() {
  // 처음 화면: Introduction
  const [activeTab, setActiveTab] = useState<TabKey>("intro");

  return (
    <main className={styles.main}>
      {/* 1. 상단 프로필 영역 (세 탭 공통) */}
      <section className={styles.hero}>
        <div className={styles.profileWrapper}>
          <div className={styles.photoCircle}>
            <Image
              src={homeData.profileImage.src} // TODO: 나중에 JSON/이력서 데이터로 교체
              alt={homeData.profileImage.alt}
              fill
              sizes="260px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* 2. 탭 버튼 */}
      <div className={styles.buttonRow}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "intro" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("intro")}
        >
          Introduction
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "career" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("career")}
        >
          Career
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "archive" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("archive")}
        >
          Archive
        </button>
      </div>

      {/* 3. 탭별 내용 영역 */}
      <section className={styles.tabContent}>
        {/* 3-1. Introduction 화면 */}
        {activeTab === "intro" && (
          <div className={styles.introSection}>
            <h2 className={styles.sectionTitle}>
              {homeData.introduction.title}
            </h2>
              {homeData.introduction.paragraphs.map((text, idx) => (
                <p key={idx} className={styles.bodyText}>
                {text}
                </p>
              ))}

          </div>
        )}

        {/* 3-2. Career 화면 – 전체 커리어 타임라인 UI */}
        {activeTab === "career" && (
          <div className={styles.careerSection}>
            <h2 className={styles.sectionTitle}>
              {homeData.career.title}
            </h2>
            <ul className={styles.careerList}>
              {homeData.career.items.map((item, idx) => (
        <li key={idx} className={styles.careerItem}>
          {/* 기간 */}
          <p className={styles.careerPeriod}>{item.period}</p>

          {/* 직무명 + 회사명 */}
          <p className={styles.careerRole}>{item.role}</p>
          <p className={styles.careerCompany}>{item.company}</p>

          {/* 여러 문단 summary */}
          <div className={styles.careerSummary}>
            {item.summary.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </li>
      ))}
              </ul>
                
          </div>
        )}

        {/* 3-3. Archive 화면 – 스킬 / 개인 작업 / 학습 중인 것 */}
        {activeTab === "archive" && (
          <div className={styles.archiveSection}>
            <h2 className={styles.sectionTitle}>Archive</h2>

            <div className={styles.archiveGrid}>
              {/* 왼쪽: 사용 가능한 프로그램 / 스킬 */}
              <div className={styles.archiveColumn}>
                <h3 className={styles.archiveSubtitle}>Skills / Tools</h3>
                <ul className={styles.archiveList}>
                  {/* TODO: 사용 가능한 디자인/개발 툴 리스트 */}
                  <li>Adobe Photoshop / Illustrator</li>
                  <li>Figma (UI 디자인, 프로토타입)</li>
                  <li>CLO 3D (의상 시뮬레이션)</li>
                  <li>기본 Front-end (HTML, CSS, JavaScript, React, Next.js)</li>
                </ul>
              </div>

              {/* 중앙: 개인 작업 / 포트폴리오 아카이브 */}
              <div className={styles.archiveColumn}>
                <h3 className={styles.archiveSubtitle}>Personal Works</h3>
                <ul className={styles.archiveList}>
                  {/* TODO: 대표 개인 작업/프로젝트 이름들 */}
                  <li>Sunny &amp; Jade 라이프스타일 브랜드 키비주얼</li>
                  <li>텍스타일 패턴 · 티셔츠 그래픽 아트워크</li>
                  <li>Miogi Studio 그래픽 아카이브</li>
                </ul>
              </div>

              {/* 오른쪽: 현재 학습 중인 툴/프로그램 */}
              <div className={styles.archiveColumn}>
                <h3 className={styles.archiveSubtitle}>Learning</h3>
                <ul className={styles.archiveList}>
                  {/* TODO: 현재 공부 중인 기술/툴 리스트 */}
                  <li>TypeScript &amp; Next.js 심화</li>
                  <li>RAG 기반 패션 트렌드 리서치 툴</li>
                  <li>Generative AI 활용 그래픽 워크플로우</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>

      <ScrollToTopButton />
    </main>
  );
}
