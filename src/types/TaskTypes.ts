export type TaskTypes = 'single' | 'table';

interface TaskItem {
    type: string,
    content: string | string[],
    id: number
}

export interface TaskSingle extends TaskItem {
    type: 'single',
    content: string
}

export interface TaskTable extends TaskItem{
    type: 'table',
    content: string[],
    title: string
}

type TodoItemTypes = TaskTable | TaskSingle;
export default TodoItemTypes;