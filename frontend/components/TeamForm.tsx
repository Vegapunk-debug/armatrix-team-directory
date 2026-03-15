"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { TeamMember } from "@/lib/api";

export type TeamMemberPayload = Omit<TeamMember, "id">;

const emptyPayload: TeamMemberPayload = {
    name: "",
    role: "",
    bio: "",
    photo_url: "",
    linkedin_url: "",
    github_url: null,
};

const fieldMeta: {
    key: keyof TeamMemberPayload;
    label: string;
    required: boolean;
    multiline?: boolean;
}[] = [
        { key: "name", label: "Full name", required: true },
        { key: "role", label: "Role / Title", required: true },
        { key: "bio", label: "Short bio", required: true, multiline: true },
        { key: "photo_url", label: "Photo URL (optional)", required: false },
        { key: "linkedin_url", label: "LinkedIn URL", required: true },
        { key: "github_url", label: "GitHub URL (optional)", required: false },
    ];

export default function TeamForm({
    open,
    initialMember,
    onClose,
    onSubmit,
} : {
    open: boolean;
    initialMember: TeamMember | null;
    onClose: () => void;
    onSubmit: (payload: TeamMemberPayload) => Promise<void>;
}) {
    const [payload, setPayload] = useState<TeamMemberPayload>(emptyPayload);
    const [submitting, setSubmitting] = useState(false);
    const isEditing = Boolean(initialMember);

    useEffect(() => {
        if (initialMember) {
            const { id, ...rest } = initialMember;
            setPayload(rest);
        } else {
            setPayload(emptyPayload);
        }
    }, [initialMember, open]);

    const handleChange = (key: keyof TeamMemberPayload, value: string) => {
        setPayload((prev) => ({ ...prev, [key]: value || null }));
    };
    