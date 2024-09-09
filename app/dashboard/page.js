"use client";

import { useSession } from "next-auth/react"

import ClientDashboard from "@/components/client-dashboard/ClientDashboard";

export default function DashboardPage() {
    const { data: session, status } = useSession()

    return (
        <ClientDashboard currentUser={session.user.id} />
    )
}