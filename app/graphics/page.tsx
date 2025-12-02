// 페이지내 상단탭
// const GRAPHICS_TABS = [
//   { key: "all", label: "All" },
//   { key: "textile", label: "Textile" },
//   { key: "artwork", label: "Artwork" },
// ] as const;

// type GraphicsTabKey = (typeof GRAPHICS_TABS)[number]["key"];

// export default function GraphicsPage() {
//   const [activeTab, setActiveTab] = useState<GraphicsTabKey>("all");

//   return (
//     <main>
//       <SectionTabs
//         tabs={GRAPHICS_TABS}
//         activeKey={activeTab}
//         onChange={(key) => setActiveTab(key as GraphicsTabKey)}
//       />

//       {/* 아래에 activeTab === "textile" 같은 조건으로 콘텐츠 렌더 */}
//     </main>
//   );
// }