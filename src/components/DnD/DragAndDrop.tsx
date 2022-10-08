import { useRef, useEffect, Dispatch, SetStateAction} from "react";

interface DragAndDropProps {
    children: JSX.Element,  // dragged element
    position: {x: number, y: number},  // absolute position
    setPosition: Dispatch<SetStateAction<{x: number, y: number}>>
}

export default function DragAndDrop({ children, position, setPosition }: DragAndDropProps) {

    const el = useRef<HTMLSpanElement>(null);
    const elSize = useRef({x: 0, y: 0});

    // sets position on cursor move
    function handleMove(e: MouseEvent) {
        setPosition({
            x: e.clientX - elSize.current.x,
            y: e.clientY - elSize.current.y
        })
    }

    useEffect(() => {
        if (!el.current) return;

        // size of the element
        elSize.current.x = parseFloat(window.getComputedStyle(el.current).width) / 2;
        elSize.current.y = parseFloat(window.getComputedStyle(el.current).height) / 2;

        // globally tracking mouse movement
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, [])

    return (
        <span
            ref={el}
            className="absolute w-slot flex flex-col justify-center pointer-events-none transition-transform duration-75"
            style={{transform: `translate(${position.x}px, ${position.y}px)`}}
        >
            { children }
        </span>
    )
}