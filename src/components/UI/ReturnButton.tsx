import {MouseEventHandler} from "react";

interface ReturnButtonProps {
    onClick: MouseEventHandler
}

export default function ReturnButton({ onClick }: ReturnButtonProps) {
    return (
        <div
            className="w-8 h-8 border-8 border-t-neutral-100 border-r-neutral-100 relative cursor-pointer
            border-l-transparent border-b-transparent rounded-full rotate-[30] transition-transform before:block
            before:border-x-[1rem] before:border-y-[10px] before:border-r-neutral-100 before:border-y-transparent
            before:border-l-transparent before:absolute before:bottom-2 before:right-3
            hover:-rotate-12 hover:scale-125"
            onClick={onClick}
        ></div>
    )
}