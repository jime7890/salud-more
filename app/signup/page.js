/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"
import styles from "./page.module.css"
import submitForm from "@/actions/submitForm"

export default function SignupPage() {
    return (
        <div className={styles.container}>
            <div className={styles['left-col']}>
                <h1>Create an account</h1>
                <p>We'll need your name, email address, and a unique password. You'll use this login to access Saludmore next time.</p>
            </div>

            <div className={styles['right-col']}>
                <form className={styles.form} action={submitForm}>
                    <h1 className={styles.title}>Register an Account</h1>

                    <div className={styles['form-layout']}>
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Your Email" autoFocus required></input>
                    </div>

                    <div className={styles['form-layout']}>
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Your Password" required ></input>
                    </div>

                    <div className={styles['form-layout']}>
                        <label>Confirm Password</label>
                        <input type="password" name="confirm-password" placeholder="Confirm Password" required></input>
                    </div>

                    <button type="submit" className={styles.button}>Register</button>
                    <div className={styles.registered}>Already have an account? <Link href="/login" className={styles.action}>Click Here</Link></div>
                </form>
            </div>
        </div>
    )
}