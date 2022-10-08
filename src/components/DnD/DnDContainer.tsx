import TodoItem from "../TodoItems/TodoItem";
import DnDSlot from "./DnDSlot";
import {useEffect, useState, MouseEvent} from "react";
import {DragInfo} from "./DragTypes"
import TodoItemTypes from "../../types/TodoTypes";
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
    // Info about drag event
    const [dragInfo, setDragInfo] = useState({
        draggedId: null as number | null,
        currentPosition: {x: null as number | null, y: null as number | null},
        status: 'none'
    } as DragInfo);

    // Absolute position of DnD element
    const [DnDPosition, setDnDPosition] = useState({
        x: 0, y: 0
    })

    useEffect(() => {
        // if drag event ended and slot's positions are defined
        if (dragInfo.status === 'dragEnded' && dragInfo.currentPosition.y !== null && dragInfo.currentPosition.x !== null) {
            // sets object to default value
            setDragInfo({draggedId: null, currentPosition: {x: null, y: null}, status: 'none'});
            // if slot isn't empty return
            if (gridMap[dragInfo.currentPosition.y][dragInfo.currentPosition.x] !== null) return;

            // place DnD element to the new slot
            gridMap.forEach((row, j) => {
                row.forEach((el, i) => {
                    if (el === dragInfo.draggedId) gridMap[j][i] = null;
                })
            })
            gridMap[dragInfo.currentPosition.y][dragInfo.currentPosition.x] = dragInfo.draggedId;
        }
    }, [dragInfo]);

    function handleMouseUp() {
        if (dragInfo.status === 'none') return;

        setDnDPosition({x: 0, y: 0});
        setDragInfo({...dragInfo, status: 'dragEnded'});
    }

    function handleMouseDown(e: MouseEvent) {
        setDnDPosition({x: e.clientX - 100, y: e.clientY - 50});
    }

    // Render DnD if dragging
    const DnDElement = dragInfo.status === 'dragging' ? (
            <DragAndDrop position={DnDPosition} setPosition={setDnDPosition}>
                <TodoItem {...todos[dragInfo.draggedId!]}></TodoItem>
            </DragAndDrop>
        )
        : undefined

    return (
        <div
            className={`grid grid-cols-4 grid-rows-5 gap-4`}
            onMouseUp={handleMouseUp}
            onMouseDownCapture={handleMouseDown}
        >
            {gridMap.map((row, i) => {
                return row.map((el, j) => {
                    if (el !== null) {
                        const item = todos[el];
                        // render slot with content
                        return (
                            <DnDSlot
                                position={{ x: j, y: i }}
                                dragInfo={dragInfo}
                                setDragInfo={setDragInfo}
                                key={`${i}${j}`}
                                id={item.id}
                            >
                                <TodoItem {...item}></TodoItem>
                            </DnDSlot>
                        )
                    }

                    const pos = dragInfo.currentPosition;
                    const showBlueprint = dragInfo.status === 'dragging' && pos.x === j && pos.y === i;
                    const content = showBlueprint ? <TodoItem {...todos[dragInfo.draggedId!]}></TodoItem> : undefined;
                    // Render Blueprint if dragging over empty slot or render empty slot
                    return (
                        <DnDSlot position={{ x: j, y: i }} dragInfo={dragInfo} setDragInfo={setDragInfo} key={`${i}${j}`}>
                            { content }
                        </DnDSlot>
                    )
                })
            })}
            { DnDElement }
        </div>
    )
}