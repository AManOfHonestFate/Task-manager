import TodoTable from "./TodoTable";
import TodoSingle from "./TodoSingle"
import TodoItemTypes from "../types/TodoTypes";

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