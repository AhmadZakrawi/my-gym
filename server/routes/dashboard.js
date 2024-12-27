import { requireAuth } from "../middlewares/requireAuth.js";
import express from "express";
import {getTasks, completeTask} from "../controllers/TasksController.js";


export const tasksRouter = express.Router();
tasksRouter.use(requireAuth);


// Tasks
tasksRouter.get("/tasks", getTasks);
tasksRouter.put("/tasks/:id", completeTask);
