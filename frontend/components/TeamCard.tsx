"use client";
import { useRef, useState, useCallback } from "react";
import { motion, Variants } from "framer-motion";
import { Linkedin, Github, Pencil, Trash2 } from "lucide-react";
import type { TeamMember } from "@/lib/api";

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.6
        }
    }
};


export default function TeamCard({ member, onEdit, onDelete }: {
    member: TeamMember;
    onEdit: (member: TeamMember) => void;
    onDelete: (member: TeamMember) => void;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!cardRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            setSpotlightPos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        },
        []
    );

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

    return (
        <motion.article
            variants={cardVariants}
            whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 20 } }}
            className="group relative">
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative overflow-hidden rounded-xl">
                <div className="absolute -inset-[1px] rounded-xl border-shimmer opacity-40 group-hover:opacity-0 transition-opacity duration-500" />

                <div
                    className="absolute -inset-[1px] rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                        background: isHovered ? `radial-gradient(600px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255, 200, 100, 0.3), rgba(150, 180, 100, 0.12) 40%, transparent 70%)` : "none"
                    }} />

                <div
                    className="absolute inset-0 z-10 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
                    style={{
                        background: isHovered
                            ? `radial-gradient(350px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255, 200, 100, 0.07), transparent 60%)`
                            : "none"
                    }} />

                </div>
            </div>
        </motion.article>
    );
}