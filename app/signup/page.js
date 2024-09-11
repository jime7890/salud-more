"use client";

/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"
import styles from "../form-shared.module.css"
import { signup } from "@/actions/signup";

import { useFormState } from "react-dom";
import { CircleAlert, Mail } from "lucide-react";

const initialState = {
    message: '',
}

export default function SignupPage() {
    const [state, formAction] = useFormState(signup, initialState)

    return (
        <div className={styles.container}>
            <div className={styles['left-col']}>
                <h1>Create an account</h1>
                <p>We'll need an email address and a unique password. You'll use this login to access Saludmore next time.</p>
            </div>

            <div className={styles['right-col']}>
                <form className={styles.form} action={formAction}>
                    <h1 className={styles.title}>Register an Account</h1>

                    {state?.message.length > 0 && <> <p className={styles.error}> <CircleAlert className={styles.icon} /> {state?.message}</p></>}

                    <div className={styles['form-layout']}>
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Your Email" autoFocus required></input>
                        <Mail className={styles.suffix} />
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