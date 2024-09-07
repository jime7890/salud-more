import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import styles from "./page.module.css"

export default async function PressurePage() {
    const session = await auth();

    if (session === null) {
        redirect("/");
    }

    return (
        <div className={styles.container}>Test</div>
    );
}