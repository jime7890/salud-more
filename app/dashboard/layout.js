import Link from "next/link";
import styles from "@/app/dashboard/page.module.css";

export default function DashboardLayout({ children }) {
    return (
        <main>
            <div className={styles.div}>
                <div className={styles.tabs}>
                    <Link href="/dashboard">Track Glucose</Link>
                    <Link href="/dashboard/pressure">Track Blood Pressure</Link>
                </div>
            </div>
            {children}
        </main>
    );
}
