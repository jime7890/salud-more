"use server";

import db from "@/lib/postgres";

export async function addEntry() {
    const result = await db.query("SELECT * FROM users");
}