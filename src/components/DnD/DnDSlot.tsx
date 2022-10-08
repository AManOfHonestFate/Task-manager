import {DragInfo, SetDragInfo} from "./DragTypes";
import AddButton from "../UI/AddButton";
import {useRecoilState} from "recoil";
import {CRUDVisible} from "../../recoil/store";

interface DnDSlotProps {
    position: {x: number, y: number}, // Position of this slot in DnDContainer
    dragInfo: DragInfo,
    setDragInfo: SetDragInfo,
    children?: JSX.Element,           // Element to render
    id?: number                       // ID of the element
}

export default function DnDSlot({ position, dragInfo, setDragInfo, children, id }: DnDSlotProps) {
    let isMouseDown = false;
    // If DnD element is being dragged over this slot...
    // ...sets slot's position as currentPosition
    function handleMouseEnter() {
        if (dragInfo.status !== 'dragging') return;

        setDragInfo({
            ...dragInfo,
            currentPosition: position
        })
    }
    // stars DnD
    function handleMove() {
        if (!isMouseDown) return;
        if (id === undefined) return;
        if (dragInfo.status === 'dragging') return;

        setDragInfo({
            status: 'dragging',
            currentPosition: position,
            draggedId: id
        });
    }
    // show add button === no dragging and empty
    const showAddButton = dragInfo.status === 'none' && id === undefined;
    // render children or AddButton or nothing
    const [_isCRUDVisible, setIsCRUDVisible] = useRecoilState(CRUDVisible);
    const content = children ?? (showAddButton ? <AddButton onClick={() => setIsCRUDVisible(true)}/> : '');

    return (
        <div
            className={`w-slot h-slot flex flex-col justify-center border-pink-500
            ${showAddButton ? 'hover:border' : ''}`}

            onMouseEnter={handleMouseEnter}
            onMouseDown={() => isMouseDown = true}
            onMouseUp={() => isMouseDown = false}
            onMouseMove={handleMove}
        >
            { content }
        </div>
    );
}