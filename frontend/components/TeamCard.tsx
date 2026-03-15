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
        scale: 1
    }
