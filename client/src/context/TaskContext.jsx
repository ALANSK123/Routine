import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTask, setCurrentTask] = useState(null);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/tasks');
      setTasks(data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Add task
  const addTask = async (taskData) => {
    try {
      const { data } = await api.post('/tasks', taskData);
      setTasks((prev) => [data, ...prev]);
      toast.success('Task created successfully');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
      throw error;
    }
  };

  // Update task
  const updateTask = async (id, taskData) => {
    try {
      const { data } = await api.put(`/tasks/${id}`, taskData);
      setTasks((prev) => prev.map((task) => (task._id === id ? data : task)));
      toast.success('Task updated successfully');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task');
      throw error;
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
      throw error;
    }
  };

  // Toggle complete
  const toggleComplete = async (id) => {
    try {
      const { data } = await api.patch(`/tasks/${id}/complete`);
      setTasks((prev) => prev.map((task) => (task._id === id ? data : task)));
      if (data.completed) {
        toast.success('Task marked as completed');
      } else {
        toast.success('Task marked as incomplete');
      }
    } catch (error) {
      toast.error('Failed to update task status');
      throw error;
    }
  };

  // Reorder tasks
  const reorderTasks = (reorderedTasks) => {
    setTasks(reorderedTasks);
    // Optionally sync with backend if order is important
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        currentTask,
        setCurrentTask,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
        toggleComplete,
        reorderTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
