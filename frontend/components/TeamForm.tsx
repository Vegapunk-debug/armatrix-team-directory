"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { TeamMember, TeamMemberPayload } from "@/lib/api";

const emptyPayload: TeamMemberPayload = {
    name: "",
    role: "",
    bio: "",
    photo_url: "",
    linkedin_url: "",
    github_url: null,
    is_protected: false
};



export default function TeamForm({
    open,
    initialMember,
    onClose,
    onSubmit,
}: {
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

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>

                    <motion.div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        aria-hidden="true"
                    />

                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                        className="relative w-full max-w-2xl glass-strong p-8 shadow-card"
                        initial={{ scale: 0.95, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 10 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                        <div className="flex items-start justify-between gap-6">
                            <div>
                                <h2 id="modal-title" className="font-display text-xl font-bold tracking-hero text-white">
                                    {isEditing ? "Edit team member" : "New team member"}
                                </h2>
                                <p className="mt-1 font-nav text-xs font-light text-white/40">
                                    Keep profiles crisp and consistent with the Armatrix.
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                aria-label="Close form"
                                className="flex h-8 w-8 items-center justify-center border border-white/[0.08] text-white/40 transition hover:border-white/20 hover:text-white"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <form
                            className="mt-6 flex flex-col gap-4"
                            onSubmit={async (e) => {
                                e.preventDefault();
                                setSubmitting(true);
                                try {
                                    const finalPayload = { ...payload };
                                    if (!finalPayload.photo_url) {
                                        finalPayload.photo_url = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                            finalPayload.name
                                        )}&background=random&color=fff`;
                                    }

                                    await onSubmit(finalPayload);
                                    onClose();
                                } finally {
                                    setSubmitting(false);
                                }
                            }}
                        >
                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className="flex flex-col gap-1.5 font-nav text-[11px] font-light uppercase tracking-nav text-white/50">
                                    Full name
                                    <input
                                        value={payload.name ?? ""}
                                        onChange={(e) => handleChange("name", e.target.value)}
                                        required
                                        className="mt-1 w-full border border-white/[0.08] bg-white/[0.03] px-4 py-3 font-body text-sm font-normal normal-case tracking-normal text-white outline-none transition focus:border-ax-gold/40"
                                    />
                                </label>

                                <label className="flex flex-col gap-1.5 font-nav text-[11px] font-light uppercase tracking-nav text-white/50">
                                    Role / Title
                                    <input
                                        value={payload.role ?? ""}
                                        onChange={(e) => handleChange("role", e.target.value)}
                                        required
                                        className="mt-1 w-full border border-white/[0.08] bg-white/[0.03] px-4 py-3 font-body text-sm font-normal normal-case tracking-normal text-white outline-none transition focus:border-ax-gold/40"
                                    />
                                </label>

                                <label className="flex flex-col gap-1.5 font-nav text-[11px] font-light uppercase tracking-nav text-white/50 sm:col-span-2">
                                    Short bio
                                    <textarea
                                        value={payload.bio ?? ""}
                                        onChange={(e) => handleChange("bio", e.target.value)}
                                        required
                                        rows={3}
                                        className="mt-1 w-full border border-white/[0.08] bg-white/[0.03] px-4 py-3 font-body text-sm font-normal normal-case tracking-normal text-white outline-none transition focus:border-ax-gold/40"
                                    />
                                </label>

                                <label className="flex flex-col gap-1.5 font-nav text-[11px] font-light uppercase tracking-nav text-white/50">
                                    Photo URL (optional)
                                    <input
                                        value={payload.photo_url ?? ""}
                                        onChange={(e) => handleChange("photo_url", e.target.value)}
                                        className="mt-1 w-full border border-white/[0.08] bg-white/[0.03] px-4 py-3 font-body text-sm font-normal normal-case tracking-normal text-white outline-none transition focus:border-ax-gold/40"
                                    />
                                </label>

                                <label className="flex flex-col gap-1.5 font-nav text-[11px] font-light uppercase tracking-nav text-white/50">
                                    LinkedIn URL
                                    <input
                                        value={payload.linkedin_url ?? ""}
                                        onChange={(e) => handleChange("linkedin_url", e.target.value)}
                                        className="mt-1 w-full border border-white/[0.08] bg-white/[0.03] px-4 py-3 font-body text-sm font-normal normal-case tracking-normal text-white outline-none transition focus:border-ax-gold/40"
                                    />
                                </label>

                                <label className="flex flex-col gap-1.5 font-nav text-[11px] font-light uppercase tracking-nav text-white/50">
                                    GitHub URL (optional)
                                    <input
                                        value={payload.github_url ?? ""}
                                        onChange={(e) => handleChange("github_url", e.target.value)}
                                        className="mt-1 w-full border border-white/[0.08] bg-white/[0.03] px-4 py-3 font-body text-sm font-normal normal-case tracking-normal text-white outline-none transition focus:border-ax-gold/40"
                                    />
                                </label>
                            </div>

                            <div className="mt-8 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="border border-white/[0.08] px-5 py-2.5 font-nav text-[11px] font-light uppercase tracking-nav text-white/65 transition hover:border-white/20 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="bg-ax-btn px-5 py-2.5 font-nav text-[11px] font-medium uppercase tracking-nav text-black transition hover:bg-white disabled:opacity-50"
                                >
                                    {submitting ? "Saving…" : isEditing ? "Save changes" : "Add member"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}