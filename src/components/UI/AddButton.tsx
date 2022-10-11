import {HTMLAttributes} from "react";

export default function AddButton({className = '', ...props}: HTMLAttributes<HTMLDivElement>) {

    return (
            <div
                {...props}
                className={`m-auto px-10 py-20 rounded-full text-tertiary bg-background
                    opacity-0 hover:opacity-100 transition-opacity cursor-pointer ` + className}
            >+</div>
    )
}