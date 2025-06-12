import { useState } from "react";
import type { Task, Priority } from "../types/task";
import EditTaskModal from "./EditTaskModal";
import DeleteModal from "./DeleteModal";
import { useTasks } from "../context/TaskContext";
import { ChevronDown, ChevronUp, Plus, SquarePen, Trash2 } from "lucide-react";

interface TaskTableProps {
  tasks: Task[];
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks }) => {
  const { editTask } = useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  const handlePriorityChange = async (task: Task, newPriority: Priority) => {
    const updatedTask = { ...task, priority: newPriority };
    await editTask(task._id, updatedTask);
  };

  const getStatusBadge = (status: Task["status"]) => {
    if (status === "Completed") {
      return (
        <span className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-medium shadow-lg">
          ✓ Completed
        </span>
      );
    } else {
      return (
        <span className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium shadow-lg">
          ⏳ In Progress
        </span>
      );
    }
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "High":
        return "text-red-600 bg-red-50 border-red-200";
      case "Medium":
        return "text-amber-600 bg-amber-50 border-amber-200";
      case "Low":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  const toggleItemExpansion = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <div className="w-full">
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={() => setEditingTask(null)}
        />
      )}

      {deletingTask && (
        <DeleteModal
          task={deletingTask}
          onClose={() => setDeletingTask(null)}
        />
      )}

      {/* Desktop Table */}
      <div className="hidden md:block bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
              <th className="px-4 py-6 text-left text-sm font-bold text-slate-700 tracking-wider">
                #
              </th>
              <th className="px-4 py-6 text-left text-sm font-bold text-slate-700 tracking-wider">
                Task
              </th>
              <th className="px-4 py-6 text-left text-sm font-bold text-slate-700 tracking-wider">
                Description
              </th>
              <th className="px-4 py-6 text-left text-sm font-bold text-slate-700 tracking-wider">
                Due Date
              </th>
              <th className="px-4 py-6 text-left text-sm font-bold text-slate-700 tracking-wider">
                Status
              </th>
              <th className="px-4 py-6 text-left text-sm font-bold text-slate-700 tracking-wider">
                Priority
              </th>
              <th className="px-4 py-6 text-left text-sm font-bold text-slate-700 tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <tr
                  key={task._id}
                  className="hover:bg-slate-50/50 transition-colors duration-200"
                >
                  <td className="px-4 py-6 text-sm font-semibold text-slate-600">
                    {index + 1}
                  </td>
                  <td className="px-4 py-6 text-sm font-semibold text-slate-800">
                    {task.title}
                  </td>
                  <td className="px-4 py-6 text-sm text-slate-600 max-w-xs">
                    <div className="truncate">
                      {task.description || "No description provided"}
                    </div>
                  </td>
                  <td className="px-4 py-6 text-sm text-slate-600">
                    {formatDate(task.dueDate)}
                  </td>
                  <td className="px-4 py-6 min-w-[165px]">
                    {getStatusBadge(task.status)}
                  </td>
                  <td className="px-4 py-6">
                    <select
                      className={`px-4 py-2 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${getPriorityColor(
                        task.priority
                      )}`}
                      value={task.priority}
                      onChange={(e) =>
                        handlePriorityChange(task, e.target.value as Priority)
                      }
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </td>
                  <td className="px-4 py-6">
                    <div className="flex gap-3">
                      <button
                        className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-xl transition-all duration-200"
                        onClick={() => setEditingTask(task)}
                      >
                        <SquarePen className="h-5 w-5" />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xl transition-all duration-200"
                        onClick={() => setDeletingTask(task)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-slate-500"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                      <Plus className="h-8 w-8 text-slate-400" />
                    </div>
                    <p className="text-lg font-medium">No tasks found</p>
                    <p className="text-sm">
                      Create your first task to get started
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div
              key={task._id}
              className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg overflow-hidden"
            >
              <div
                className="flex justify-between items-center p-6 cursor-pointer hover:bg-slate-50/50 transition-colors duration-200"
                onClick={() => toggleItemExpansion(task._id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-indigo-600">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {task.title}
                    </h3>
                    <p className="text-sm text-slate-500">Tap to expand</p>
                  </div>
                </div>
                <div className="text-indigo-600">
                  {expandedItems[task._id] ? (
                    <ChevronUp className="h-6 w-6" />
                  ) : (
                    <ChevronDown className="h-6 w-6" />
                  )}
                </div>
              </div>
              {expandedItems[task._id] && (
                <div className="p-6 border-t border-slate-200">
                  <div className="flex items-center mb-4">
                    <h4 className="font-semibold text-slate-800 w-28">
                      Description
                    </h4>
                    <p className="text-sm text-slate-600 ">
                      {task.description || "No description provided"}
                    </p>
                  </div>
                  <div className="flex items-center mb-4">
                    <h4 className="font-semibold text-slate-800 w-28">
                      Due Date
                    </h4>
                    <p className="text-sm text-slate-600">
                      {formatDate(task.dueDate)}
                    </p>
                  </div>
                  <div className="flex items-center mb-4">
                    <h4 className="font-semibold text-slate-800 w-28">
                      Status
                    </h4>
                    {getStatusBadge(task.status)}
                  </div>
                  <div className="flex items-center mb-4">
                    <h4 className="font-semibold text-slate-800 w-28">
                      Priority
                    </h4>
                    <select
                      className={`px-4 py-2 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${getPriorityColor(
                        task.priority
                      )}`}
                      value={task.priority}
                      onChange={(e) =>
                        handlePriorityChange(task, e.target.value as Priority)
                      }
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
            <div className="flex justify-between items-center p-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                  <Plus className="h-8 w-8 text-slate-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    No tasks found
                  </h3>
                  <p className="text-sm text-slate-500">
                    Create your first task to get started
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskTable;
