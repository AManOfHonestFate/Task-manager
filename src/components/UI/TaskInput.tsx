import {Dispatch, SetStateAction} from "react";
import borderStyles from "./BorderStyles";

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
                className="bg-transparent p-2 ml-2 border"
                style={borderStyles.get(2)}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={(e) => e.target.value || setValue('🙂')}
            />
        </label>
    )
}