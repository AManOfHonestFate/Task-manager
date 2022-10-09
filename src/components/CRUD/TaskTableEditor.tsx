import TaskInput from "../UI/TaskInput";
import TodoItemTypes, {TaskTable} from "../../types/TaskTypes";
import {Dispatch, SetStateAction, useEffect, useState} from "react";

interface TaskTableEditorProps {
    tasks: TodoItemTypes[],
    setTasks: Dispatch<SetStateAction<TodoItemTypes[]>>,
    modifiedIndex: number,
}

export default function TaskTableEditor({ tasks, setTasks, modifiedIndex}: TaskTableEditorProps) {

    const modifiedTask = tasks[modifiedIndex] as TaskTable;
    const [title, setTitle] = useState(modifiedTask.title);

    useEffect(() => {
        tasks[modifiedIndex] = {
            ...modifiedTask,
            title
        }
        setTasks([...tasks]);
    }, [title])

    return (
        <div className="flex flex-col my-auto">
            <TaskInput
                label="Title:"
                value={title}
                setValue={setTitle}
            ></TaskInput>
        </div>
    )
}