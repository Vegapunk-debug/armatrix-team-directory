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
        <motion.article>
            <div>TeamCard</div>
        </motion.article>
    );
}