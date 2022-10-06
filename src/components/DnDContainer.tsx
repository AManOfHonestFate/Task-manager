import TodoItem from "./TodoItem";
import DnDSlot from "./DnDSlot";
import {useEffect, useState} from "react";
import DragContext, {DragValue} from "../contexts/DragContext"
import TodoItemTypes from "../types/TodoTypes";
import DragAndDrop from "./DragAndDrop";

const props = ['Todo', 'First todo', 'Small', 'Fourth todo is big', 'Another todo', 'Todo todo', 'Some more todo', 'This todo is very large']

const todos = [
    {
        type: 'single',
        content: 'Single todo item',
        id: 0
    },
    {
        type: 'table',
        content: props,
        title: 'Todo table 1',
        id: 1
    },
    {
        type: 'table',
        content: props,
        title: 'Todo table 2',
        id: 2
    }
] as TodoItemTypes[]

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

export default function DnDContainer() {
    const [dragInfo, setDragInfo] = useState({
        draggedId: null as number | null,
        currentPosition: {x: null as number | null, y: null as number | null}
    });

    const [dragStatus, setDragStatus] = useState('none');

    useEffect(() => {
        if (dragStatus === 'dragEnded' && dragInfo.currentPosition.y !== null && dragInfo.currentPosition.x !== null) {
            Promise.resolve().then(() => {
                setDragStatus('none');
                setDragInfo({draggedId: null, currentPosition: {x: null, y: null}});

                if (gridMap[dragInfo.currentPosition.y!][dragInfo.currentPosition.x!] !== null) return;

                gridMap.forEach((row, j) => {
                    row.forEach((el, i) => {
                        if (el === dragInfo.draggedId) gridMap[j][i] = null;
                    })
                })

                gridMap[dragInfo.currentPosition.y!][dragInfo.currentPosition.x!] = dragInfo.draggedId;
            })
        }
    }, [dragStatus])

    return (
        <DragContext.Provider value={{dragInfo, setDragInfo ,dragStatus, setDragStatus} as DragValue}>
            <div
                className={`grid grid-cols-4 grid-rows-5 gap-4`}
            >
                {gridMap.map((row, i) => {
                    return row.map((el, j) => {
                        if (el !== null) {
                            const item = todos[el];

                            return (
                                <DnDSlot position={{ x: j, y: i }} key={`${i}${j}`} id={item.id}>
                                    <TodoItem {...item}></TodoItem>
                                </DnDSlot>
                            )
                        }

                        const pos = dragInfo.currentPosition;
                        let showBlueprint;
                        if (dragStatus === 'dragging' && pos.x !== null && pos.y !== null) {
                            showBlueprint = pos.x === j && pos.y === i;
                        }

                        return (
                            <DnDSlot position={{ x: j, y: i }} key={`${i}${j}`}>
                                {showBlueprint ? <TodoItem {...todos[dragInfo.draggedId!]}></TodoItem> : undefined}
                            </DnDSlot>
                        )
                    })
                })}
                {dragStatus === 'dragging' ?
                    <DragAndDrop><TodoItem {...todos[dragInfo.draggedId!]}></TodoItem></DragAndDrop>
                    : ''}
            </div>
        </DragContext.Provider>
    )
}