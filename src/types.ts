export type TaskStatus = "backlog" | "ready" | "in-progress" | "finished";

export interface Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
}
