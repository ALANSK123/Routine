import { useState, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';

export const useCurrentTask = () => {
  const { tasks } = useTaskContext();
  const [currentTask, setCurrentTask] = useState(null);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateTaskStatus = () => {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTimeStr = `${currentHours.toString().padStart(2, '0')}:${currentMinutes.toString().padStart(2, '0')}`;

      let current = null;
      const upcoming = [];
      const completed = [];

      tasks.forEach((task) => {
        if (task.completed) {
          completed.push(task);
          return;
        }

        // Compare time strings (HH:mm) directly
        if (currentTimeStr >= task.startTime && currentTimeStr < task.endTime) {
          current = task;
        } else {
          upcoming.push(task);
        }
      });

      setCurrentTask(current);
      setUpcomingTasks(upcoming.sort((a, b) => a.startTime.localeCompare(b.startTime)));
      setCompletedTasks(completed);

      // Calculate progress
      if (tasks.length > 0) {
        const completedCount = tasks.filter(t => t.completed).length;
        setProgress(Math.round((completedCount / tasks.length) * 100));
      } else {
        setProgress(0);
      }
    };

    updateTaskStatus();
    
    // Update every minute
    const interval = setInterval(updateTaskStatus, 60000);
    return () => clearInterval(interval);
  }, [tasks]);

  return { currentTask, upcomingTasks, completedTasks, progress };
};
