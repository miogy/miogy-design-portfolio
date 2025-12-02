// 1. 타입선언
export type GraphicCategory = "textile" | "tee" | "brand" | "etc";

export interface GraphicWork {
  id: string;
  title: string;
  year: string;
  category: GraphicCategory;
  client?: string;
  image: string; // /public/images/... 경로
  thumbnail: string; // /public/images/... 경로
  tags: string[];
  summary: string;
}

export const GRAPHIC_FILTERS: { key: "all" | GraphicCategory; label: string }[] =
  [
    { key: "all", label: "All" },
    { key: "textile", label: "Textile / Pattern" },
    { key: "tee", label: "T-shirt Graphic" },
    { key: "brand", label: "Branding" },
    { key: "etc", label: "Etc." },
  ];

// 2. 전체 작업 리스트
export const GRAPHIC_WORKS: GraphicWork[] = [
  {
    id: "textile-01",
    title: "Lovely Bohemian Floral Pattern",
    year: "2024",
    category: "textile",
    client: "내 작업(개인)",
    image:"/graphics/slide01.jpg",
    thumbnail: "/graphics/slide01.jpg",
    tags: ["SS 시즌", "플라워", "보헤미안"],
    summary:
      "여성복 원피스를 위한 전체 패턴 그래픽. 따뜻한 크림 바탕에 핑크/그린 포인트로 러블리한 무드를 표현한 작업.",
  },
  {
    id: "tee-01",
    title: "Sunny & Jade Poster T-shirt",
    year: "2024",
    category: "tee",
    client: "Sunny & Jade",
    image: "/graphics/slide02.jpg",
    thumbnail: "/graphics/slide02.jpg",
    tags: ["T-shirt", "타이포", "포스터 그래픽"],
    summary:
      "브랜드 첫 포스터를 T-shirt 그래픽으로 확장한 작업. 러프한 핸드라이팅과 심플한 컬러 블록이 포인트.",
  },
  {
    id: "brand-01",
    title: "Miogy Studio Wordmark",
    year: "2023",
    category: "brand",
    client: "Miogy Studio",
    image: "/graphics/slide03.jpg",
    thumbnail: "/graphics/slide03.jpg",
    tags: ["로고타입", "브랜딩"],
    summary:
      "그래픽 스튜디오 브랜드를 위한 워드마크 디자인. 심플하지만 손맛 있는 곡선으로 그래픽 디자이너의 캐릭터를 표현.",
  },
  {
    id: "etc-01",
    title: "Color Story – Sydney Morning",
    year: "2023",
    category: "etc",
    client: "개인 컬러 스터디",
    image: "/graphics/slide04.jpg",
    thumbnail: "/graphics/slide04.jpg",
    tags: ["컬러 팔레트", "무드보드"],
    summary:
      "시드니 아침 바다의 색을 기반으로 구성한 컬러 스토리 보드. 향후 스카프/테이블웨어 그래픽에 활용하기 위한 연구용.",
  },
  {
    id: "etc-01",
    title: "Color Story – Sydney Morning",
    year: "2023",
    category: "etc",
    client: "개인 컬러 스터디",
    image: "/graphics/slide05.jpg",
    thumbnail: "/graphics/slide05.jpg",
    tags: ["컬러 팔레트", "무드보드"],
    summary:
      "시드니 아침 바다의 색을 기반으로 구성한 컬러 스토리 보드. 향후 스카프/테이블웨어 그래픽에 활용하기 위한 연구용.",
  },
];

// 3. 슬라이드에 쓸 대표 작업들
//    → 위에서 정의된 GRAPHIC_WORKS 를 기반으로 만든다
export const MAIN_GRAPHIC_WORKS: GraphicWork[] = GRAPHIC_WORKS.slice(0, 4);