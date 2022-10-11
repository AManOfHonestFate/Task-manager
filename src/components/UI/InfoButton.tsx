import {HTMLAttributes} from "react";

export default function InfoButton({className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={`absolute bg-background -top-2 right-2 w-8 h-7 rounded-full text-4xl text-tertiary border-2
                border-tertiary cursor-pointer hover:text-neutral-100 hover:border-secondary ` + className}
        >i</div>
    )
}