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


    const isProtected = member.is_protected;

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
                        background: isHovered ? `radial-gradient(600px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(212, 255, 0, 0.15), rgba(212, 255, 0, 0.05) 40%, transparent 70%)` : "none"
                    }} />

                <div
                    className="absolute inset-0 z-10 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
                    style={{
                        background: isHovered
                            ? `radial-gradient(350px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(212, 255, 0, 0.07), transparent 60%)`
                            : "none"
                    }} />

                <div className="relative rounded-xl border border-white/[0.08] bg-ax-surface m-[1px] overflow-hidden transition-all duration-500 group-hover:border-white/[0.15] group-hover:shadow-glow">
                    <div className="relative h-56 w-full overflow-hidden sm:h-64">

                        <motion.img
                            src={member.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&color=fff`}
                            alt={member.name}
                            className="h-full w-full object-cover"
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            whileHover={{ scale: 1.05 }} />

                        <div className="absolute inset-0 bg-gradient-to-t from-ax-surface via-ax-surface/40 to-transparent" />

                        <div className="absolute right-3 top-3 z-20 flex gap-2 opacity-0 transition-all duration-300 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">

                            <button
                                onClick={() => onEdit(member)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 backdrop-blur-md transition-all duration-200 hover:bg-white/20 hover:scale-110"
                                aria-label="Edit member">
                                <Pencil size={14} className="text-white" />
                            </button>

                            {!isProtected && (
                                <button
                                    onClick={() => onDelete(member)}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 backdrop-blur-md transition-all duration-200 hover:bg-red-500/30 hover:scale-110"
                                    aria-label="Delete member"
                                >
                                    <Trash2 size={14} className="text-white" />
                                </button>
                            )}

                        </div>
                    </div>
                    <div className="flex flex-col gap-3 p-5 pt-4">
                        <div>
                            <motion.h3
                                className="font-display text-lg font-bold tracking-hero text-white"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                viewport={{ once: true }}>
                                {member.name}
                            </motion.h3>
                            <motion.p
                                className="mt-0.5 font-nav text-[11px] font-light uppercase tracking-nav text-gradient"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                                viewport={{ once: true }}>
                                {member.role}
                            </motion.p>
                        </div>

                        <motion.p
                            className="font-body text-sm font-normal leading-relaxed text-white/55 line-clamp-3"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}>
                            {member.bio}
                        </motion.p>

                        <motion.div
                            className="mt-1 flex items-center gap-2"
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                            viewport={{ once: true }}>
                            <a
                                href={member.linkedin_url || "#"}
                                target="_blank"
                                rel="noreferrer"
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] text-white/40 transition-all duration-300 hover:border-[#D4FF00]/40 hover:text-[#D4FF00] hover:bg-[#D4FF00]/[0.05] hover:-translate-y-0.5"
                                aria-label="LinkedIn">
                                <Linkedin size={14} />
                            </a>
                            {member.github_url && (
                                <a
                                    href={member.github_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] text-white/40 transition-all duration-300 hover:border-[#D4FF00]/40 hover:text-[#D4FF00] hover:bg-[#D4FF00]/[0.05] hover:-translate-y-0.5"
                                    aria-label="GitHub">
                                    <Github size={14} />
                                </a>
                            )}
                        </motion.div>
                    </div>

                </div>
            </div>
        </motion.article>
    );
}