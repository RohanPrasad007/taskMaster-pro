"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTask = exports.createTask = exports.getAllTasks = void 0;
const Task_1 = __importDefault(require("../models/Task"));
// Helper function for error handling
const handleError = (res, error, statusCode = 500) => {
    const message = error instanceof Error ? error.message : "Server Error";
    res.status(statusCode).json({ success: false, message: message });
};
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: tasks.length, data: tasks });
    }
    catch (error) {
        handleError(res, error);
    }
};
exports.getAllTasks = getAllTasks;
const createTask = async (req, res) => {
    try {
        const task = new Task_1.default(req.body);
        const savedTask = await task.save();
        res.status(201).json({ success: true, data: savedTask });
    }
    catch (error) {
        handleError(res, error, 400);
    }
};
exports.createTask = createTask;
const getTask = async (req, res) => {
    try {
        const task = await Task_1.default.findById(req.params.id);
        if (!task) {
            return handleError(res, new Error("Task not found"), 404);
        }
        res.status(200).json({ success: true, data: task });
    }
    catch (error) {
        handleError(res, error);
    }
};
exports.getTask = getTask;
const updateTask = async (req, res) => {
    try {
        const task = await Task_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!task) {
            return handleError(res, new Error("Task not found"), 404);
        }
        res.status(200).json({ success: true, data: task });
    }
    catch (error) {
        handleError(res, error, 400);
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    try {
        const task = await Task_1.default.findByIdAndDelete(req.params.id);
        if (!task) {
            return handleError(res, new Error("Task not found"), 404);
        }
        res.status(200).json({ success: true, data: {} });
    }
    catch (error) {
        handleError(res, error);
    }
};
exports.deleteTask = deleteTask;
