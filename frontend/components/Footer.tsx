"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      {/* ── Contact Section — exact armatrix.in clone of Footer ── */}
      <section id="contact" style={{ backgroundColor: "#ffffff" }}>
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">

          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "12px",
              fontWeight: 400,
              letterSpacing: "0.15em",
              color: "rgba(0,0,0,0.4)",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            Contact
          </p>

          <h2
            style={{
              fontFamily: "var(--font-raleway), sans-serif",
              fontSize: "clamp(3rem, 10vw, 120px)",
              fontWeight: 300,
              color: "rgba(0,0,0,0.95)",
              letterSpacing: "6px",
              lineHeight: "1.15",
              margin: 0,
            }}
          >
            Get in touch
          </h2>

          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              color: "rgba(0,0,0,0.5)",
              marginTop: "32px",
              marginBottom: "8px",
            }}
          >
            Start a conversation
          </p>

          <a
            href="mailto:contact@armatrix.in"
            className="text-gradient email-hover-link"
            style={{
              fontFamily: "var(--font-raleway), sans-serif",
              fontSize: "clamp(1.5rem, 5vw, 60px)",
              fontWeight: 300,
              lineHeight: "1.2",
              display: "inline-block",
              paddingBottom: "12px",
              borderBottom: "2px solid rgba(0,0,0,0.2)",
              textDecoration: "none",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            contact@armatrix.in
          </a>

          <div style={{ marginTop: "48px" }}>
            <p
              style={{
                fontFamily: "var(--font-raleway), sans-serif",
                fontSize: "30px",
                fontWeight: 500,
                color: "rgba(0,0,0,0.95)",
                marginBottom: "16px",
              }}
            >
              Our Office:
            </p>

            <div
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "17.6px",
                fontWeight: 300,
                color: "rgba(0,0,0,0.95)",
                lineHeight: "28.16px",
              }}
            >
              <p style={{ margin: 0 }}>4th Floor, 444 Jai Tower</p>
              <p style={{ margin: 0 }}>Sri Balaji Krupa Layout</p>
              <p style={{ margin: 0 }}>RK Hegde Nagar</p>
              <p style={{ margin: 0 }}>Bengaluru - 560077</p>
            </div>

            <a
              href="https://www.google.com/maps/place/Armatrix/@13.0685442,77.6267737,17z/data=!4m6!3m5!1s0x3bae190047f18985:0xdaab568fd8feea1!8m2!3d13.0685442!4d77.6267737!16s%2Fg%2F11xlk60v3p?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "20px",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                color: "rgba(0,0,0,0.5)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.85)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.5)";
              }}
            >
              View on Map
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <footer style={{ backgroundColor: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.1)" }}>
        <div className="mx-auto max-w-7xl px-6 py-8 md:px-10">

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <Link href="/" className="transition-opacity hover:opacity-70">
              <div style={{ position: "relative", height: "48px", width: "80px" }}>
                <Image
                  src="/logos/logo_registered.png"
                  alt="Armatrix"
                
                  fill
                  className="object-contain"
                  style={{ filter: "brightness(0)" }}
                />
              </div>
            </Link>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "8px",
                fontFamily: "var(--font-raleway), sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                color: "rgba(0,0,0,0.6)",
              }}
            >
              <Link href="https://drive.google.com/drive/folders/1Js1km-jlQXZ7qOTnQt3ktVlDKXLuZdQt" target="_blank" style={{ color: "inherit", textDecoration: "none" }}>
                Media Kit
              </Link>
              <Link href="https://drive.google.com/file/d/1ty-TytK1a0_HvLeUDKtt9Eirrw5tyJTt/view" target="_blank" style={{ color: "inherit", textDecoration: "none" }}>
                Privacy Policy
              </Link>
            </div>
          </div>

          <div
            style={{
              marginTop: "32px",
              paddingTop: "24px",
              borderTop: "1px solid rgba(0,0,0,0.08)",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "14.4px",
                fontWeight: 400,
                color: "rgba(0,0,0,0.6)",
                lineHeight: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                margin: 0,
              }}
            >
              <span style={{ fontSize: "18px" }}>©</span> Armatrix 2026 All Rights Reserved
            </p>
            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "13.6px",
                fontWeight: 300,
                color: "rgba(0,0,0,0.5)",
                marginTop: "6px",
              }}
            >
              Products under development, currently not for sale
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
