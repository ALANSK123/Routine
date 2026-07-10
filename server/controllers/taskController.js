import Task from '../models/Task.js';
import { validationResult } from 'express-validator';

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).sort({ order: 1, createdAt: -1 });

    // Reset daily recurring tasks if they were completed before today
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const resetPromises = tasks.map(async (task) => {
      if (task.repeat === 'daily' && task.completed && task.lastCompletedDate && task.lastCompletedDate < startOfToday) {
        task.completed = false;
        task.lastCompletedDate = null;
        await task.save();
      }
    });
    await Promise.all(resetPromises);

    res.json(tasks);
  } catch (error) {
    res.status(500);
    throw new Error('Server Error');
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Public
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task) {
      res.json(task);
    } else {
      res.status(404);
      throw new Error('Task not found');
    }
  } catch (error) {
    res.status(500);
    throw new Error('Server Error');
  }
};

// @desc    Create a task
// @route   POST /api/tasks
// @access  Public
export const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }

  try {
    const { title, description, startTime, endTime, date, repeat, category, priority, color, order } = req.body;

    const task = new Task({
      title,
      description,
      startTime,
      endTime,
      date,
      repeat,
      category,
      priority,
      color,
      order,
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(500);
    throw new Error('Server Error');
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Public
export const updateTask = async (req, res) => {
  try {
    const { title, description, startTime, endTime, date, repeat, category, priority, color, completed, order } = req.body;

    const task = await Task.findById(req.params.id);

    if (task) {
      task.title = title || task.title;
      task.description = description !== undefined ? description : task.description;
      task.startTime = startTime || task.startTime;
      task.endTime = endTime || task.endTime;
      task.date = date || task.date;
      task.repeat = repeat || task.repeat;
      task.category = category || task.category;
      task.priority = priority || task.priority;
      task.color = color || task.color;
      if (completed !== undefined) {
        if (completed && !task.completed) {
          task.lastCompletedDate = new Date();
        } else if (!completed && task.completed) {
          task.lastCompletedDate = null;
        }
        task.completed = completed;
      }
      task.order = order !== undefined ? order : task.order;

      const updatedTask = await task.save();
      res.json(updatedTask);
    } else {
      res.status(404);
      throw new Error('Task not found');
    }
  } catch (error) {
    res.status(500);
    throw new Error('Server Error');
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Public
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task) {
      await Task.deleteOne({ _id: task._id });
      res.json({ message: 'Task removed' });
    } else {
      res.status(404);
      throw new Error('Task not found');
    }
  } catch (error) {
    res.status(500);
    throw new Error('Server Error');
  }
};

// @desc    Mark task as complete/incomplete
// @route   PATCH /api/tasks/:id/complete
// @access  Public
export const toggleComplete = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task) {
      task.completed = !task.completed;
      if (task.completed) {
        task.lastCompletedDate = new Date();
      } else {
        task.lastCompletedDate = null;
      }
      const updatedTask = await task.save();
      res.json(updatedTask);
    } else {
      res.status(404);
      throw new Error('Task not found');
    }
  } catch (error) {
    res.status(500);
    throw new Error('Server Error');
  }
};
