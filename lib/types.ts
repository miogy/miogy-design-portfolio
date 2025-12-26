// lib/types.ts
export type WorkCategory = "in-house" | "promotion" | "artist-ip" | "archive" | "trade";

export type WorkItem = {
  slug: string;
  title: string;
  year: number;
  category: WorkCategory;
  summary: string;
  thumb?: string; // public path (ex: "/placeholder/hero-1.jpg")
};
