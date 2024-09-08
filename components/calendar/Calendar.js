import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import styles from "./Calendar.module.css"

export default function Calendar(props) {
    return (
        <div className={styles['calendar-container']}>
            {props.isClient && (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar className={styles.calendar} value={props.value} onChange={props.onChange} />
                </LocalizationProvider>
            )}

        </div>
    )

}