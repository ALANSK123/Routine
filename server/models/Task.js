import mongoose from 'mongoose';

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    startTime: {
      type: String, // HH:mm format
      required: [true, 'Please add a start time'],
    },
    endTime: {
      type: String, // HH:mm format
      required: [true, 'Please add an end time'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    repeat: {
      type: String,
      enum: ['none', 'daily', 'weekly', 'monthly'],
      default: 'none',
    },
    category: {
      type: String,
      default: 'General',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    color: {
      type: String,
      default: '#10b981', // Tailwind Emerald 500
    },
    completed: {
      type: Boolean,
      default: false,
    },
    lastCompletedDate: {
      type: Date,
      default: null,
    },
    order: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
