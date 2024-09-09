"use server";

import db from "@/lib/postgres";

export async function addEntry(userId, userDate, formData) {
    const user = userId;

    const date = userDate;
    const time = formData.get("time");
    const systolic = formData.get("systolic");
    const diastolic = formData.get("diastolic");
    const pulse = formData.get("pulse");

    try {
        await db.query(
            "INSERT INTO pressure_readings (user_id, date, time, systolic, diastolic, pulse) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [user, date, time, systolic, diastolic, pulse]);
    } catch (error) {
        console.log(error);
    }
}

export async function deleteEntry(formData) {
    const entry_id = formData.get("entry_id");
    try {
        await db.query("DELETE FROM pressure_readings WHERE entry_id = $1", [entry_id])
    } catch (error) {
        console.log(error);
    }
}

export async function getEntriesForDate(currentUser, currentDate) {
    try {
        const response = await db.query("SELECT * FROM pressure_readings WHERE user_id = $1 AND date = $2", [currentUser, currentDate])
        return response.rows;
    } catch (error) {
        console.log("There was an error fetching the latest entries");
    }
}