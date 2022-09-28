import TodoTable from "./TodoTable";
import TodoSingle from "./TodoSingle"

interface TodoSingle {
    type: 'single',
    children: string
}

interface TodoTable {
    type: 'table',
    children: string[],
    title: string
}

type TodoItemTypes = TodoTable | TodoSingle;

export default function TodoItem(item: TodoItemTypes) {
    switch (item.type) {
        case "single":
            return (
                <TodoSingle>{ item.children }</TodoSingle>
            )
        case "table":
            return (
                <TodoTable title={item.title}>{ item.children }</TodoTable>
            )
    }
}