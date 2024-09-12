"use server";

import db from "@/lib/postgres";

export async function addEntry(userId, userDate, formData) {
    const user = userId;

    const date = userDate;
    const time = formData.get("time");
    const glucose = formData.get("glucose");
    const period = formData.get("period");
    const notes = formData.get("notes");

    try {
        await db.query(
            "INSERT INTO glucose_readings (user_id, date, time, glucose, period) VALUES ($1, $2, $3, $4, $5)",
            [user, date, time, glucose, period]);
    } catch (error) {
        console.log(error);
    }
}

export async function deleteEntry(formData) {
    const entry_id = formData.get("entry_id");
    try {
        await db.query("DELETE FROM glucose_readings WHERE entry_id = $1", [entry_id])
    } catch (error) {
        console.log(error);
    }
}

export async function getEntriesForDate(currentUser, currentDate) {
    try {
        const response = await db.query("SELECT * FROM glucose_readings WHERE user_id = $1 AND date = $2 ORDER BY time", [currentUser, currentDate])
        return response.rows;
    } catch (error) {
        console.log("There was an error fetching the latest entries");
    }
}