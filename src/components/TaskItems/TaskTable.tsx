import TodoMiniItem from './TaskMiniItem'
import borderStyles from "./BorderStyles";

interface TaskTableProps {
    title: string,
    children: string[],
    borderStyle: number
}
// renders table with tasks
export default function TaskTable({ title, children, borderStyle } : TaskTableProps) {
    return (
        <div
            className="py-1 px-2 m-1 border-2 border-primary cursor-pointer select-none max-h-full text-lg"
            style={borderStyles.get(borderStyle)}
        >
            <h3 className="mb-1">{ title }</h3>
            <span className="flex flex-wrap">
                {children.map((el, idx) => {
                    return <TodoMiniItem key={idx}>{ el }</TodoMiniItem>
                })}
            </span>
        </div>
    )
}