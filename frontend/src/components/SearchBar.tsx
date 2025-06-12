import { Search, X } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onToggle?: (isExpanded: boolean) => void;
  isExpanded?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onToggle,
  isExpanded = false,
}) => {
  return (
    <>
      <button
        onClick={() => onToggle?.(true)}
        className={`${
          isExpanded ? "hidden" : "block"
        } md:hidden p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
        aria-label="Search"
      >
        <Search className="h-5 w-5 text-white" />
      </button>

      <div
        className={`${
          isExpanded ? "flex" : "hidden"
        } md:flex items-center w-full md:w-auto mr-4 transition-all duration-300`}
      >
        <div className="flex items-center w-full md:w-80 p-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 gap-3">
          <Search className="text-slate-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full border-0 outline-0 bg-transparent placeholder-slate-400 text-slate-700"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            autoFocus
          />
          <button
            onClick={() => onToggle?.(false)}
            className="md:hidden p-1 text-slate-400 hover:text-slate-600 transition-colors duration-200"
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
