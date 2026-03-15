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
