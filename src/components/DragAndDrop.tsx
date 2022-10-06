import {useState, useRef, useEffect} from "react";

interface DragAndDropProps {
    children: JSX.Element
}

export default function DragAndDrop({ children }: DragAndDropProps) {
    const [position, setPosition] = useState({x: null as number | null, y: null as number | null});

    const el = useRef<HTMLSpanElement>(null);
    const elPosition = useRef({x: 0, y: 0});

    function handleMove(e: MouseEvent) {
        setPosition({
            x: e.clientX - elPosition.current.x,
            y: e.clientY - elPosition.current.y
        })
    }

    useEffect(() => {
        if (!el.current) return;

        elPosition.current.x = el.current.getBoundingClientRect().left +
            parseFloat(window.getComputedStyle(el.current).width) / 2;
        elPosition.current.y = el.current.getBoundingClientRect().top +
            parseFloat(window.getComputedStyle(el.current).height) / 2;

        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, [])

    return (
        <span
            ref={el}
            className={`absolute w-slot flex flex-col justify-center pointer-events-none 
            ${position.x === null ? 'invisible': ''}`}
            style={{transform: `translate(${position.x}px, ${position.y}px)`}}
        >
            { children }
        </span>
    )
}