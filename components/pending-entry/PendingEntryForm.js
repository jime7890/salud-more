import { CircleCheck, Undo2 } from "lucide-react";
import styles from "./PendingEntryForm.module.css"
import shared from "../shared.module.css"

export default function PendingEntryForm(props) {
    return (
        <>
            {props.data.map((entry) => {
                return (
                    <form action={props.insertEntry} key={entry.id} className={shared['filter-card']}>
                        <input type="time" name="time" defaultValue={props.currentTime}></input>
                        <input type="number" name="systolic"></input>
                        <input type="number" name="diastolic"></input>
                        <input type="number" name="pulse"></input>
                        <div>
                            <button className={shared.button} type="submit" style={{ color: "green" }}><CircleCheck /></button>
                            <button className={shared.button} onClick={(event) => props.handleUndo(event, entry.id)}><Undo2 /></button>
                        </div>
                    </form>
                )
            })}

            <div className={styles['add-container']}>
                <button className={styles.add} onClick={props.addPendingEntry}>
                    Add Tracker
                </button>
            </div>
        </>
    )
}