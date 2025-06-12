import type { Status, Task } from "../types/task";
import { useTasks } from "../context/TaskContext";
import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

interface EditTaskModalProps {
  task: Task;
  onClose: () => void;
  onSave: () => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  task,
  onClose,
  onSave,
}) => {
  const { editTask } = useTasks();
  const [editedTask, setEditedTask] = useState<Task>(task);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { _id, ...updatedTask } = editedTask;
    editTask(_id, updatedTask);
    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl w-full max-w-md shadow-2xl border border-white/20 animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Edit Task</h2>
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
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask({ ...editedTask, title: e.target.value })
              }
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
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
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
              value={new Date(editedTask.dueDate).toISOString().split("T")[0]}
              onChange={(e) =>
                setEditedTask({ ...editedTask, dueDate: e.target.value })
              }
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
                value={editedTask.priority}
                onChange={(e) =>
                  setEditedTask({
                    ...editedTask,
                    priority: e.target.value as Task["priority"],
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
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Status
            </label>
            <div className="relative">
              <select
                className="w-full p-4 border border-slate-200 rounded-xl appearance-none pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/70 transition-all duration-200"
                value={editedTask.status}
                onChange={(e) =>
                  setEditedTask({
                    ...editedTask,
                    status: e.target.value as Status,
                  })
                }
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
