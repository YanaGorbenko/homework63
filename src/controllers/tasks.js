import { Task } from '../db/models/Task.js';
import createHttpError from 'http-errors';
import {
  addTaskService,
  deleteTaskService,
  getTaskServiceById,
  getTasksService,
  updateTaskService,
} from '../services/tasks.js';

export const getTasks = async (req, res) => {
  const { page, perPage, sortBy, sortOrder } = req.query;
  const response = await getTasksService({ page, perPage, sortBy, sortOrder });
  res.json(response);
};

export const getTaskById = async (req, res) => {
  const { taskId } = req.params;
  const task = await getTaskServiceById(taskId);
  if (!task) {
    throw createHttpError(404, 'Task not found!');
  }
  res.json(task);
};

export const addTask = async (req, res) => {
  const body = req.body;
  const newTask = await addTaskService(body);
  res.status(201).json(newTask);
};

export const patchTask = async (req, res) => {
  const { taskId } = req.params;
  const body = req.body;
  const result = await updateTaskService(taskId, body);
  if (!result) {
    throw createHttpError(404, 'Task not found!');
  }
  res.json(result.data);
};

export const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const task = await deleteTaskService(taskId);
  if (!task) {
    throw createHttpError(404, 'Task not found!');
  }
  res.json(task);
};

export const putTask = async (req, res) => {
  const { taskId } = req.params;
  const body = req.body;
  const { data, isUpdated } = await updateTaskService(taskId, body, {
    upsert: true,
  });
  res.status(isUpdated ? 200 : 201).json(data);
};
