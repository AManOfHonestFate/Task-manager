import TaskInput from "../UI/TaskInput";
import {TaskItemTypes, TaskSingle} from "../../types/TaskTypes";
import {Dispatch, SetStateAction, useEffect, useState} from "react";

interface TaskSingleEditor {
    tasks: TaskItemTypes[],
    setTasks: Dispatch<SetStateAction<TaskItemTypes[]>>,
    modifiedIndex: number,
}

export default function TaskSingleEditor({ tasks, setTasks, modifiedIndex }: TaskSingleEditor) {
    const modifiedTask = tasks[modifiedIndex] as TaskSingle;
    const [task, setTask] = useState(modifiedTask.content);

    useEffect(() => {
        tasks[modifiedIndex] = {
            ...modifiedTask,
            content: task
        }
        setTasks([...tasks]);
    }, [task])

    return (
        <div className="flex flex-col my-auto">
            <TaskInput
                label="Task:"
                value={task}
                setValue={setTask}
            ></TaskInput>
        </div>
    )
}