// app/about/page.tsx
export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 pb-16 pt-10">
      <p className="text-xs tracking-widest text-[#444]/70">ABOUT</p>
      <h1 className="mt-2 text-2xl font-semibold text-[#222]">About Miogy</h1>

      <div className="mt-8 rounded-2xl border border-[#e5e5e5] bg-white p-6">
        <h2 id="intro" className="text-lg font-semibold text-[#222]">
          Values
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#444]/85">
          Clarity · Consistency · Care. I build calm systems that scale from product to screen.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-[#222]">Career</h2>
        <p className="mt-3 text-sm leading-relaxed text-[#444]/85">
          (Next step: add career timeline + company thumbnails + work links.)
        </p>
      </div>
    </main>
  );
}

