import Goal from '../models/Goal.js';
import Task from '../models/Task.js';
import { resourceController } from '../utils/resourceController.js';
import { validateReferences } from '../utils/access.js';
const controller = resourceController(Goal, ['title', 'description', 'targetDate', 'status', 'linkedTasks'], {
  validate: (body, workspace) => validateReferences(body, workspace, Task, 'linkedTasks', true),
  populate: { path: 'linkedTasks' }
});
export const { create: createGoal, list: getGoals, get: getGoalById, update: updateGoal, delete: deleteGoal } = controller;
