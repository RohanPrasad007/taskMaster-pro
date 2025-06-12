import { Document } from "mongoose";

export type Priority = "High" | "Medium" | "Low";
export type Status = "To Do" | "In Progress" | "Completed";

export interface ITask extends Document {
  title: string;
  description: string;
  dueDate: Date;
  priority: Priority;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}
