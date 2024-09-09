"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import PressureDashboard from "@/components/pressure-dashboard/PressureDashboard";

export default async function PressurePage() {
    const session = await auth();

    if (session === null) {
        redirect("/");
    }

    return (
        <PressureDashboard />
    )
}