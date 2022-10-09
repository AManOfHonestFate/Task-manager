import TaskTable from "./TaskTable";
import TodoSingle from "./TaskSingle"
import {TaskItemTypes} from "../../types/TaskTypes";
// generalized component...
//...depends on item's type field returns corresponding component
export default function TaskItem(item: TaskItemTypes) {
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