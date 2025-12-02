// 타입 정의 
export type ProfileImage = {
  src: string;
  alt: string;
};

export type Introduction = {
  title: string;
  paragraphs: string[];
};

export interface CareerItem {
  period: string;
  role: string;
  company: string;
  summary: string[]; // 한줄 요약(담당 업무 정리)
}

export interface CareerData {
  title: string;
  items: CareerItem[];
}

export type ArchiveColumnId = "skills" | "personalWorks" | "learning";

export type ArchiveColumn = {
  id: ArchiveColumnId;
  title: string;
  items: string[];
};

export type Archive = {
  title: string;
  columns: ArchiveColumn[];
};

export type HomeData = {
  profileImage: {
    src: string;
    alt: string;
  };
  introduction: {
    title: string;
    paragraphs: string[];
  };
  career: {
    title: string;
    items: CareerItem[];
  };
  archive: {
    title: string;
    columns: {
      id: string;
      title: string;
      items: string[];
    }[];
  };
};


// 데이터
export const homeData: HomeData = {

    // 프로필
  profileImage: {
    src: "/images/profile.png",
    alt: "양미옥(Miogy) 프로필 사진",
  },
    // 소개글
  introduction: {
    title: "Introduction",
    paragraphs: [
      "패션 텍스타일과 어패럴 그래픽을 바탕으로, 브랜드 전체를 보는 그래픽 디자이너 양미옥입니다.",
      "옷과 제품에 들어가는 패턴과 그래픽을 오래 만들어 오면서,",
      "제가 디자인한 제품들을 서비스 화면 속에서 어떻게 담아낼 수 있을지 배우기 위해 웹·프론트엔드와 UI 디자인을 함께 공부했습니다.",
      "도메인을 직접 만들고, Figma로 디자인한 화면을 실제 웹으로 구현해 보며 서비스 구조와 개발자와의 협업 방식을 자연스럽게 익혔습니다.",
      "지금은 이러한 경험을 기반으로 제품 그래픽부터 온라인 콘텐츠까지 하나의 흐름으로 연결하는 브랜드 디자이너를 지향하고 있습니다."
    ],
  },
    // 커리어
  career: {
    title: "Career",
    items: [
      {
        period: "2011.06 ~ 현재",
        role: "Apparel Graphic Designer",
        company: "여성복 브랜드 이름 자리",
        summary: [
          "시즌별 그래픽/텍스타일 개발과 상품 기획 협업을 담당했습니다.",
          "트렌드 리서치를 통해 시즌 콘셉트와 그래픽 방향을 정리하고, 올오버 패턴·티셔츠 아트웍·자수 등 다양한 그래픽을 개발했습니다.",
          "MD, 생산 파트와 협업하며 프린트 원단 품평, 컬러 조정, 생산 이슈 대응까지 전 과정에 참여했습니다."
        ]
      },
      {
        period: "2022.12 ~ 2023.05",
        role: "Front-end Trainee",
        company: "개인 프로젝트",
        summary: [
          "React, Next.js, TypeScript를 중심으로 웹 프론트엔드 개발을 학습했습니다.",
          "UI 디자인 툴(Figma)로 설계한 화면을 실제 코드로 구현하며, 디자인-개발 간 협업 방식을 체득했습니다.",
          "개인 포트폴리오 사이트와 토이 프로젝트를 통해 컴포넌트 설계, 라우팅, 배포 경험을 쌓았습니다."
        ]
      },
      {
        period: "2023.05 ~ 2023.08",
        role: "UI · Graphic Design & Web",
        company: "브랜드 웹 페이지 디자인",
        summary: [
          "브랜드 웹 페이지의 UI 디자인과 그래픽 작업을 담당했습니다.",
          "서비스 톤앤매너에 맞는 레이아웃, 타이포그래피, 이미지 스타일을 설계하고 웹 퍼블리셔와 협업했습니다.",
          "그래픽 리소스를 웹 환경에 맞게 최적화하여, 제품 그래픽과 온라인 화면이 자연스럽게 연결되도록 작업했습니다."
        ]
      }
    ]
  },

    //아카이브
  archive: {
    title: "Archive",
    columns: [
      {
        id: "skills",
        title: "Skills / Tools",
        items: [],
      },
      {
        id: "personalWorks",
        title: "Personal Works",
        items: [],
      },
      {
        id: "learning",
        title: "Learning",
        items: [],
      },
    ],
  },
} as const;
