import {TaskItemTypes} from "../types/TaskTypes";
import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {ModifiedElement} from "../recoil/store";
import {NumberOrNull} from "../types/GeneralTypes";
import DnDContainer from "../components/DnD/DnDContainer";
import CRUDMenu from "../components/CRUD/CRUDMenu";

// state is temporally
const props = ['First todo is the important', 'Small', 'Fourth todo is big', 'Another todo', 'More todo',]
const todos = [
    {
        type: 'single',
        content: 'Single todo item',
        id: 0,
        borderStyle: 0
    },
    {
        type: 'table',
        content: props,
        title: 'Todo table 1',
        id: 1,
        borderStyle: 0
    },
    {
        type: 'table',
        content: props,
        title: 'Todo table 2',
        id: 2,
        borderStyle: 2
    }
] as TaskItemTypes[]
// temporally here
const gridMap = new Array(5) as (number | null)[][];
for (let i = 0; i < 5; i++) {
    gridMap[i] = new Array(4);
    for (let j = 0; j < 4; j++) {
        gridMap[i][j] = null;
    }
}
gridMap[0][0] = 0;
gridMap[2][3] = 1;
gridMap[1][1] = 2;

export default function Roadmap() {
    // imitating server/local synchronization
    const [taskMap] = useState(gridMap);
    const [tasks, setTasks] = useState(todos);

    const [modifiedElement, setModifiedElement] = useRecoilState(ModifiedElement);
    const [modifiedIndex, setModifiedIndex] = useState(null as NumberOrNull);

    useEffect(() => {
        // if some element is being modified
        if (modifiedElement) {
            setModifiedIndex(tasks.length);

            setTasks([...tasks, {
                type: 'single',
                content: 'Single Task',
                id: tasks.length,
                borderStyle: Math.floor(Math.random() * 6)
            }])
            taskMap[modifiedElement.y][modifiedElement.x] = tasks.length;
            setModifiedElement(null);
        }
    })

    return (
        <>
            <DnDContainer roadmap={taskMap} tasks={tasks}></DnDContainer>
            <CRUDMenu
                tasks={tasks}
                setTasks={setTasks}
                modifiedIndex={modifiedIndex}
                setModifiedIndex={setModifiedIndex}
            ></CRUDMenu>
        </>
    )
}