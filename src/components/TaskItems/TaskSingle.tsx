import {useState} from "react";
import borderStyles from "./BorderStyles";

interface TaskSingleProps {
    children: JSX.Element | string,
    borderStyle: number
}
// renders single task
export default function TaskSingle({ children, borderStyle } : TaskSingleProps) {
    const [isDone, setIsDone] = useState(false);
    function setDone() {
        setIsDone(!isDone);
    }

    return (
        <div className={
            `py-2 px-1 mx-2 text-sm border-2 cursor-pointer select-none transition-colors text-lg
            ${isDone ? "text-tertiary border-tertiary line-through" : "text-primary border-primary hover:border-secondary"}`
        }
             style={borderStyles.get(borderStyle)}
             onClick={setDone}
        >
            { children }
        </div>
    )
}