import TaskTable from "./TaskTable";
import TodoSingle from "./TaskSingle"
import TodoItemTypes from "../../types/TaskTypes";

export default function TaskItem(item: TodoItemTypes) {
    switch (item.type) {
        case "single":
            return (
                <TodoSingle>{ item.content }</TodoSingle>
            )
        case "table":
            return (
                <TaskTable title={item.title}>{ item.content }</TaskTable>
            )
    }
}