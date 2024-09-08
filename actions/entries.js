"use server";

import db from "@/lib/postgres";
import { revalidatePath } from "next/cache";

export async function addEntry(currentUser, userDate, formData) {
    const user = currentUser;
    
    const date = userDate;
    const time = formData.get("time");
    const systolic = formData.get("systolic");
    const diastolic = formData.get("diastolic");
    const pulse = formData.get("pulse");

    console.log(user, date, time, systolic, diastolic, pulse);

    // revalidatePath("/dashboard");

    // const result = await db.query("SELECT * FROM users");
}