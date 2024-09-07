"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";
import styles from "@/app/dashboard/page.module.css";

export default function Tab() {
    const pathname = usePathname();

    return (
        <div className={styles.div}>
            <div className={styles['tab-container']}>
                <Link href="/dashboard" className={pathname === '/dashboard' ? styles.active : styles.inactive}>Track Glucose</Link>
                <Link href="/dashboard/pressure" className={pathname === '/dashboard/pressure' ? styles.active : styles.inactive}>Track Blood Pressure</Link>
            </div>
        </div>
    )
}