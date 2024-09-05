/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"
import styles from "./page.module.css"
import { login } from "@/actions/login"

export default function LoginPage() {
    return (
        <div className={styles.container}>
            <div className={styles['left-col']}>
                <h1>Log in to Saludmore</h1>
                <p>Enter the account details you used when registering.</p>
            </div>

            <div className={styles['right-col']}>
                <form className={styles.form} action={login}>
                    <h1 className={styles.title}>Welcome Back!</h1>

                    <div className={styles['form-layout']}>
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Your Email" autoFocus required></input>
                    </div>

                    <div className={styles['form-layout']}>
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Your Password" required ></input>
                    </div>

                    <button type="submit" className={styles.button}>Login</button>
                    <div className={styles.registered}>Need an account? <Link href="/signup" className={styles.action}>Click Here</Link></div>
                </form>
            </div>
        </div>
    )
}