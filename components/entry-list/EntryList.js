import { Pencil, Trash2 } from "lucide-react";
import shared from "../shared.module.css"

export default function Entries(props) {
    return (
        <>
            {props.data.map((tracker) => {
                const time = props.dayjs(tracker.time, 'HH:mm:ss');
                const formattedTime = time.format('h:mm A');

                return (
                    <form action={props.handleDelete} key={tracker.entry_id} className={shared['filter-card']}>
                        <input type="hidden" value={tracker.entry_id} name="entry_id" />
                        <div>{formattedTime}</div>
                        <div>{tracker.systolic}</div>
                        <div>{tracker.diastolic}</div>
                        <div>{tracker.pulse}</div>
                        <div>
                            <button className={shared.button} onClick={() => handleEditClick(tracker.id)}><Pencil /></button>
                            <button className={shared.button} type="submit"><Trash2 /></button>
                        </div>
                    </form>
                )
            })}
        </>
    )
}