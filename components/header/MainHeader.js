import Link from "next/link"
import styles from "./MainHeader.module.css"
import { auth } from "@/lib/auth"
import signout from "@/actions/signout";

export default async function MainHeader() {
    const session = await auth();

    return (
        <nav className={styles.header}>
            <div className={styles.content}>
                <div className={styles.logo}>
                    <Link href="/">Saludmore</Link>
                </div>

                {session !== null ?
                    <form action={signout} className={styles.link}>
                        <button type="submit" className={styles.logout}>
                            <span>Log out</span>
                        </button>
                    </form>
                    :
                    <div className={styles.link}>
                        <Link href="/login">
                            <span>Login</span>
                        </Link>

                        <Link href="/signup">
                            <span>Signup</span>
                        </Link>
                    </div>
                }
            </div>
        </nav>
    )
}