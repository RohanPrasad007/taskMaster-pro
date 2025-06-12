"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Task", TaskSchema);
