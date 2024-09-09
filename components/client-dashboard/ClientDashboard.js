"use client";

import dayjs from 'dayjs';

import { useState, useEffect } from "react";
import { addEntry, deleteEntry, getEntriesForDate } from "@/actions/entries";

import Calendar from "../calendar/Calendar";
import DateHeader from "../date-header/DateHeader";
import Entries from '../entry-list/EntryList';
import PendingEntries from '../pending-entry/PendingEntryForm';

import styles from "@/app/dashboard/page.module.css";
import shared from "../shared.module.css";

export default function ClientDashboard({ currentUser }) {
    // Gets Current Day
    const now = dayjs();

    // Default States
    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDay, setSelectedDay] = useState(now);
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        setIsLoading(true);

        const fetchEntries = async () => {
            try {
                const entries = await getEntriesForDate(currentUser, selectedDay.format('YYYY-MM-DD'));
                setEntries(entries);
            } catch (error) {
                console.error("Failed to fetch entries:", error);
            } finally {
                setIsLoading(false);
                setIsClient(true);
            }
        };

        if (selectedDay) {
            fetchEntries();
        }


    }, [currentUser, selectedDay]);


    // Client Action
    function handleDateChange(day) {
        setSelectedDay((prevState) => {
            if (day === -1) {
                const newDate = prevState.subtract(1, 'day')
                return newDate;
            }

            if (day === 1) {
                const newDate = prevState.add(1, 'day')
                return newDate;
            }

            return prevState;
        });
    }

    // Server Action
    const saveData = async (formData) => {
        await addEntry(currentUser, selectedDay.format('YYYY-MM-DD'), formData);
        const latestEntries = await getEntriesForDate(currentUser, selectedDay.format('YYYY-MM-DD'));
        setEntries(latestEntries);
    }

    // Server Action
    const handleDelete = async (formData) => {
        await deleteEntry(formData);
        const latestEntries = await getEntriesForDate(currentUser, selectedDay.format('YYYY-MM-DD'));
        setEntries(latestEntries);
    }

    // Client Action
    const [pendingEntry, setPendingEntry] = useState([]);
    const addPendingEntry = () => {
        const newEntry = {
            id: Date.now(),
            time: 'Time',
            systolic: '0',
            diastolic: '0',
            pulse: '0',
            notes: 'Notes'
        }
        setPendingEntry([...pendingEntry, newEntry])
    }

    // Client Action
    const handleEditClick = (id) => {
        console.log("Edit item", id);
    };

    // Client Action
    const handleUndo = (event, id) => {
        event.preventDefault();
        setPendingEntry(pendingEntry.filter((prevState) =>
            prevState.id !== id
        ))
    }

    // Client Action
    function resetDate() {
        setSelectedDay(now);
    }

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                <div className={styles['left-col']}>
                    {!isLoading && <>
                        <Calendar
                            isClient={isClient}
                            value={selectedDay}
                            onChange={(newValue) => setSelectedDay(newValue)}
                        />
                    </>}

                </div>

                <div className={styles['right-col']}>
                    <DateHeader
                        selectedDay={selectedDay}
                        resetDate={resetDate}
                        goForwardADay={() => handleDateChange(1)}
                        goBackADay={() => handleDateChange(-1)}
                        onChange={(newValue) => setSelectedDay(newValue)}
                    />

                    <div className={styles.card}>
                        <div className={shared['filter-card']}>
                            <div>Time</div>
                            <div>Systolic</div>
                            <div>Diastolic</div>
                            <div>Pulse</div>
                            <div>Actions</div>
                        </div>


                        {!isLoading &&
                            <>
                                <Entries
                                    data={entries}
                                    handleDelete={handleDelete}
                                    handleEditClick={handleEditClick}
                                />

                                <PendingEntries
                                    data={pendingEntry}
                                    insertEntry={saveData}
                                    addPendingEntry={addPendingEntry}
                                    handleUndo={handleUndo}
                                    currentTime={now.format('HH:mm')}
                                />
                            </>}

                    </div>
                </div>
            </div>
        </div>
    );
}