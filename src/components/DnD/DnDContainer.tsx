import TaskItem from "../TaskItems/TaskItem";
import DnDSlot from "./DnDSlot";
import {useEffect, useState, MouseEvent} from "react";
import {DragInfo} from "./DragTypes"
import DragAndDrop from "./DragAndDrop";
import TodoItemTypes from "../../types/TaskTypes";
import {NumberOrNull} from "../../types/GeneralTypes";

interface DnDContainerProps {
    roadmap: (NumberOrNull)[][],
    tasks: TodoItemTypes[]
}

export default function DnDContainer({ roadmap, tasks }: DnDContainerProps) {
    // Info about drag event
    const [dragInfo, setDragInfo] = useState({
        draggedId: null,
        currentPosition: null,
        status: 'none'
    } as DragInfo);

    // Absolute position of DnD element
    const [DnDPosition, setDnDPosition] = useState({
        x: 0, y: 0
    })

    useEffect(() => {
        // if drag event ended and slot's positions are defined
        if (dragInfo.status === 'dragEnded' && dragInfo.currentPosition !== null) {
            // sets object to default value
            setDragInfo({draggedId: null, currentPosition: null, status: 'none'});
            // if slot isn't empty return
            if (roadmap[dragInfo.currentPosition.y][dragInfo.currentPosition.x] !== null) return;

            // place DnD element to the new slot
            roadmap.forEach((row, j) => {
                row.forEach((el, i) => {
                    if (el === dragInfo.draggedId) roadmap[j][i] = null;
                })
            })
            roadmap[dragInfo.currentPosition.y][dragInfo.currentPosition.x] = dragInfo.draggedId;
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
                <TaskItem {...tasks[dragInfo.draggedId!]}></TaskItem>
            </DragAndDrop>
        )
        : undefined

    return (
        <div
            className={`grid grid-cols-4 grid-rows-5 gap-4`}
            onMouseUp={handleMouseUp}
            onMouseDownCapture={handleMouseDown}
        >
            {roadmap.map((row, i) => {
                return row.map((el, j) => {
                    if (el !== null && tasks[el]) {
                        const item = tasks[el];
                        // render slot with content
                        return (
                            <DnDSlot
                                position={{ x: j, y: i }}
                                dragInfo={dragInfo}
                                setDragInfo={setDragInfo}
                                key={`${i}${j}`}
                                id={item.id}
                            >
                                <TaskItem {...item}></TaskItem>
                            </DnDSlot>
                        )
                    }

                    const pos = dragInfo.currentPosition;
                    const showBlueprint = dragInfo.status === 'dragging' && pos?.x === j && pos.y === i;
                    const content = showBlueprint ? <TaskItem {...tasks[dragInfo.draggedId!]}></TaskItem> : undefined;
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