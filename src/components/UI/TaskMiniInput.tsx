import {Dispatch, SetStateAction} from "react";
import borderStyles from "./BorderStyles";

interface TaskMiniInputProps {
    value: string[],
    setValue: Dispatch<SetStateAction<string[]>>
}

export default function TaskMiniInput({ value, setValue }: TaskMiniInputProps) {
    return (
        <div className="flex flex-wrap items-start mt-4">
            <p className="mr-2">Tasks:</p>
            {value.map((item, idx) => (
                <input
                    key={idx}
                    className="bg-transparent min-w-[80px] p-1 mr-2 mb-2 border"
                    style={{...borderStyles.get(idx % 6), width: `${value[idx].length}ch`}}
                    type="text"
                    value={value[idx]}
                    onChange={(e) => {
                        value[idx] = e.target.value;
                        setValue([...value]);
                    }}
                    onBlur={(e) => {
                        if (e.target.value === '') {
                            value = value.filter(el => el.length !== 0);
                            setValue([...value]);
                        }
                    }}
                    autoFocus={idx === value.length - 1}
                />
            ))}
            <div
                className="text-4xl text-pink-500 cursor-pointer"
                onClick={() => setValue([...value, ''])}
            >+</div>
        </div>
    )
}