export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  status: "In Progress" | "Completed";
}
export type Priority = Task["priority"];
export type Status = Task["status"];
