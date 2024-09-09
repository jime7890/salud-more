"use client";

import { useSession } from "next-auth/react"

import GlucoseDashboard from "@/components/glucose-dashboard/GlucoseDashboard";

export default function GlucosePage() {
    const { data: session, status } = useSession()

    return (
        <GlucoseDashboard />
    )
}