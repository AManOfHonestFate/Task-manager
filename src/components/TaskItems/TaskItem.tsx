import TaskTable from "./TaskTable";
import TaskSingle from "./TaskSingle"
import {TaskItem} from "../../types/TaskTypes";
import InfoButton from "../UI/InfoButton";
import {useState} from "react";
interface TaskItemProps extends TaskItem{
    infoButton?: any
}
// generalized component...
//...depends on item's type field returns corresponding component
export default function Task({infoButton, ...item}: TaskItemProps) {
    const taskTypes = new Map([
        // @ts-ignore
        ['single', <TaskSingle borderStyle={item.borderStyle}>{item.content}</TaskSingle>],
        // @ts-ignore
        ['table', <TaskTable borderStyle={item.borderStyle} title={item.title}>{item.content}</TaskTable>]
    ])

    const [showInfoButton, setShowInfoButton] = useState(false);

    return (
        <span
            className="relative"
            onMouseEnter={() => setShowInfoButton(!!infoButton)}
            onMouseLeave={() => setShowInfoButton(false)}
        >
            {showInfoButton ? <InfoButton onClick={() => 1}></InfoButton> : ''}
            {taskTypes.get(item.type)}
        </span>
    )
}