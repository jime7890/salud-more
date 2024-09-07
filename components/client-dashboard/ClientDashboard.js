"use client";

import { useState } from "react";
import styles from "@/app/dashboard/page.module.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';

export default function ClientDashboard() {
    const now = dayjs();
    const [selectedDay, setSelectedDay] = useState(now);

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

    const addNewEntry = () => {
        const newEntry = {
            id: entries.length + 1,
            time: 'Time',
            systolic: '0',
            diastolic: '0',
            pulse: '0',
            notes: 'Notes'
        }
        setEntries([...entries, newEntry])
    }

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                <div className={styles['left-col']}>
                    <div className={styles.card}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar className={styles.calendar} value={dayjs(selectedDay)} onChange={(newValue) => setSelectedDay(newValue)}/>
                        </LocalizationProvider>
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
                            <div>Notes</div>
                        </div>

                        {entries.map((tracker) => {
                            return (
                                <div key={tracker.id} className={styles['filter-card']}>
                                    <div contentEditable suppressContentEditableWarning={true}>{tracker.time}</div>
                                    <div contentEditable suppressContentEditableWarning={true}>{tracker.systolic}</div>
                                    <div contentEditable suppressContentEditableWarning={true}>{tracker.diastolic}</div>
                                    <div contentEditable suppressContentEditableWarning={true}>{tracker.pulse}</div>
                                    <div contentEditable suppressContentEditableWarning={true}>{tracker.notes}</div>
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