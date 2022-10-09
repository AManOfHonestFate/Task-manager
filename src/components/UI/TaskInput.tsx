import {Dispatch, SetStateAction} from "react";

interface TaskInputProps {
    label: string,
    value: string,
    setValue: Dispatch<SetStateAction<string>>
}

export default function TaskInput({ label, value, setValue }: TaskInputProps) {
    return (
        <label>
            { label }
            <input
                className="bg-transparent p-2 ml-2 border-b-2"
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </label>
    )
}