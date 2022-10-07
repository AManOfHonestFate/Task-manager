import {useState, useRef, useEffect, Dispatch, SetStateAction} from "react";

interface DragAndDropProps {
    children: JSX.Element,
    position: {x: number, y: number},
    setPosition: Dispatch<SetStateAction<{x: number, y: number}>>
}

export default function DragAndDrop({ children, position, setPosition }: DragAndDropProps) {

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

        elPosition.current.x = parseFloat(window.getComputedStyle(el.current).width) / 2;
        elPosition.current.y = parseFloat(window.getComputedStyle(el.current).height) / 2;

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