import { Request, Response } from "express";
import Task from "../models/Task";

// Helper function for error handling
const handleError = (res: Response, error: unknown, statusCode = 500) => {
  const message = error instanceof Error ? error.message : "Server Error";
  res.status(statusCode).json({ success: false, message: message });
};

export const getAllTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (error) {
    handleError(res, error);
  }
};

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.status(201).json({ success: true, data: savedTask });
  } catch (error) {
    handleError(res, error, 400);
  }
};

export const getTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return handleError(res, new Error("Task not found"), 404);
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    handleError(res, error);
  }
};

export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return handleError(res, new Error("Task not found"), 404);
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    handleError(res, error, 400);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return handleError(res, new Error("Task not found"), 404);
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    handleError(res, error);
  }
};
