import { requireAuth } from "../middlewares/requireAuth.js";
import express from "express";
import {updateSettings} from "../controllers/SettingsController.js";
import {updateAccount} from "../controllers/AccountController.js";


export const profileRouter = express.Router();
profileRouter.use(requireAuth);


// Settings
profileRouter.put("/settings", updateSettings);
profileRouter.put("/account", updateAccount);