"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

type ExternalLinkButtonProps = {
  link: string;
  icon: React.ReactNode;
};

function ExternalLinkButton({ link, icon }: ExternalLinkButtonProps) {
  return (
    <a
      href={link}
      target={link.startsWith("http") ? "_blank" : undefined}
      rel={link.startsWith("http") ? "noreferrer" : undefined}
      className={styles.iconButton}
    >
      {icon}
    </a>
  );
}

export default function Header() {
  const [display, setDisplay] = useState(false);
  const [title, setTitle] = useState("Designer | Front-end");
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleScrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const closeMenu = () => {
    setDisplay(false);
    handleScrollToTop();
  };

  return (
    <header className={styles.navWrap}>
      <h1 className={styles.headerInner}>
        {/* MENU 버튼 */}
        <button
          type="button"
          ref={menuButtonRef}
          className={styles.navMenu}
          onClick={() => setDisplay((prev) => !prev)}
        >
          MENU
        </button>

        {/* 가운데 MIOGY + 타이틀 */}
        <button
          type="button"
          className={styles.navMenu}
          onClick={() => {
            setTitle("Designer | Front-end");
            handleScrollToTop();
          }}
        >
          <p className={styles.brand}>MIOGY</p>
          <p className={styles.subtitle}>{title}</p>
        </button>

        {/* 오른쪽 인스타/깃허브/info */}
        <div className={styles.myInfo}>
          <Link className={styles.iconButton}
            href="https://www.instagram.com/mi_ogy"
            // icon={<BsInstagram />}
          >insta</Link>
          <Link className={styles.iconButton}
            href="https://github.com/miogy"
            // icon={<FaGithubSquare />}
          >Git</Link>
          {/* info는 일단 홈으로 연결 – 나중에 /info 페이지 만들면 href 바꾸면 돼 */}
          <Link href="/info" className={styles.iconButton}>
            info
          </Link>
        </div>
      </h1>

      {/* MENU 눌렀을 때 나오는 전체 메뉴 레이어 */}
      {display && (
        <div className={styles.menuDisplay}>
          <Link
            href="/"
            className={styles.menuLink}
            onClick={() => {
              setTitle("Designer | Front-end");
              closeMenu();
            }}
          >
            HOME
          </Link>

          <Link
            href="/graphics"
            className={styles.menuLink}
            onClick={() => {
              setTitle("GRAPHIC | TEXTILE & ARTWORK");
              closeMenu();
            }}
          >
            GRAPHIC
          </Link>

          <Link
            href="/development"
            className={styles.menuLink}
            onClick={() => {
              setTitle("DEVELOP | WEB & APP");
              closeMenu();
            }}
          >
            DEVELOP
          </Link>

          <button
            type="button"
            className={`${styles.menuLink} ${styles.closeBtn}`}
            onClick={closeMenu}
          >
            CLOSE
          </button>
        </div>
      )}
    </header>
  );
}
