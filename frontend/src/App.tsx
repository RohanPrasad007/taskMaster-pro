import { useRef, useState } from "react";
import "./App.css";
import { useTasks } from "./context/TaskContext";
import SearchBar from "./components/SearchBar";
import { ArrowDownUp, ListFilter, Plus } from "lucide-react";
import FilterControls from "./components/FilterControls";
import TaskTable from "./components/TaskTable";
import AddTaskModal from "./components/AddTaskModal";
import type { Priority, Status } from "./types/task";
import { Loader } from "./components/Loader";

function App() {
  const { tasks, loading } = useTasks();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState<Priority | "">("");
  const [selectedStatus, setSelectedStatus] = useState<Status | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const filterButtonRef = useRef<HTMLDivElement>(null);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPriority = selectedPriority
      ? task.priority === selectedPriority
      : true;
    const matchesStatus = selectedStatus
      ? task.status === selectedStatus
      : true;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const sortedTasks = [...filteredTasks];
  if (sortOrder) {
    sortedTasks.sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  }

  const handleTaskAdded = () => {
    setIsAddModalOpen(false);
  };

  const resetFilters = () => {
    setSelectedPriority("");
    setSelectedStatus("");
  };

  const toggleSort = () => {
    if (!sortOrder) {
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      {loading && <Loader />}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          {!isSearchExpanded && (
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                TaskMaster Pro
              </h1>
              <p className="text-slate-500 mt-1">
                {filteredTasks.length}{" "}
                {filteredTasks.length === 1 ? "task" : "tasks"} found
              </p>
            </div>
          )}

          <div className="flex items-center gap-3 w-full md:w-auto">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onToggle={setIsSearchExpanded}
              isExpanded={isSearchExpanded}
            />

            <div className="relative" ref={filterButtonRef}>
              <button
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                className="flex items-center gap-2 p-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <ListFilter className="h-5 w-5 text-slate-600" />
                <span className="hidden md:block text-sm font-medium text-slate-700">
                  Filters
                </span>
              </button>

              <FilterControls
                selectedPriority={selectedPriority}
                selectedStatus={selectedStatus}
                onPriorityChange={setSelectedPriority}
                onStatusChange={setSelectedStatus}
                onResetFilters={resetFilters}
                isOpen={isFilterDropdownOpen}
                onClose={() => setIsFilterDropdownOpen(false)}
              />
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Plus className="h-5 w-5" />
              <span className="hidden md:block text-sm font-medium">
                Add Task
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl md:text-2xl font-bold text-slate-800">
            All Tasks
          </h3>

          <button
            className={`flex items-center gap-2 p-2 md:p-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${
              sortOrder ? "bg-indigo-50 border-indigo-200" : ""
            }`}
            onClick={toggleSort}
          >
            <ArrowDownUp className="h-5 w-5 text-slate-600" />
            <span className="hidden md:block text-sm font-medium text-slate-700">
              {sortOrder === "asc"
                ? "Oldest First"
                : sortOrder === "desc"
                ? "Newest First"
                : "Sort"}
            </span>
          </button>
        </div>

        <TaskTable tasks={sortedTasks} />

        <AddTaskModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onTaskAdded={handleTaskAdded}
        />
      </div>
    </div>
  );
}

export default App;
