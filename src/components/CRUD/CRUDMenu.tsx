import ReturnButton from "../UI/ReturnButton";
import TaskItem from "../TaskItems/TaskItem";
import {Dispatch, SetStateAction, MouseEvent, useState, useEffect} from "react";
import TodoItemTypes, {TaskTypes} from "../../types/TaskTypes";
import {NumberOrNull} from "../../types/GeneralTypes";
import TaskTableEditor from "./TaskTableEditor";
import TaskSingleEditor from "./TaskSingleEditor";

interface CRUDMenuProps {
    tasks: TodoItemTypes[],
    setTasks: Dispatch<SetStateAction<TodoItemTypes[]>>,
    modifiedIndex: NumberOrNull,
    setModifiedIndex: Dispatch<SetStateAction<NumberOrNull>>
}

export default function CRUDMenu({ tasks, setTasks, modifiedIndex, setModifiedIndex }: CRUDMenuProps) {
    const elIndex = modifiedIndex ?? 0;

    const taskTemplates = [
        {
            type: 'single',
            content: 'Single Task',
            id: tasks[elIndex].id,
        },
        {
            type: 'table',
            title: 'table',
            content: ["Task1", "Task2"],
            id: tasks[elIndex].id,
        }
    ] as TodoItemTypes[]

    const editors = {
        'single': <TaskSingleEditor tasks={tasks} setTasks={setTasks} modifiedIndex={elIndex}></TaskSingleEditor>,
        'table': <TaskTableEditor tasks={tasks} setTasks={setTasks} modifiedIndex={elIndex}></TaskTableEditor>
    }
    const editor = editors[tasks[elIndex].type];

    function changeTaskType(e: MouseEvent, type: TaskTypes) {
        e.stopPropagation();
        tasks[elIndex] = taskTemplates.find(template => template.type === type)!;
        setTasks([...tasks]);
    }

    return (
        <div
            className="flex flex-col fixed bottom-16 left-4 p-4 box-content w-slot h-[60%] bg-indigo-800/60 rounded-l-xl
            transition duration-500 backdrop-blur"
            style={modifiedIndex ? {transform: 'translateX(0)', opacity: '1'} : {transform: 'translateX(-100%)', opacity: '0'}}
        >
            <ReturnButton onClick={() => setModifiedIndex(null)}></ReturnButton>
            <h3 className="text-xl mb-3">Create New Task</h3>
            <div className="flex items-center border-y border-y-white">
                {taskTemplates.map((task, idx) => (
                    <div
                        className="scale-75"
                        onClickCapture={(e) => changeTaskType(e, task.type)}
                        key={idx}
                    >
                        <TaskItem {...task}></TaskItem>
                    </div>
                ))}
            </div>
            { modifiedIndex ? editor : ''}
        </div>
    )
}