
import type { WorkItem, WorkCategory } from "./types";

export const WORK_CATEGORIES: { key: WorkCategory; label: string }[] = [
  { key: "in-house", label: "In-house" },
  { key: "promotion", label: "Promotion" },
  { key: "artist-ip", label: "Artist IP" },
  { key: "archive", label: "Archive" },
];

export const WORKS: WorkItem[] = [
  {
    slug: "le-studio-ss25-boho-print",
    title: "LE STUDIO SS25 Boho Print",
    year: 2025,
    category: "in-house",
    summary: "Seasonal print direction and production-ready artwork for apparel & goods.",
    thumb: "/placeholder/hero-1.jpg",
  },
  {
    slug: "fabric-promo-fw25",
    title: "Fabric Promo FW25",
    year: 2024,
    category: "promotion",
    summary: "Promotional look & key visual guide for seasonal campaign materials.",
    thumb: "/placeholder/hero-3.jpg",
  },
  {
    slug: "sunny-jade-ip-series-01",
    title: "Sunny & Jade IP Series 01",
    year: 2025,
    category: "artist-ip",
    summary: "Character-driven graphic system and merch-ready asset set.",
    thumb: "/placeholder/hero-2.jpg",
  },
  {
    slug: "archive-typography-study-01",
    title: "Archive Typography Study 01",
    year: 2023,
    category: "archive",
    summary: "Self-driven study archive: typography experiments and layout systems.",
    thumb: "/placeholder/hero-4.jpg",
  },
  {
    slug: "inhouse-textile-set-2024",
    title: "In-house Textile Set 2024",
    year: 2024,
    category: "in-house",
    summary: "Textile set for in-house line: motif development and repeat engineering.",
    thumb: "/placeholder/hero-4.jpg",
  },
  {
    slug: "promotion-store-pop-2025",
    title: "Promotion Store POP 2025",
    year: 2025,
    category: "promotion",
    summary: "POP assets for retail: signage, tags, and coordinated visuals.",
    thumb: "/placeholder/hero-1.jpg",
  },
];

export const YEARS: number[] = Array.from(new Set(WORKS.map((w) => w.year))).sort((a, b) => b - a);
