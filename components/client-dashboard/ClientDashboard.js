"use client";

import { useState } from "react";
import styles from "@/app/dashboard/page.module.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ClientDashboard({ currentDay }) {
    const [selectedDay, setSelectedDay] = useState(currentDay);

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const handleDateChange = (index) => {
        setSelectedDay(index);
    };


    return (
        <div className={styles.container}>
            <div className={styles.grid}>

                <div className={styles['left-col']}>
                    <div>
                        Test
                    </div>

                    <div className={styles.card}>
                        Left Side
                    </div>
                </div>

                <div className={styles['right-col']}>
                    <div className={styles['date-header']}>
                        <div className={styles['date-styling']}>
                            <button className={styles['button']}><ChevronLeft /></button>
                            Friday 6 September
                            <button className={styles['button']}><ChevronRight /></button>
                        </div>

                        <div className={styles['date-styling']}>
                            Cesar Jimenez
                        </div>
                    </div>

                    <div className={`${styles.card} ${styles['filter-card']}`}>
                        Test
                    </div>
                </div>

            </div>
        </div>
    );
}
