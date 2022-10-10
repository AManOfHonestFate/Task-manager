import ReturnButton from "../UI/ReturnButton";
import TaskItem from "../TaskItems/TaskItem";
import {Dispatch, SetStateAction, MouseEvent} from "react";
import {TaskTypes, TaskItemTypes} from "../../types/TaskTypes";
import {NumberOrNull} from "../../types/GeneralTypes";
import TaskTableEditor from "./TaskTableEditor";
import TaskSingleEditor from "./TaskSingleEditor";
// getting all tasks and current modified element
interface CRUDMenuProps {
    tasks: TaskItemTypes[],
    setTasks: Dispatch<SetStateAction<TaskItemTypes[]>>,
    modifiedIndex: NumberOrNull,
    setModifiedIndex: Dispatch<SetStateAction<NumberOrNull>>
}

export default function CRUDMenu({ tasks, setTasks, modifiedIndex, setModifiedIndex }: CRUDMenuProps) {
    // if some element is being modified ...
    //... show it in this menu, else menu is hidden
    const elIndex = modifiedIndex ?? 0;

    const borderStyle = tasks[elIndex].borderStyle;
    const taskTemplates = [
        {
            type: 'single',
            content: 'Single Task',
            id: tasks[elIndex].id,
            borderStyle
        },
        {
            type: 'table',
            title: 'table',
            content: ["Task1", "Task2"],
            id: tasks[elIndex].id,
            borderStyle
        }
    ] as TaskItemTypes[]

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
            className="flex flex-col fixed bottom-16 left-4 p-4 box-content w-slot h-[60%] bg-indigo-900/40 rounded-l-xl border-2
            transition duration-500 backdrop-blur overflow-y-scroll"
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