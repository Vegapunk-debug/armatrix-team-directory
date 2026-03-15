import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden bg-ax-black">

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/3 top-1/3 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-[100px]" />
        </div>
        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-10 md:px-16 lg:px-20">
          <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] lowercase leading-[1.1] text-white">
            <span className="font-light">the team behind</span>
            <br />
            <span className="font-bold">armatrix</span>
          </h1>
        </div>
      </main>
      <Footer />
    </>
  );
}