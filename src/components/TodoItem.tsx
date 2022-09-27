interface TodoItemProps {
    children: JSX.Element | string
}

export default function TodoItem({ children } : TodoItemProps) {

    return (
        <div className="block py-3 px-5 border-2 border-neutral-100">
            { children }
        </div>
    )
}
