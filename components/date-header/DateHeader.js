import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./DateHeader.module.css"

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

            <div className={styles['date-styling']}>
                Cesar Jimenez
            </div>
        </div>
    )
}