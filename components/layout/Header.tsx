// components/layout/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e5e5e5] bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4">
        {/* Logo */}
        <Link href="/" className="text-sm font-semibold tracking-[0.18em] text-[#222]">
          MIOGY
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-6 text-sm text-[#444]">
          <Link href="/" className="hover:text-[#222]">
            Home
          </Link>
          <Link href="/work" className="hover:text-[#222]">
            Work
          </Link>
          <Link href="/about" className="hover:text-[#222]">
            About
          </Link>
          <Link href="/contact" className="hover:text-[#222]">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
