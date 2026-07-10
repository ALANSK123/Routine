import { check } from 'express-validator';

export const validateTask = [
  check('title', 'Title is required').not().isEmpty(),
  check('startTime', 'Start time is required').not().isEmpty(),
  check('endTime', 'End time is required').not().isEmpty(),
];
