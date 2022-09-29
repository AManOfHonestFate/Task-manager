import {useState} from "react";

interface TodoItemProps {
    children: JSX.Element | string
}

export default function TodoItem({ children } : TodoItemProps) {
    const [isDone, setIsDone] = useState(false);

    function setDone() {
        setIsDone(!isDone);
    }

    return (
        <div className={
            `max-w-sm py-2 px-3 border-2 rounded-xl cursor-pointer text-lg select-none
            ${isDone ? "text-tertiary border-tertiary line-through" : "text-primary border-primary hover:text-secondary hover:border-secondary"}`
        }
             onClick={setDone}
        >
            <span className="text-primary">
                { children }
            </span>
        </div>
    )
}