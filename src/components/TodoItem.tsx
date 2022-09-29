import TodoTable from "./TodoTable";
import TodoSingle from "./TodoSingle"

interface TodoSingle {
    type: 'single',
    content: string
}

interface TodoTable {
    type: 'table',
    content: string[],
    title: string
}

type TodoItemTypes = TodoTable | TodoSingle;

export default function TodoItem(item: TodoItemTypes) {
    switch (item.type) {
        case "single":
            return (
                <TodoSingle>{ item.content }</TodoSingle>
            )
        case "table":
            return (
                <TodoTable title={item.title}>{ item.content }</TodoTable>
            )
    }
}