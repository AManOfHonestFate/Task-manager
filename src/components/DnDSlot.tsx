import {useContext} from "react";
import DragContext from "../contexts/DragContext";
import AddButton from "./UI/AddButton";

interface DnDSlotProps {
    position: {x: number, y: number}
    children?: JSX.Element,
    id?: number
}

export default function DnDSlot({ position, children, id }: DnDSlotProps) {

    const { dragInfo, setDragInfo, dragStatus, setDragStatus } = useContext(DragContext);
    let isMouseDown = false;

    function handleMouseEnter() {
        if (dragStatus !== 'dragging') return;

        setDragInfo({
            ...dragInfo,
            currentPosition: position
        })
    }

    function handleMouseUp() {
        setDragStatus('dragEnded');
        window.removeEventListener('mouseup', handleMouseUp);
    }

    function handleMove() {
        if (!isMouseDown) return;
        if (id === undefined) return;

        setDragInfo({
            currentPosition: position,
            draggedId: id}
        )

        if (dragStatus === 'dragging') return;
        setDragStatus('dragging');
        window.addEventListener('mouseup', handleMouseUp);
    }

    function handleMouseDown() {
        isMouseDown = true;
    }

    return (
        <div
            className={`w-slot h-slot flex flex-col justify-center border-pink-500\
            ${dragStatus === 'dragging' || id !== undefined ? '' : 'hover:border'}`}
            style={{opacity: id === undefined ? 0.5 : 1}}
            onMouseEnter={handleMouseEnter}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMove}
            onMouseUp={() => isMouseDown = false}
        >
            { children ?? <AddButton onClick={() => 1}/> }
        </div>
    );
}