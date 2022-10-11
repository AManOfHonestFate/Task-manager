export type TaskTypes = 'single' | 'table';
// general task interface
export interface TaskItem {
    type: TaskTypes,
    content: string | string[],
    id: number,
    borderStyle: number
}
// single task interface
export interface TaskSingle extends TaskItem {
    type: 'single',
    content: string
}
// table interface
export interface TaskTable extends TaskItem{
    type: 'table',
    content: string[],
    title: string
}
// all task variants
export type TaskItemTypes = TaskTable | TaskSingle;