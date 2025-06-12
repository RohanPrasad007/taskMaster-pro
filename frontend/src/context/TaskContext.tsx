import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Task } from "../types/task";
import Swal from "sweetalert2";

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "_id">) => Promise<void>;
  editTask: (id: string, updatedTask: Omit<Task, "_id">) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/tasks";

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const showToast = (icon: "success" | "error", title: string) => {
    Swal.fire({
      position: "top-end",
      icon,
      title,
      showConfirmButton: false,
      timer: 5000,
      toast: true,
    });
  };
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL);
      const responseBody = await response.json();

      if (!response.ok) {
        const errorMessage =
          responseBody?.message || `Failed to fetch tasks: ${response.status}`;
        throw new Error(errorMessage);
      }

      const { data } = responseBody;
      setTasks(data);
      setError(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch tasks";
      console.log("Error fetching tasks:", message);
      setError(message);
      showToast("error", message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task: Omit<Task, "_id">) => {
    try {
      setLoading(true);

      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const responseBody = await response.json(); // Parse response body before checking status

      if (!response.ok) {
        // Extract error message from response if available
        const errorMessage =
          responseBody?.message || `Failed to add task: ${response.status}`;
        throw new Error(errorMessage);
      }

      const { data } = responseBody;
      setTasks((prev) => [...prev, data]);
      showToast("success", "Task added successfully!");
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to add task";
      console.log("Error adding task:", message);

      setError(message);
      showToast("error", message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const editTask = async (id: string, updatedTask: Omit<Task, "_id">) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      const responseBody = await response.json();

      if (!response.ok) {
        const errorMessage =
          responseBody?.message || `Failed to update task: ${response.status}`;
        throw new Error(errorMessage);
      }

      const { data } = responseBody;
      setTasks((prev) => prev.map((task) => (task._id === id ? data : task)));
      showToast("success", "Task updated successfully!");
      setError(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update task";
      console.log("Error updating task:", message);
      setError(message);
      showToast("error", message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const deleteTask = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });

      const responseBody = await response.json();

      if (!response.ok) {
        const errorMessage =
          responseBody?.message || `Failed to delete task: ${response.status}`;
        throw new Error(errorMessage);
      }

      setTasks((prev) => prev.filter((task) => task._id !== id));
      showToast("success", "Task deleted successfully!");
      setError(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete task";
      console.log("Error deleting task:", message);
      setError(message);
      showToast("error", message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        editTask,
        deleteTask,
        loading,
        error,
        fetchTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
