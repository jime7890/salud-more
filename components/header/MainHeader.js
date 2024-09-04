import Link from "next/link"
import styles from "./MainHeader.module.css"

export default function MainHeader() {
    return (
        <nav className={styles.header}>
            <div className={styles.content}>
                <div className={styles.logo}>
                    <Link href="/">Saludmore</Link>
                </div>

                <div className={styles.link}>
                    <Link href="/login">Login</Link>
                    <Link href="/signup">Signup</Link>
                </div>
            </div>
        </nav>
    )
}