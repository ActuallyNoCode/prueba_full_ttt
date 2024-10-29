export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string;
}

export enum TaskStatus {
  IN_PROGRESS = "In Progress",
  DONE = "Done",
  PENDING = "Pending",
}
