import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-ax-surface/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-10 py-4 md:px-16 lg:px-20">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-bold text-white">
            <span className="font-light">the team behind</span>
            <span className="font-bold">armatrix</span>
          </Link>
          <Link
            href="/team"
            className="font-nav text-[13px] font-light uppercase text-white/40 transition hover:text-white/70"
            style={{ letterSpacing: "2.112px" }}
          >
            Team
          </Link>
        </div>
      </div>
    </nav>
  );
}