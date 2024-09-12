"use client";

import dayjs from 'dayjs';

import { useState, useEffect } from "react";
import { addEntry, deleteEntry, getEntriesForDate } from "@/actions/glucose";
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import Calendar from "../calendar/Calendar";
import DateHeader from "../date-header/DateHeader";

import styles from "@/app/dashboard/page.module.css";
import shared from "../shared.module.css";

import { CircleCheck, Pencil, Trash2, Undo2 } from 'lucide-react';

export default function GlucoseDashboard({ currentUser }) {
    // Default States
    const [selectedDay, setSelectedDay] = useState(dayjs());
    const [isClient, setIsClient] = useState(false);
    const queryClient = useQueryClient();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const { data: entries = [] } = useQuery({
        queryKey: ['glucose', currentUser, selectedDay.format('YYYY-MM-DD')],
        queryFn: () => getEntriesForDate(currentUser, selectedDay.format('YYYY-MM-DD')),
    });

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
    const addEntryMutation = useMutation({
        mutationFn: (formData) => addEntry(currentUser, selectedDay.format('YYYY-MM-DD'), formData),
        onSuccess: () => {
            queryClient.invalidateQueries(['glucose', currentUser, selectedDay.format('YYYY-MM-DD')]);
        },
    });

    // Server Action
    const deleteEntryMutation = useMutation({
        mutationFn: deleteEntry,
        onSuccess: () => {
            queryClient.invalidateQueries(['glucose', currentUser, selectedDay.format('YYYY-MM-DD')]);
        },
    });

    const saveData = async (formData) => {
        await addEntryMutation.mutateAsync(formData);
    };

    const handleDelete = async (formData) => {
        await deleteEntryMutation.mutateAsync(formData);
    };

    // Client Action
    const [pendingEntry, setPendingEntry] = useState([]);
    const addPendingEntry = () => {
        const newEntry = {
            id: Date.now(),
            time: 'Time',
            glucose: '0',
            period: '0',
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
        setSelectedDay(dayjs());
    }

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

                    {entries.map((tracker) => {
                        const time = dayjs(tracker.time, 'HH:mm:ss');
                        const formattedTime = time.format('h:mm A');

                        return (
                            <form action={handleDelete} key={tracker.entry_id} className={shared['filter-card']}>
                                <input type="hidden" value={tracker.entry_id} name="entry_id" />
                                <div>{formattedTime}</div>
                                <div>{tracker.glucose}</div>
                                <div>{tracker.period}</div>
                                <div>{tracker.notes}</div>
                                <div>
                                    <button className={shared.button} onClick={() => handleEditClick(tracker.id)}><Pencil /></button>
                                    <button className={shared.button} type="submit"><Trash2 /></button>
                                </div>
                            </form>
                        )
                    })}

                    {pendingEntry.map((entry) => {
                        return (
                            <form action={saveData} key={entry.id} className={shared['filter-card']}>
                                <input type="time" name="time" defaultValue={selectedDay.format('HH:mm')}></input>
                                <input type="number" name="glucose"></input>
                                <select name="period">
                                    <option>Breakfast</option>
                                </select>
                                <input type="text" name="notes" />
                                <div>
                                    <button className={shared.button} type="submit" style={{ color: "green" }}><CircleCheck /></button>
                                    <button className={shared.button} onClick={(event) => handleUndo(event, entry.id)}><Undo2 /></button>
                                </div>
                            </form>
                        )
                    })}

                    <div className={shared['add-container']}>
                        <button className={shared.add} onClick={addPendingEntry}>
                            Add Tracker
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}