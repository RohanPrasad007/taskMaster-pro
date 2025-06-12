import type { Task } from "../types/task";
import { useTasks } from "../context/TaskContext";
import { X } from "lucide-react";

interface DeleteModalProps {
  task: Task;
  onClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ task, onClose }) => {
  const { deleteTask } = useTasks();

  const handleDelete = () => {
    deleteTask(task._id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl w-full max-w-md shadow-2xl border border-white/20 animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Delete Task</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-xl transition-all duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="mb-8">
          <p className="text-slate-600 mb-4">
            Are you sure you want to delete this task? This action cannot be
            undone.
          </p>
          <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-red-400">
            <p className="font-semibold text-slate-800">{task.title}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            className="flex-1 border border-slate-300 text-slate-600 px-6 py-3 rounded-xl font-medium hover:bg-slate-50 transition-all duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg"
            onClick={handleDelete}
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
