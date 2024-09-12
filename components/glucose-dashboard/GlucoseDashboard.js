"use client";

import dayjs from 'dayjs';

import Calendar from "../calendar/Calendar";
import DateHeader from "../date-header/DateHeader";
import Entries from '../entry-list/EntryList';
import PendingEntries from '../pending-entry/PendingEntryForm';

import styles from "@/app/dashboard/page.module.css";
import shared from "../shared.module.css";
import { useEffect, useState } from 'react';

export default function GlucoseDashboard() {
    const [isClient, setIsClient] = useState(false);
    const [selectedDay, setSelectedDay] = useState(dayjs());

    useEffect(() => {
        setIsClient(true);
    }, [])

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
                Test
            </div>
        </div>
    )
}