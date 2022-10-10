import {useState} from "react";
import borderStyles from "../UI/BorderStyles";

interface TaskMiniProps {
    children: string
}
//renders mini task
export default function TaskMini({ children } : TaskMiniProps) {
    const [isDone, setIsDone] = useState(false);
    const [borderStyle] = useState(Math.floor(Math.random() * 6));

    function setDone() {
        setIsDone(!isDone);
    }

    return (
        <div className={
            `p-1 border cursor-pointer mr-1 mb-2 text-xs font-sans italic transition-colors
            ${isDone ? "text-tertiary border-tertiary line-through" : "text-primary border-primary hover:border-secondary"}`
        }
             style={borderStyles.get(borderStyle)}
             onClick={setDone}
        >
            { children }
        </div>
    )
}