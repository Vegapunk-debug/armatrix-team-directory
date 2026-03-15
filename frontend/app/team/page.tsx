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
