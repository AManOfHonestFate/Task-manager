import styles from "./Notes.module.css"

interface NoteProps {
    children: string
}

export default function Note({ children }: NoteProps) {
    return (
        <div className={styles.paper}>
            <div className={styles.pin}>
                <div className={styles.shadow}></div>
                <div className={styles.metal}></div>
                <div className={styles.head}></div>
            </div>
            <p>{ children }</p>
        </div>
    )
}