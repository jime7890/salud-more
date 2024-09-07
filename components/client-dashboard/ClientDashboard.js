"use client";

import { useState } from "react";
import styles from "@/app/dashboard/page.module.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';

export default function ClientDashboard({ currentDate }) {
    const [selectedDay, setSelectedDay] = useState(new Date(currentDate));

    const handleDateChange = (days) => {
        setSelectedDay(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() + days);
            return newDate;
        });
    };

    function resetDate() {
        setSelectedDay(new Date(currentDate));
    }

    const formattedDate = selectedDay.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                <div className={styles['left-col']}>
                    <div className={styles.card}>
                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar className={styles.calendar} value={dayjs(selectedDay)} />
                        </LocalizationProvider> */}
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
                                    {formattedDate}
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

                        <div className={styles['filter-card']}>
                            <div>9:40 AM</div>
                            <div>130</div>
                            <div>135</div>
                            <div>80</div>
                            <div>Notes</div>
                        </div>

                        <div className={styles['filter-card']}>
                            <div>10:30 AM</div>
                            <div>125</div>
                            <div>125</div>
                            <div>85</div>
                            <div>Notes</div>
                        </div>

                        <div className={styles['add-container']}>
                            <button className={styles.add}>
                                Add Tracker
                            </button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}