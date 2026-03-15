"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
  { href: "/team", label: "Team" },
  { href: "/#contact", label: "Contact" }
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute top-0 left-0 right-0 z-[100]">

      <div
        className="flex items-start justify-between"
        style={{
          paddingTop: "51px",
          paddingLeft: "15%",
          paddingRight: "15%",
        }}
      >
        <Link href="/" className="block flex-shrink-0">
        <motion.div
        whileHover={{ scale: 1.15 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}>
          <Image
            src="/logos/logo_white.webp"
            alt="Armatrix"
            width={120}
            height={120}
            className="h-[120px] w-[120px]"
            style={{ objectFit: "contain", width: "120px", height: "120px" }}
            priority
            unoptimized
          />
          </motion.div>
        </Link>

        <div
          className="flex items-center gap-10"
          style={{ paddingTop: "46px" }}>
          {links.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`nav-link-underline font-nav text-[17.6px] font-light uppercase transition-colors duration-300 ${
                  isActive ? "text-white" : "text-white/65 hover:text-white"
                }`}
                style={{ letterSpacing: "2.112px" }}>
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
