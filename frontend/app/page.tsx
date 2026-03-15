import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollIndicator from "@/components/ScrollIndicator";
import { motion } from "framer-motion";
import ParticleBackground from "@/components/ParticleBackground";


export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden bg-ax-black">
        <ParticleBackground />

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/3 top-1/3 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-[100px]" />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-10 md:px-16 lg:px-20">
          
          <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] lowercase leading-[1.1] text-white">
            <span className="font-light">the team behind</span>
            <br />
            <span className="font-bold text-gradient">armatrix</span>
          </h1>

          <div className="mt-12 flex items-center">
            <Link
              href="/team"
              className="group inline-flex items-center gap-3 border border-white/20 bg-transparent px-8 py-4 font-nav text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black">
              Meet the Roster
              <ArrowRight 
                size={14} 
                className="transition-transform duration-300 group-hover:translate-x-1" 
              />
            </Link>
          </div>
          </div>
          
       <ScrollIndicator />   
      </main>
      <Footer />
    </>
  );
}