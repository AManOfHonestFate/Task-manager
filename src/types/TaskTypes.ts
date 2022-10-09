export type TodoTypes = 'single' | 'table';

interface TodoItem {
    type: string,
    content: string | string[],
    id: number
}

interface TodoSingle extends TodoItem {
    type: 'single',
    content: string
}

interface TodoTable extends TodoItem{
    type: 'table',
    content: string[],
    title: string
}

type TodoItemTypes = TodoTable | TodoSingle;

export default TodoItemTypes;