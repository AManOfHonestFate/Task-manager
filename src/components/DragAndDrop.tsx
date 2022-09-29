import {useState, useRef, useEffect} from "react";

interface DragAndDropProps {
    children: JSX.Element,
    className?: string
}

type MouseStates = 'none' | 'down' | 'dragged';

export default function DragAndDrop({ children, className }: DragAndDropProps) {
    const [mouseState, setMouseState] = useState('none' as MouseStates);
    const [position, setPosition] = useState({x: 0, y: 0});

    const el = useRef<HTMLSpanElement>(null);
    const elPosition = useRef({x: 0, y: 0});

    useEffect(() => {
        if (!el.current) return;

        elPosition.current.x = el.current.getBoundingClientRect().left +
            parseFloat(window.getComputedStyle(el.current).width) / 2;
        elPosition.current.y = el.current.getBoundingClientRect().top +
            parseFloat(window.getComputedStyle(el.current).height) / 2;
    }, [children])

    function mouseMoveListener (e: globalThis.MouseEvent) {
        setPosition({x: e.clientX - elPosition.current.x, y: e.clientY - elPosition.current.y});
    }

    function mouseUpListener() {
        window.removeEventListener('mousemove', mouseMoveListener);
        window.removeEventListener('mouseup', mouseUpListener);

        handleMouseUp();
    }

    function handleMove() {
        if (mouseState !== 'down') return;

        setMouseState('dragged');
        window.addEventListener('mousemove', mouseMoveListener);
        window.addEventListener('mouseup', mouseUpListener);
    }

    function handleMouseDown() {
        setMouseState('down');
    }

    function handleMouseUp() {
        setMouseState('none');
        setPosition({x: 0, y: 0});
    }

    return (
        <span
            ref={el}
            className={`
            w-slot h-slot flex flex-col justify-center ${className ?? ''}
            `}
            style={ mouseState === 'dragged' ?
                {transform: `translate(${position.x}px, ${position.y}px)`, pointerEvents: 'none'}
                : {}}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMove}
            onMouseUp={handleMouseUp}
        >
            { children }
        </span>
    )
}