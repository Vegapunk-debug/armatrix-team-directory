"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamCard from "@/components/TeamCard";
import TeamForm, { TeamMemberPayload } from "@/components/TeamForm";
import { createMember, deleteMember, fetchTeam, updateMember, TeamMember } from "@/lib/api";

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12
        }
    }
};

export default function TeamPage() {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

    const emptyState = useMemo(
        () => !loading && team.length === 0,
        [loading, team.length]
    );

    useEffect(() => {
        let active = true;
        fetchTeam()
            .then((data) => active && setTeam(data))
            .catch((err) => active && setError(err.message ?? "Unable to load team"))
            .finally(() => active && setLoading(false));

        return () => {
            active = false;
        }
    }, []);

    const openCreateModal = () => {
        setEditingMember(null);
        setModalOpen(true);
    };

    const openEditModal = (member: TeamMember) => {
        setEditingMember(member);
        setModalOpen(true);
    };

    const handleSubmit = async (payload: TeamMemberPayload) => {
        if (editingMember) {
            const updated = await updateMember(editingMember.id, payload);
            setTeam((prev) =>
                prev.map((item) => (item.id === updated.id ? updated : item))
            );
            return
        }
        const created = await createMember(payload);
        setTeam((prev) => [created, ...prev]);
    };

    const handleDelete = async (member: TeamMember) => {
        const confirmed = window.confirm(`Remove ${member.name} from the roster?`);
        if (!confirmed) return;
        await deleteMember(member.id);
        setTeam((prev) => prev.filter((item) => item.id !== member.id));
    };

    return (
        <>
            <Navbar />
            <main className="relative min-h-screen overflow-hidden bg-ax-black">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-0 top-0 h-[500px] w-[700px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-white/[0.02] blur-[140px]" />
                </div>

                <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-48 md:px-10">
                    <motion.header
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                        <div>
                            <h1
                                className="font-display text-4xl lowercase text-white sm:text-5xl lg:text-7xl"
                                style={{ letterSpacing: "1.14px" }}>
                                <span className="font-light">our </span>
                                <span className="font-bold">team</span>
                            </h1>
                            <p className="mt-4 max-w-lg font-body text-base font-light leading-relaxed text-white/65">
                                Engineers, designers, and operators building the next generation
                                of hyper-redundant robotics for critical infrastructure.
                            </p>
                        </div>
                        <button
                            onClick={openCreateModal}
                            className="group inline-flex items-center gap-2 bg-ax-btn px-6 py-3 font-nav text-xs font-medium uppercase text-black transition hover:bg-white"
                            style={{ letterSpacing: "2.112px" }}>
                            <Plus
                                size={14}
                                className="transition-transform group-hover:rotate-90" />
                            Add member
                        </button>
                    </motion.header>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mt-10 flex flex-wrap items-center gap-3"
                    >
                        <span className="border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 font-nav text-[10px] font-light uppercase text-white/40" style={{ letterSpacing: "2.112px" }}>
                            {team.length} profiles
                        </span>
                        <span className="border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 font-nav text-[10px] font-light uppercase text-white/40" style={{ letterSpacing: "2.112px" }}>
                            Armatrix-Robotics
                        </span>
                        <span className="inline-flex items-center gap-1.5 border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 font-nav text-[10px] font-light uppercase text-white/40" style={{ letterSpacing: "2.112px" }}>
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-glow-pulse" />
                            Live
                        </span>
                    </motion.div>

                    <section className="mt-12">
                        {loading && (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-80 shimmer border border-white/[0.04]"
                                    />
                                ))}
                            </div>
                        )}

                        {error && (
                            <div className="border border-red-500/20 bg-red-500/5 px-6 py-12 text-center font-body text-sm text-red-300">
                                {error}
                            </div>
                        )}

                        {emptyState && (
                            <div className="border border-white/[0.06] bg-ax-surface px-6 py-16 text-center">
                                <Users size={32} className="mx-auto mb-4 text-white/20" />
                                <p className="font-body text-sm text-white/40">
                                    No team members yet. Add the first profile to begin.
                                </p>
                            </div>
                        )}

                        {!loading && !error && team.length > 0 && (
                            <motion.div
                                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {team.map((member) => (
                                    <TeamCard
                                        key={member.id}
                                        member={member}
                                        onEdit={openEditModal}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </section>
                </div>
            </main>
            <Footer />

            <TeamForm
                open={modalOpen}
                initialMember={editingMember}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
            />
        </>
    );
}
