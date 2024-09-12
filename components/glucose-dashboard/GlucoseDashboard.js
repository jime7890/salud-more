"use client";

import dayjs from 'dayjs';

import Calendar from "../calendar/Calendar";
import DateHeader from "../date-header/DateHeader";
import Entries from '../entry-list/EntryList';
import PendingEntries from '../pending-entry/PendingEntryForm';

import styles from "@/app/dashboard/page.module.css";
import shared from "../shared.module.css";
import { useEffect, useState } from 'react';
import test from "../pending-entry/PendingEntryForm.module.css"
import { CircleCheck, Undo2 } from 'lucide-react';

export default function GlucoseDashboard() {
    const [isClient, setIsClient] = useState(false);
    const [selectedDay, setSelectedDay] = useState(dayjs());

    useEffect(() => {
        setIsClient(true);
    }, [])

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

    function resetDate() {
        setSelectedDay(dayjs());
    }

    const [pendingEntry, setPendingEntry] = useState([]);
    const addPendingEntry = () => {
        const newEntry = {
            id: Date.now(),
            time: 'Time',
            glucose: '0',
            period: '',
            notes: 'Notes'
        }
        setPendingEntry([...pendingEntry, newEntry])
    }


    const saveData = async (formData) => {
        await addEntryMutation.mutateAsync(formData);
    };

    return (
        <div className={styles.container}>
            <div className={styles['left-col']}>
                <Calendar
                    isClient={isClient}
                    value={selectedDay}
                    onChange={(newValue) => setSelectedDay(newValue)}
                />
            </div>

            <div className={styles['right-col']}>
                <DateHeader
                    selectedDay={selectedDay}
                    resetDate={resetDate}
                    goForwardADay={() => handleDateChange(1)}
                    goBackADay={() => handleDateChange(-1)}
                />

                <div className={shared.card}>
                    <div className={`${shared['filter-card']} ${shared['desktop-card']}`}>
                        <div>Time</div>

                        <div className={shared.flex}>
                            <div className={shared.title}>Glucose</div>
                            <div className={shared.subtitle}>mg/dL</div>
                        </div>

                        <div className={shared.flex}>
                            <div className={shared.title}>Period</div>
                            <div className={shared.subtitle}>When</div>
                        </div>

                        <div>Notes</div>

                        <div>Actions</div>
                    </div>

                    {pendingEntry.map((entry) => {
                        return (
                            <form action={saveData} key={entry.id} className={shared['filter-card']}>
                                <input type="time" name="time" defaultValue={selectedDay.format('HH:mm')}></input>
                                <input type="number" name="systolic"></input>
                                <select>
                                    <option>Breakfast</option>
                                </select>
                                <input />
                                <div>
                                    <button className={shared.button} type="submit" style={{ color: "green" }}><CircleCheck /></button>
                                    <button className={shared.button} onClick={(event) => props.handleUndo(event, entry.id)}><Undo2 /></button>
                                </div>
                            </form>
                        )
                    })}

                    <div className={test['add-container']}>
                        <button className={test.add} onClick={addPendingEntry}>
                            Add Tracker
                        </button>
                    </div>
                </div>



            </div>
        </div>
    )
}