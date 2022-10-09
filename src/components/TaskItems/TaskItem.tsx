import TaskTable from "./TaskTable";
import TodoSingle from "./TaskSingle"
import TodoItemTypes from "../../types/TaskTypes";

export default function TaskItem(item: TodoItemTypes) {
    switch (item.type) {
        case "single":
            return (
                <TodoSingle borderStyle={item.borderStyle}>{ item.content }</TodoSingle>
            )
        case "table":
            return (
                <TaskTable borderStyle={item.borderStyle} title={item.title}>{ item.content }</TaskTable>
            )
    }
}