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
      "옷과 제품에 들어가는 패턴과 그래픽을 오래 만들어 오면서, 제가 디자인한 제품들을 서비스 화면 속에서 어떻게 담아낼 수 있을지 배우기 위해 웹·프론트엔드와 UI 디자인을 함께 공부했습니다.",
      "도메인을 직접 만들고, Figma로 디자인한 화면을 실제 웹으로 구현해 보며 서비스 구조와 개발자와의 협업 방식을 자연스럽게 익혔습니다.",
      "지금은 이러한 경험을 기반으로 제품 그래픽부터 온라인 콘텐츠까지 하나의 흐름으로 연결하는 브랜드 디자이너를 지향하고 있습니다."
    ],
  },
    // 커리어
career: {
    title: "Career",
    items: [
      {
        period: "2025.03 ~ 2025.12",
        company: "㈜갤러리에이엠",
        role: "디자인팀 · 과장 · 그래픽디자인",
        summary: [
          "* 시즌 티셔츠 그래픽 기획",
          "- 리서치 및 기획(PPT)을 통한 시즌 콘셉트 및 디자인 컨셉 제안",
          "",
          "* 티셔츠 아트웍 개발 및 핸들링",
          "- 티셔츠 그래픽 디자인, 컬러웨이 전개, 프린트 업체 커뮤니케이션",
          "",
          "* 기타 브랜드 디자인 및 팝업 행사용 그래픽 제작",
          "",
          "* 팝업 행사 지원"
        ]
      },
      {
        period: "2023.12 ~ 2025.03",
        company: "㈜지엔코",
        role: "소재 그래픽 디자인 · 과장 · 그래픽디자인",
        summary: [
          "* 시즌 그래픽 기획",
          "- 인사이트/스튜디오/브랜드 리서치를 통한 트렌드 분석 및 시즌 그래픽 MAP 기획",
          "- 시즌별 원단업체 상담(패턴 방향, 프린트 소재 제안 등)",
          "",
          "* 시즌 패턴·그래픽 개발 및 핸들링",
          "- 올오버/원포인트 패턴, 티셔츠 아트웍, 자수, ACC·반다나 등 부자재 그래픽 개발",
          "- 디자인별 컬러웨이 개발 및 프린트 원단 품평 준비, 원단업체 커뮤니케이션",
          "",
          "* 메인 수정 및 생산 이슈 대응, 그래픽팀 일정 및 디자인 관리"
        ]
      },
      {
        period: "2023.06 ~ 2023.09",
        company: "㈜담다닷컴(DAMDA Co., Ltd.)",
        role: "디자인팀 · 임시직/프리랜서 · 그래픽디자인",
        summary: [
          "* 시즌 티셔츠 그래픽 기획",
          "",
          "* 티셔츠 아트웍 개발 및 핸들링",
          "",
          "* 웹 디자인 및 사이트 유지보수",
          "- 썸네일·상세페이지 등 온라인용 이미지 제작 및 보정",
          "- 카페24 기반 랜딩/상세페이지 디자인 및 HTML·CSS 작업, 상품 등록 및 관리",
          "",
          "*기타 브랜드 디자인 (비즈니스용 이미지, 영업용 PPT, 명함·로고 등 각종 그래픽 제작)"
        ]
      },
      {
        period: "2022.12 ~ 2023.05",
        company: "㈜옴니스토리(OmniStory Co., Ltd.)",
        role: "프론트엔드 · 선임연구원 · 프론트엔드",
        summary: [
          "* 프론트엔드·UI 업무를 동시에 수행하며 개발자·디자이너 간 커뮤니케이션 역할 수행",
          "- React JS와 REST API를 이용한 자사 웹사이트 전 페이지(메인, 회사소개, 어드민, 로그인, 제품, 문서, 데모 등) 프론트엔드 개발",
          "- 자사 서비스 데모 페이지(음성·영상 컨퍼런스 등) 개발",
          "- Figma 기반 자사 전체 페이지 UI 기획·디자인",
          "",
          "* 서비스 소개용 콘텐츠·배너 등 그래픽 제작(Adobe 툴 활용)"
        ]
      },
      {
        period: "2015.01 ~ 2017.05, 2018.10 ~ 2022.03",
        company: "㈜라이프실크",
        role: "디자인팀 · 과장 · 그래픽디자인",
        summary: [
          "* 2015~2017 첫 근무후 재입사(시즌 그래픽·패턴 총괄동일)",
          "",
          "* 동대문 및 여성복 브랜드 대상 시즌 그래픽·패턴 기획",
          "",
          "* 올오버·원포인트 패턴 및 티셔츠 아트웍 개발",
          "",
          "* 브랜드/동대문 메인 생산 건 그래픽 개발 및 일정 관리",
          "",
          "* 브랜드 및 공장과의 생산·공정 커뮤니케이션",
          "",
          "* DTP 조색·배색, 제도 리핏/컬러 도수 등 생산 이슈 해결 및 그래픽 컨펌 진행"
        ]
      },
      {
        period: "2017.10 ~ 2018.10",
        company: "㈜케이에스에이치",
        role: "그래픽디자인",
        summary: [
          "시즌 그래픽·패턴 기획",
          "",
          "* 패턴·아트웍 개발 및 해외 바이어 대응",
          "",
          "* 생산 핸들링 및 공정 관련 커뮤니케이션"
        ]
      },
      {
        period: "2012.09 ~ 2014.02",
        company: "해리 Fashion(패션)",
        role: "디자인팀 · 주임 · 그래픽디자인",
        summary: [
          "* 시즌 그래픽 기획 및 영업용 패턴 제안",
          "",
          "* DTP 올오버·포인트 아트웍 개발 및 컬러웨이 전개",
          "",
          "* 제도 보조, DTP 생산 일정 관리 및 공장 핸들링",
          "",
          "* 영업 보조(브랜드 원단 프린트 상담, 생산 핸들링)"
        ]
      },
      {
        period: "2011.06 ~ 2012.08",
        company: "㈜한영나염",
        role: "DTP 연구실 · 연구원 · 그래픽디자인",
        summary: [
          "* DTP 원단 컬러리스트",
          "",
          "* 면·레이온·실크·폴리 등 소재별 조색 및 동대문용 배색 작업",
          "",
          "* DTP 프린트기 관리 및 출력 퀄리티 체크",
          "",
          "* 패턴 디자인 개발 및 그래픽 편집",
          "",
          "올오버·포인트 패턴 개발 및 수정, 컬러웨이 작업"
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
        items: [
          "Adobe Illustrator",
          "– 패턴/텍스타일, 티셔츠 그래픽, 벡터 작업",
          "",
          "Adobe Photoshop", 
          "– 이미지 보정, 합성, 프린트 시뮬레이션",
          "",
          "Adobe After Effects(기본) ",
          "– 간단한 모션 그래픽 및 애니메이션,",
          "Figma ",
          "– UI 디자인, 와이어프레임, 프로토타입",
          "",
          "시즌 그래픽/텍스타일 기획 ",
          "– 콘셉트 보드, 트렌드 리서치, 그래픽 MAP",
          "",
          "HTML / CSS(기본) ",
          "– 정적 페이지 마크업, 간단한 스타일 수정",
          "",
          "Git / GitHub ",
          "– 코드 버전 관리, 포트폴리오 저장소 운영",
          "",
          "Notion / Google Docs ",
          "– 기획·리서치 정리 및 문서화"
        ]
      },
      {
        id: "personalWorks",
        title: "Personal Works",
        items: [
          "준비중입니다.",
        ]
      },
      {
        id: "learning",
        title: "Learning",
        items: [
          "React.js · Next.js 재학습 ",
          "– 기본 문법, 라우팅, 상태 관리 패턴",
          "",
          "AI Agent & Generative AI Workflow ",
          "– 패션 트렌드 RAG, 추천 툴 설계",
          "",
          "CLO 3D ",
          "– 의상 3D 시뮬레이션 및 그래픽 적용 테스트",
          "",
          "Figma 최신 기능 ",
          "– 변수, 오토 레이아웃 고급, 프로토타입"
        ]
      }
    ]
  }
} as const;
