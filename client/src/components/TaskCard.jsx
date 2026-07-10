import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CheckCircle2, Circle, Clock, GripVertical, Trash2, Edit2, RefreshCw } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useTaskContext } from '../context/TaskContext';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const formatTime12h = (timeStr) => {
  if (!timeStr) return '';
  const [hoursStr, minutesStr] = timeStr.split(':');
  const hours = parseInt(hoursStr, 10);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours.toString().padStart(2, '0')}:${minutesStr} ${ampm}`;
};

const TaskCard = ({ task, isActive, onDelete, onEdit }) => {
  const { toggleComplete } = useTaskContext();
  
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTimeStr = `${currentHours.toString().padStart(2, '0')}:${currentMinutes.toString().padStart(2, '0')}`;
  const isOverdue = !task.completed && currentTimeStr >= task.endTime;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const priorityColors = {
    Low: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    High: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'glass-card p-4 mb-3 group flex items-start gap-3 transition-all duration-300',
        isActive && 'active-task-glow scale-[1.02]',
        task.completed && 'opacity-60 grayscale'
      )}
    >
      <div 
        {...attributes} 
        {...listeners} 
        className="mt-1 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
      >
        <GripVertical size={20} />
      </div>

      <button
        onClick={() => toggleComplete(task._id)}
        className="mt-1 flex-shrink-0 text-primary hover:text-primary/80 transition-colors"
      >
        {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h3 className={cn("text-lg font-semibold truncate", task.completed && "line-through")}>
            {task.title}
          </h3>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => onEdit(task)} className="p-1 text-gray-500 hover:text-blue-500 rounded">
              <Edit2 size={16} />
            </button>
            <button onClick={() => onDelete(task._id)} className="p-1 text-gray-500 hover:text-red-500 rounded">
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {task.description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
            {task.description}
          </p>
        )}

        <div className="flex items-center gap-3 mt-3 text-xs flex-wrap">
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
            <Clock size={14} />
            <span>{formatTime12h(task.startTime)} - {formatTime12h(task.endTime)}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: task.color }}></div>
            <span className="text-gray-600 dark:text-gray-300">{task.category}</span>
          </div>
          
          <span className={cn("px-2 py-0.5 rounded-full font-medium", priorityColors[task.priority])}>
            {task.priority}
          </span>

          {task.repeat === 'daily' && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
              <RefreshCw size={10} />
              Daily
            </span>
          )}

          {isOverdue && (
            <span className="px-2 py-0.5 rounded-full font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
              Overdue
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
