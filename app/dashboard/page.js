import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ClientDashboard from "@/components/client-dashboard/ClientDashboard";

export default async function DashboardPage() {
    const session = await auth();

    if (session === null) {
        redirect("/");
    }

    return (
        <ClientDashboard />
    )
}