export type WorkCategory = "in-house" | "promotion" | "artist-ip" | "archive" | "trade";
export type CategoryFilter = WorkCategory | "all";
export type YearFilter = "all" | string;

export type WorkItem = {
  slug: string;
  title: string;
  year: number;
  category: WorkCategory;
  summary: string;
  thumb?: string;
};
