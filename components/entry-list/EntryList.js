import { Pencil, Trash2 } from "lucide-react";
import shared from "../shared.module.css"

export default function PendingEntries(props) {
    return (
        <>
            {props.data.map((tracker) => {
                return (
                    <div key={tracker.id} className={shared['filter-card']}>
                        <div>{tracker.time}</div>
                        <div>{tracker.systolic}</div>
                        <div>{tracker.diastolic}</div>
                        <div>{tracker.pulse}</div>
                        <div>
                            <button className={shared.button} onClick={() => handleEditClick(tracker.id)}><Pencil /></button>
                            <button className={shared.button} onClick={() => handleDelete(tracker.id)}><Trash2 /></button>
                        </div>
                    </div>
                )
            })}
        </>
    )
}