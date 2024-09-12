"use client";

import { useSession } from "next-auth/react"

import PressureDashboard from "@/components/pressure-dashboard/PressureDashboard";

export default function DashboardPage() {
    const { data: session, status } = useSession()

    return (
        <PressureDashboard currentUser={session.user.id} />
    )
}