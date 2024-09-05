"use server";

import { redirect } from "next/navigation";

export async function login(formData){
    const email = formData.get("email");
    const password = formData.get("password");

    console.log("Attempting to login");
    console.log(email, password);

    redirect("/dashboard");
}