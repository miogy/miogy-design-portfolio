
"use client";

import styles from "./SectionTabs.module.css";

export type TabKey = string;

export type TabItem = {
  key: TabKey;   // "introduction" | "career" | "activity"
  label: string; // 화면에 보여줄 텍스트
};

type SectionTabsProps = {
  tabs: TabItem[];
  activeKey: TabKey;
  onChange: (key: TabKey) => void;
};

export default function SectionTabs({
  tabs,
  activeKey,
  onChange,
}: SectionTabsProps) {
  return (
    <div className={styles.buttonRow}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          className={`${styles.tabButton} ${
            activeKey === tab.key ? styles.activeTab : ""
          }`}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
