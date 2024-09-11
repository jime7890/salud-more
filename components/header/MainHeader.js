import Link from "next/link"
import styles from "./MainHeader.module.css"
import { auth } from "@/lib/auth"
import signout from "@/actions/signout";

export default async function MainHeader() {
    const session = await auth();

    return (
        <nav className={styles.header}>
            <div className={styles.content}>
                <div>
                    <Link href="/" className={styles.logo}>Saludmore</Link>
                </div>

                {session !== null ?
                    <form action={signout} className={styles.link}>
                        <Link href="/dashboard">
                            Dashboard
                        </Link>

                        <button type="submit" className={styles.logout}>
                            Log out
                        </button>
                    </form>
                    :
                    <div className={styles.link}>
                        <Link href="/login">
                            Login
                        </Link>

                        <Link href="/signup">
                            Signup
                        </Link>
                    </div>
                }
            </div>
        </nav>
    )
}