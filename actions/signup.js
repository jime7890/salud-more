"use server";

import db from "@/lib/postgres";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

const saltRounds = 10;

export async function signup(formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    if (password !== confirmPassword) {
        return {
            error: "Passwords do not match"
        }
    }

    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if (result.rows.length > 0) {
            return {
                error: "Account already exists"
            }
        }

        const hash = await bcrypt.hash(password, saltRounds);
        await db.query("INSERT into users (email, password) VALUES ($1, $2)", [email, hash]);

    } catch (error) {

        return {
            error: "An error occurred during signup, please check back in a few minutes to see if the issue was resolved"
        }

    }

    redirect("/login");
}