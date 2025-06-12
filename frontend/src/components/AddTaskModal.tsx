import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import type { Task } from "../types/task";
import { ChevronDown, X } from "lucide-react";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskAdded: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  onTaskAdded,
}) => {
  const { addTask } = useTasks();
  const [task, setTask] = useState<Omit<Task, "_id">>({
    title: "",
    description: "",
    dueDate: new Date().toISOString().split("T")[0],
    priority: "Medium",
    status: "In Progress",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(task);
    onTaskAdded();
    onClose();
    setTask({
      title: "",
      description: "",
      dueDate: new Date().toISOString().split("T")[0],
      priority: "Medium",
      status: "In Progress",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl w-full max-w-md shadow-2xl border border-white/20 animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Add New Task</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-xl transition-all duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Task Title
            </label>
            <input
              type="text"
              className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/70 transition-all duration-200"
              placeholder="Enter task title..."
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Description
            </label>
            <textarea
              className="w-full p-4 border border-slate-200 rounded-xl h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/70 transition-all duration-200"
              placeholder="Enter task description..."
              value={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Due Date
            </label>
            <input
              type="date"
              className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/70 transition-all duration-200"
              value={task.dueDate}
              onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Priority
            </label>
            <div className="relative">
              <select
                className="w-full p-4 border border-slate-200 rounded-xl appearance-none pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/70 transition-all duration-200"
                value={task.priority}
                onChange={(e) =>
                  setTask({
                    ...task,
                    priority: e.target.value as "High" | "Medium" | "Low",
                  })
                }
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400 h-5 w-5" />
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              className="flex-1 border border-slate-300 text-slate-600 px-6 py-3 rounded-xl font-medium hover:bg-slate-50 transition-all duration-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
