"use client";

import { useState } from "react";
import styles from "@/app/dashboard/page.module.css";

export default function ClientDashboard({ currentDay }) {
    const [selectedDay, setSelectedDay] = useState(currentDay);

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const handleDateChange = (index) => {
        setSelectedDay(index);
      };
    

    return (
        <div className={styles.container}>
            <div className={styles.patient}>Yolanda Medina</div>
            <div className={styles.grid}>
                <div className={styles['left-col']}>
                    <div className={styles.card}>
                        Left Side
                    </div>
                </div>

                <div className={styles['right-col']}>
                    <div className={styles['card']}>
                        {daysOfWeek.map((day, index) => (
                            <button
                                key={day}
                                className={index === selectedDay ? styles.active : ''}
                                onClick={() => handleDateChange(index)}
                            >
                                {day}
                            </button>
                        ))}
                    </div>

                    <div className={styles['card']}>
                      Data for the specific day
                    </div>
                </div>





            </div>
        </div>
    );
}
