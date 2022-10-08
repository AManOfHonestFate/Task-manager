import TodoMiniItem from './TodoMiniItem'
interface TodoTableProps {
    title: string,
    children: string[]
}

export default function TodoTable({ title, children } : TodoTableProps) {

    return (
        <div className="py-2 px-3 m-1 border-2 border-primary rounded cursor-pointer select-none">
            <h3 className="text-lg mb-2">{ title }</h3>
            <span className="flex flex-wrap">
                {children.map((el, idx) => {
                    return <TodoMiniItem key={idx}>{ el }</TodoMiniItem>
                })}
            </span>
        </div>
    )
}