"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { login } from "@/actions/login";

export default function LoginPage() {
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        try {
            await login(formData);
        } catch (error) {
            setErrorMessage("Incorrect email or password");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles['left-col']}>
                <h1>Log in to Saludmore</h1>
                <p>Enter the account details you used when registering.</p>
            </div>

            <div className={styles['right-col']}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h1 className={styles.title}>Welcome Back!</h1>

                    {errorMessage && <p className={styles.error}>{errorMessage}</p>}

                    <div className={styles['form-layout']}>
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Your Email" autoFocus required />
                    </div>

                    <div className={styles['form-layout']}>
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Your Password" required />
                    </div>

                    <button type="submit" className={styles.button}>Login</button>
                    <div className={styles.registered}>Need an account? <Link href="/signup" className={styles.action}>Click Here</Link></div>
                </form>
            </div>
        </div>
    );
}
