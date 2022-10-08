import {CoordsOrNull, NumberOrNull} from "../../types/GeneralTypes";
import {Dispatch, SetStateAction} from "react";

type DragStatuses = 'none' | 'dragging' | 'dragEnded';

export interface DragInfo {
    draggedId: NumberOrNull,  // Id of dragged element
    currentPosition: CoordsOrNull,  // Position of current slot under dragged element
    status: DragStatuses
}

export type SetDragInfo = Dispatch<SetStateAction<DragInfo>>