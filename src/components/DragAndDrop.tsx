import {useState, MouseEvent, useRef, RefObject, LegacyRef, useEffect} from "react";

interface DragAndDropProps {
    children: JSX.Element
}

export default function DragAndDrop({ children }: DragAndDropProps) {
    const [isDragged, setIsDragged] = useState(false);
    const [position, setPosition] = useState({x: 0, y: 0})
    const el = useRef<HTMLSpanElement>(null);

    const elSize = useRef({width: 0, height: 0});
    useEffect(() => {
        if (!el.current) return;

        elSize.current.height = parseFloat(window.getComputedStyle(el.current).height);
        elSize.current.width = parseFloat(window.getComputedStyle(el.current).height);
    }, [])

    function handleMove(e: MouseEvent) {
        if (!isDragged) return;

        setPosition({x: e.clientX - elSize.current.width, y: e.clientY - elSize.current.height / 2})
    }

    return (
        <span
            ref={el}
            style={{position: 'absolute',top: position.y + 'px', left: position.x + 'px'}}
            onMouseDown={() => setIsDragged(true)}
            onMouseUp={() => setIsDragged(false)}
            onMouseMove={(e) => handleMove(e)}
        >
            { children }
        </span>
    )
}