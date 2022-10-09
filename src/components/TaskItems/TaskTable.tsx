import TodoMiniItem from './TaskMiniItem'
interface TodoTableProps {
    title: string,
    children: string[]
}

export default function TaskTable({ title, children } : TodoTableProps) {

    return (
        <div className="py-1 px-2 m-1 border-2 border-primary rounded cursor-pointer select-none max-h-full">
            <h3 className="mb-1">{ title }</h3>
            <span className="flex flex-wrap">
                {children.map((el, idx) => {
                    return <TodoMiniItem key={idx}>{ el }</TodoMiniItem>
                })}
            </span>
        </div>
    )
}