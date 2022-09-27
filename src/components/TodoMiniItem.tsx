import {useState} from "react";

interface TodoMiniItemProps {
    children: string
}

export default function TodoItem({ children } : TodoMiniItemProps) {
    const [isDone, setIsDone] = useState(false);

    function setDone() {
        setIsDone(!isDone);
    }

    return (
        <div className={
            `py-1 px-2 border rounded cursor-pointer mr-2 mb-2
            ${isDone ? "text-tertiary border-tertiary line-through" : "text-primary border-primary hover:text-secondary hover:border-secondary"}`
        }
             onClick={setDone}
        >
            { children }
        </div>
    )
}