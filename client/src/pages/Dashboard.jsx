import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { useCurrentTask } from '../hooks/useCurrentTask';
import Clock from '../components/Clock';
import TaskList from '../components/TaskList';
import TaskModal from '../components/TaskModal';
import { Plus, ListTodo, Activity } from 'lucide-react';

const Dashboard = () => {
  const { tasks, loading, deleteTask } = useTaskContext();
  const { currentTask, upcomingTasks, completedTasks, progress } = useCurrentTask();
  
  // State for modals (we'll implement the actual modal later)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  const handleAddNew = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  if (loading && tasks.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <Clock />

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card p-6 flex items-center justify-between">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Total Tasks</p>
            <p className="text-3xl font-bold mt-1">{tasks.length}</p>
          </div>
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl">
            <ListTodo size={24} />
          </div>
        </div>
        
        <div className="glass-card p-6 flex items-center justify-between">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Completed</p>
            <p className="text-3xl font-bold mt-1 text-success">{completedTasks.length}</p>
          </div>
          <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl">
            <Activity size={24} />
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col justify-center">
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Daily Progress</p>
            <span className="text-sm font-semibold text-primary">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Routine</h2>
        <button 
          onClick={handleAddNew}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          <span>New Task</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {currentTask && (
            <TaskList 
              title="Current Task" 
              tasks={[currentTask]} 
              currentTaskId={currentTask._id}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}

          <TaskList 
            title="Upcoming" 
            tasks={upcomingTasks} 
            emptyMessage="No upcoming tasks for today. You're all caught up!"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        <div>
          <TaskList 
            title="Completed" 
            tasks={completedTasks} 
            emptyMessage="You haven't completed any tasks yet."
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
      
      <TaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskToEdit={taskToEdit}
      />
    </div>
  );
};

export default Dashboard;
