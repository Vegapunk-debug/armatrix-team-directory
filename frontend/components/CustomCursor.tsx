"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: -100, y: -100 });
    const target = useRef({ x: -100, y: -100 });
    const rafId = useRef<number | null>(null);
    const [isLight, setIsLight] = useState(false);

    useEffect(() => {
        const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        const cursor = cursorRef.current;
        if (!cursor) return;



        const getEffectiveBg = (el: Element | null): string | null => {
            let node = el;
            while (node && node !== document.body) {
                const bg = getComputedStyle(node).backgroundColor;
                const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]+)?/);
                if (match) {
                    const alpha = match[4] !== undefined ? parseFloat(match[4]) : 1;
                    if (alpha > 0.05) return bg;
                }
                node = node.parentElement;
            }
            return null;
        };

        const onMouseMove = (e: MouseEvent) => {
            target.current = { x: e.clientX, y: e.clientY };

            const el = document.elementFromPoint(e.clientX, e.clientY);
            const bg = getEffectiveBg(el);
            if (bg) {
                const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                if (match) {
                    const r = parseInt(match[1]);
                    const g = parseInt(match[2]);
                    const b = parseInt(match[3]);
                    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
                    setIsLight(brightness > 128);
                }
            }
        };

        const animate = () => {
            const ease = 0.12;
            pos.current.x += (target.current.x - pos.current.x) * ease;
            pos.current.y += (target.current.y - pos.current.y) * ease;

            if (cursor) {
                cursor.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
            }

            rafId.current = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", onMouseMove);
        rafId.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
            style={{
                width: "clamp(0.9rem, 1.125vw, 1.125rem)",
                height: "clamp(0.9rem, 1.125vw, 1.125rem)",
                borderRadius: "50%",
                backgroundColor: isLight ? "rgb(0,0,0)" : "rgb(255,255,255)",
                boxShadow: isLight
                    ? "0 0 15px rgba(0,0,0,0.6), 0 0 30px rgba(0,0,0,0.3)"
                    : "0 0 15px rgba(255,255,255,0.6), 0 0 30px rgba(255,255,255,0.3)",
                transition: "background-color 0.8s, box-shadow 0.8s",

                willChange: "transform",
            }}
        />
    );
}
