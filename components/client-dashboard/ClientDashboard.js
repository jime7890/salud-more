"use client";

import { useState, useEffect } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

import styles from "@/app/dashboard/page.module.css";
import { ChevronLeft, ChevronRight, CircleCheck, Pencil, Trash2, Undo2 } from "lucide-react";
import { addEntry } from "@/actions/entries";

export default function ClientDashboard() {
    const now = dayjs();
    const [selectedDay, setSelectedDay] = useState(now);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

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
        setSelectedDay(now);
    }

    let glucoseList = [
        {
            id: 1,
            time: "9:40 AM",
            systolic: "130",
            diastolic: "135",
            pulse: "80",
            notes: "Notes"
        },
        {
            id: 2,
            time: "9:40 AM",
            systolic: "125",
            diastolic: "130",
            pulse: "85",
            notes: "Notes"
        }
    ]

    const [entries, setEntries] = useState(glucoseList);

    const [pendingEntry, setPendingEntry] = useState([]);

    const addNewEntry = () => {
        const newEntry = {
            id: Date.now(),
            time: 'Time',
            systolic: '0',
            diastolic: '0',
            pulse: '0',
            notes: 'Notes'
        }
        setPendingEntry([...pendingEntry, newEntry])
        console.log(pendingEntry);
    }

    const handleEditClick = (id) => {
        console.log("Edit item", id);
    };

    const handleDelete = (id) => {
        console.log("Delete item", id)
    }

    const handleUndo = (id) => {
        setPendingEntry(pendingEntry.filter((prevState) =>
            prevState.id !== id
        ))
}

return (
    <div className={styles.container}>
        <div className={styles.grid}>
            <div className={styles['left-col']}>
                <div className={styles['calendar-container']}>

                    {isClient && (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar className={styles.calendar} value={selectedDay} onChange={(newValue) => setSelectedDay(newValue)} />
                        </LocalizationProvider>
                    )}

                </div>
            </div>

            <div className={styles['right-col']}>
                <div className={styles['date-header']}>

                    <div className={styles['date-flex']}>
                        <div className={styles['date-styling']}>
                            <button className={styles['button']} onClick={() => handleDateChange(-1)}>
                                <ChevronLeft />
                            </button>

                            <div className={styles.date}>
                                {selectedDay.format('dddd, MMM D')}
                            </div>

                            <button className={styles['button']} onClick={() => handleDateChange(1)}>
                                <ChevronRight />
                            </button>
                        </div>

                        <button className={`${styles['date-styling']} ${styles['reset-button']}`} onClick={resetDate}>
                            Reset
                        </button>
                    </div>

                    <div className={styles['date-styling']}>
                        Cesar Jimenez
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles['filter-card']}>
                        <div>Time</div>
                        <div>Systolic</div>
                        <div>Diastolic</div>
                        <div>Pulse</div>
                        <div>Actions</div>
                    </div>

                    {/* Data fetched from the server to be displayed*/}
                    {entries.map((tracker) => {
                        return (
                            <div key={tracker.id} className={styles['filter-card']}>
                                <div>{tracker.time}</div>
                                <div>{tracker.systolic}</div>
                                <div>{tracker.diastolic}</div>
                                <div>{tracker.pulse}</div>
                                <div className={styles.action}>
                                    <button className={styles.button} onClick={() => handleEditClick(tracker.id)}><Pencil /></button>
                                    <button className={styles.button} onClick={() => handleDelete(tracker.id)}><Trash2 /></button>
                                </div>
                            </div>
                        )
                    })}

                    {/* Data that is waiting to be submitted */}
                    {pendingEntry.map((entry) => {
                        return (
                            <div key={entry.id} className={styles['filter-card']}>
                                <div contentEditable suppressContentEditableWarning={true} autoFocus>0</div>
                                <div contentEditable suppressContentEditableWarning={true}>0</div>
                                <div contentEditable suppressContentEditableWarning={true}>0</div>
                                <div contentEditable suppressContentEditableWarning={true}>0</div>
                                <div className={styles.action}>
                                    <button className={styles.button} style={{ color: "green" }}><CircleCheck /></button>
                                    <button className={styles.button} onClick={() => handleUndo(entry.id)}><Undo2 /></button>
                                </div>
                            </div>
                        )
                    })}


                    <div className={styles['add-container']}>
                        <button className={styles.add} onClick={addNewEntry}>
                            Add Tracker
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
);
}