import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./DateHeader.module.css"
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


export default function DateHeader(props) {
    return (
        <div className={styles['date-header']}>

            <div className={styles['date-flex']}>
                <div className={styles['date-styling']}>
                    <button className={styles['button']} onClick={props.goBackADay}>
                        <ChevronLeft />
                    </button>

                    <div className={styles.date}>
                        {props.selectedDay.format('dddd, MMM D')}
                    </div>

                    <button className={styles['button']} onClick={props.goForwardADay}>
                        <ChevronRight />
                    </button>
                </div>

                <button className={`${styles['date-styling']} ${styles['reset-button']}`} onClick={props.resetDate}>
                    Reset
                </button>
            </div>

            {/* <div className={styles['date-styling']}>
                Cesar Jimenez
            </div> */}  

            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem>
                    <MobileDatePicker
                        defaultValue={props.selectedDay}
                        onChange={props.onChange}
                        className={styles.mobileDate}
                        sx={{
                            width: '105px',
                            '& .MuiInputBase-root': {
                                fontSize: '0.813rem',
                                height: '32px'
                            },
                            '& .MuiSvgIcon-root': { fontSize: '0.813rem' }     // Adjust calendar icon size
                        }}
                    />
                </DemoItem>
            </LocalizationProvider> */}
        </div>
    )
}