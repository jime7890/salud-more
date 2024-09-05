"use server";

import { signIn } from "@/lib/auth";

export async function login(formData){
    await signIn("credentials", {
        redirectTo: "/dashboard",
        email: formData.get("email"),
        password: formData.get("password")
    });
}