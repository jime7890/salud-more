import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import styles from "./page.module.css"

export default async function DashboardPage() {
    const session = await auth();

    if (session === null){
        redirect("/");
    }

    return (
        <div>
            This is the dashboard page :D
        </div>
    )
}