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
