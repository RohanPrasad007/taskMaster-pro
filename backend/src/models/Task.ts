import { Schema, model } from "mongoose";
import { ITask } from "../interfaces/task.interface";

const TaskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
    priority: {
      type: String,
      enum: {
        values: ["High", "Medium", "Low"],
        message: "{VALUE} is not a valid priority",
      },
      required: [true, "Priority is required"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: {
        values: ["To Do", "In Progress", "Completed"],
        message: "{VALUE} is not a valid status",
      },
      required: [true, "Status is required"],
      default: "To Do",
    },
  },
  {
    timestamps: true,
  }
);

export default model<ITask>("Task", TaskSchema);
