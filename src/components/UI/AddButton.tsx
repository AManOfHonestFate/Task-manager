import {MouseEventHandler} from "react";

interface ButtonProps {
    onClick: MouseEventHandler
}

export default function AddButton({ onClick }: ButtonProps) {

    return (
            <span
                onClick={onClick}
                className="btn-add"
            ></span>
    )
}