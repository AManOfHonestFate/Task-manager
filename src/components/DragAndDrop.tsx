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
    const elSize = useRef({width: 0, height: 0});

    useEffect(() => {
        if (!el.current) return;

        elSize.current.height = parseFloat(window.getComputedStyle(el.current).height);
        elSize.current.width = parseFloat(window.getComputedStyle(el.current).width);
    }, [el.current])

    function mouseMoveListener (e: globalThis.MouseEvent) {
        setPosition({x: e.clientX - elSize.current.width / 2, y: e.clientY - elSize.current.height / 2});
    }

    function handleMove() {
        if (mouseState !== 'down') return;

        setMouseState('dragged')
        window.addEventListener('mousemove', mouseMoveListener);
    }

    function handleMouseDown() {
        setMouseState('down');
    }

    function handleMouseUp() {
        window.removeEventListener('mousemove', mouseMoveListener);
        setMouseState('none');
        setPosition({x: 0, y: 0});
    }

    return (
        <span
            ref={el}
            className={`w-fit h-fit ${mouseState === 'dragged' ? 'absolute' : ''} ${className ?? ''}`}
            style={{top:  position.y  + 'px', left: position.x + 'px'}}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMove}
        >
            { children }
        </span>
    )
}