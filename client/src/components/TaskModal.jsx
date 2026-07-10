import React, { useState, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { X } from 'lucide-react';
import TimePicker from './TimePiker';

const TaskModal = ({ isOpen, onClose, taskToEdit }) => {
  const { addTask, updateTask } = useTaskContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    category: 'General',
    priority: 'Medium',
    repeat: 'none',
    color: '#10b981', // Default emerald
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description || '',
        startTime: taskToEdit.startTime,
        endTime: taskToEdit.endTime,
        category: taskToEdit.category || 'General',
        priority: taskToEdit.priority || 'Medium',
        repeat: taskToEdit.repeat || 'none',
        color: taskToEdit.color || '#10b981',
      });
    } else {
      // Set default times (e.g. next hour)
      const now = new Date();
      const startH = now.getHours().toString().padStart(2, '0');
      const startM = now.getMinutes().toString().padStart(2, '0');
      
      const endNow = new Date(now.getTime() + 60 * 60 * 1000);
      const endH = endNow.getHours().toString().padStart(2, '0');
      const endM = endNow.getMinutes().toString().padStart(2, '0');
      
      setFormData({
        title: '',
        description: '',
        startTime: `${startH}:${startM}`,
        endTime: `${endH}:${endM}`,
        category: 'General',
        priority: 'Medium',
        repeat: 'none',
        color: '#10b981',
      });
    }
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (taskToEdit) {
        await updateTask(taskToEdit._id, formData);
      } else {
        await addTask(formData);
      }
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = ['General', 'Work', 'Study', 'Fitness', 'Health', 'Personal'];
  const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-[color:var(--card-bg)] border border-[color:var(--card-border)] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-4 border-b border-[color:var(--card-border)]">
          <h2 className="text-xl font-semibold">
            {taskToEdit ? 'Edit Task' : 'New Task'}
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="glass-input w-full"
              placeholder="e.g., Morning Workout"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description (Optional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="2"
              className="glass-input w-full resize-none"
              placeholder="Brief details..."
            ></textarea>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Start Time</label>
              <TimePicker
                value={formData.startTime}
                onChange={(value) =>
                  setFormData(prev => ({ ...prev, startTime: value }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">End Time</label>
              <TimePicker
                value={formData.endTime}
                onChange={(value) =>
                  setFormData(prev => ({ ...prev, endTime: value }))
                }
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="glass-input w-full [&>option]:bg-white dark:[&>option]:bg-gray-800"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="glass-input w-full [&>option]:bg-white dark:[&>option]:bg-gray-800"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Repeat</label>
              <select
                name="repeat"
                value={formData.repeat}
                onChange={handleChange}
                className="glass-input w-full [&>option]:bg-white dark:[&>option]:bg-gray-800"
              >
                <option value="none">None</option>
                <option value="daily">Daily</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Color Label</label>
            <div className="flex gap-3">
              {colors.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, color }))}
                  className={`w-8 h-8 rounded-full transition-transform ${formData.color === color ? 'scale-125 ring-2 ring-offset-2 ring-offset-[color:var(--background)] ring-current' : 'hover:scale-110'}`}
                  style={{ backgroundColor: color, color }}
                />
              ))}
            </div>
          </div>
          
          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors flex items-center justify-center min-w-[100px]"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Save Task'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
