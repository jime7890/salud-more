"use server";

import GlucoseDashboard from "@/components/glucose-dashboard/GlucoseDashboard";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function GlucosePage() {
    const session = await auth();

    if (session === null) {
        redirect("/");
    }

    return (
        <GlucoseDashboard />
    )
}