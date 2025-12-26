// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Miogy Portfolio",
  description: "Miogy Studio-style portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-[#444]">
        <Header />
        <div className="min-h-[60vh]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
