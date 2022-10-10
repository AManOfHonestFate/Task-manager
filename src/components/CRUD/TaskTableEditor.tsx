import TaskInput from "../UI/TaskInput";
import {TaskItemTypes, TaskTable} from "../../types/TaskTypes";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import TaskMiniInput from "../UI/TaskMiniInput";

interface TaskTableEditorProps {
    tasks: TaskItemTypes[],
    setTasks: Dispatch<SetStateAction<TaskItemTypes[]>>,
    modifiedIndex: number,
}

export default function TaskTableEditor({ tasks, setTasks, modifiedIndex}: TaskTableEditorProps) {

    const modifiedTask = tasks[modifiedIndex] as TaskTable;
    const [title, setTitle] = useState(modifiedTask.title);
    const [content, setContent] = useState(modifiedTask.content);

    useEffect(() => {
        tasks[modifiedIndex] = {
            ...modifiedTask,
            title,
            content
        }
        setTasks([...tasks]);
    }, [title, content])

    return (
        <div className="flex flex-col my-auto">
            <TaskInput
                label="Title:"
                value={title}
                setValue={setTitle}
            ></TaskInput>
            <TaskMiniInput
                value={content}
                setValue={setContent}
            ></TaskMiniInput>
        </div>
    )
}