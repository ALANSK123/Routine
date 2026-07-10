import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import TaskCard from './TaskCard';
import { useTaskContext } from '../context/TaskContext';

const TaskList = ({ tasks, title, currentTaskId, emptyMessage, onEdit, onDelete }) => {
  const { reorderTasks, tasks: allTasks } = useTaskContext();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = allTasks.findIndex((t) => t._id === active.id);
      const newIndex = allTasks.findIndex((t) => t._id === over.id);
      
      const newTasks = arrayMove(allTasks, oldIndex, newIndex);
      // In a real app, you would make an API call to update the order in the backend here
      reorderTasks(newTasks);
    }
  };

  if (!tasks || tasks.length === 0) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">{title}</h2>
        <div className="glass-card p-8 text-center text-gray-500 border-dashed">
          {emptyMessage || 'No tasks in this section.'}
        </div>
      </div>
    );
  }

  const taskIds = tasks.map(task => task._id);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
        {title}
        <span className="bg-primary/10 text-primary text-sm py-0.5 px-2 rounded-full">
          {tasks.length}
        </span>
      </h2>
      
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={taskIds}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard 
                key={task._id} 
                task={task} 
                isActive={task._id === currentTaskId}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default TaskList;
