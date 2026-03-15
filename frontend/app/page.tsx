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
      </main>
      <Footer />
    </>
  );
}