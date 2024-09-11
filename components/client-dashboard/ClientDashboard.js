"use client";

import dayjs from 'dayjs';

import { useState, useEffect } from "react";
import { addEntry, deleteEntry, getEntriesForDate } from "@/actions/entries";
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import Calendar from "../calendar/Calendar";
import DateHeader from "../date-header/DateHeader";
import Entries from '../entry-list/EntryList';
import PendingEntries from '../pending-entry/PendingEntryForm';

import styles from "@/app/dashboard/page.module.css";
import shared from "../shared.module.css";

export default function ClientDashboard({ currentUser }) {
    
    // Default States
    const [selectedDay, setSelectedDay] = useState(dayjs());
    const [isClient, setIsClient] = useState(false);
    const queryClient = useQueryClient();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const { data: entries = [] } = useQuery({
        queryKey: ['entries', currentUser, selectedDay.format('YYYY-MM-DD')],
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
            queryClient.invalidateQueries(['entries', currentUser, selectedDay.format('YYYY-MM-DD')]);
        },
    });

    // Server Action
    const deleteEntryMutation = useMutation({
        mutationFn: deleteEntry,
        onSuccess: () => {
            queryClient.invalidateQueries(['entries', currentUser, selectedDay.format('YYYY-MM-DD')]);
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
                    onChange={(newValue) => setSelectedDay(newValue)}
                />

                <div className={shared.card}>
                    <div className={`${shared['filter-card']} ${shared['desktop-card']}`}>
                        <div>Time</div>

                        <div className={shared.flex}>
                            <div className={shared.title}>Systolic</div>
                            <div className={shared.subtitle}>mmHg</div>
                        </div>

                        <div className={shared.flex}>
                            <div className={shared.title}>Diastolic</div>
                            <div className={shared.subtitle}>mmHg</div>
                        </div>

                        <div className={shared.flex}>
                            <div className={shared.title}>Pulse</div>
                            <div className={shared.subtitle}>/min</div>
                        </div>

                        <div>Actions</div>
                    </div>

                    <div className={`${shared['filter-card']} ${shared['mobile-card']}`}>
                        <div>Time</div>

                        <div className={shared.flex}>
                            <div className={shared.title}>Sys</div>
                            <div className={shared.subtitle}>mmHg</div>
                        </div>

                        <div className={shared.flex}>
                            <div className={shared.title}>Dia</div>
                            <div className={shared.subtitle}>mmHg</div>
                        </div>

                        <div className={shared.flex}>
                            <div className={shared.title}>Pulse</div>
                            <div className={shared.subtitle}>/min</div>
                        </div>

                        <div>Actions</div>
                    </div>

                    <Entries
                        data={entries}
                        handleDelete={handleDelete}
                        handleEditClick={handleEditClick}
                        dayjs={dayjs}
                    />

                    <PendingEntries
                        data={pendingEntry}
                        insertEntry={saveData}
                        addPendingEntry={addPendingEntry}
                        handleUndo={handleUndo}
                        currentTime={selectedDay.format('HH:mm')}
                    />
                </div>
            </div>
        </div>
    );
}