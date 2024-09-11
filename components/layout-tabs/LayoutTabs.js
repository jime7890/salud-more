"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";
import styles from "@/app/dashboard/page.module.css";

export default function Tabs() {
    const pathname = usePathname();

    return (
        <div className={styles['tab-styling']}>
            <div className={styles['tab-container']}>
                <Link href="/dashboard" className={pathname === '/dashboard' ? styles.active : styles.inactive}>Track Pressure</Link>
                <Link href="/dashboard/glucose" className={pathname === '/dashboard/glucose' ? styles.active : styles.inactive}>Track Glucose</Link>
            </div>
        </div>
    )
}