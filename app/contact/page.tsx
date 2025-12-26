// app/contact/page.tsx
export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 pb-16 pt-10">
      <p className="text-xs tracking-widest text-[#444]/70">CONTACT</p>
      <h1 className="mt-2 text-2xl font-semibold text-[#222]">Contact Miogy</h1>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <a
          href="https://open.kakao.com/"
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-[#e5e5e5] bg-white p-6 hover:border-[#222]/40"
        >
          <p className="text-xs tracking-widest text-[#444]/70">KAKAO</p>
          <h2 className="mt-2 text-lg font-semibold text-[#222]">Open Chat (1:1)</h2>
          <p className="mt-3 text-sm text-[#444]/85">
            Send a project request via Kakao open chat.
          </p>
        </a>

        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-[#e5e5e5] bg-white p-6 hover:border-[#222]/40"
        >
          <p className="text-xs tracking-widest text-[#444]/70">INSTAGRAM</p>
          <h2 className="mt-2 text-lg font-semibold text-[#222]">DM</h2>
          <p className="mt-3 text-sm text-[#444]/85">Send a direct message on Instagram.</p>
        </a>

        <a
          href="mailto:hello@miogy.studio?subject=Project%20Inquiry"
          className="rounded-2xl border border-[#e5e5e5] bg-white p-6 hover:border-[#222]/40"
        >
          <p className="text-xs tracking-widest text-[#444]/70">EMAIL</p>
          <h2 className="mt-2 text-lg font-semibold text-[#222]">Proposal / Interview</h2>
          <p className="mt-3 text-sm text-[#444]/85">
            Send project proposals or interview offers by email.
          </p>
        </a>
      </div>
    </main>
  );
}
