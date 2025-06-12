import { useEffect, useRef } from "react";
import type { Priority, Status } from "../types/task";
import { ChevronDown } from "lucide-react";

interface FilterControlsProps {
  selectedPriority: Priority | "";
  selectedStatus: Status | "";
  onPriorityChange: (priority: Priority | "") => void;
  onStatusChange: (status: Status | "") => void;
  onResetFilters: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  selectedPriority,
  selectedStatus,
  onPriorityChange,
  onStatusChange,
  onResetFilters,
  isOpen,
  onClose,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-3 w-72 bg-white/95 backdrop-blur-lg border border-slate-200 rounded-2xl shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200"
    >
      <div className="p-6">
        <h3 className="text-slate-800 font-semibold mb-6 pb-3 border-b border-slate-200">
          Filter Tasks
        </h3>

        <div className="mb-6">
          <label className="block text-slate-600 text-sm font-medium mb-3">
            Priority
          </label>
          <div className="relative">
            <select
              className="w-full p-3 border border-slate-200 rounded-xl appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/70 transition-all duration-200"
              value={selectedPriority}
              onChange={(e) =>
                onPriorityChange(e.target.value as Priority | "")
              }
            >
              <option value="">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400 h-5 w-5" />
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-slate-600 text-sm font-medium mb-3">
            Status
          </label>
          <div className="relative">
            <select
              className="w-full p-3 border border-slate-200 rounded-xl appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/70 transition-all duration-200"
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value as Status | "")}
            >
              <option value="">All Status</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400 h-5 w-5" />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            className="flex-1 border border-slate-300 text-slate-600 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 transition-all duration-200"
            onClick={onResetFilters}
          >
            Reset
          </button>
          <button
            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
            onClick={onClose}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
