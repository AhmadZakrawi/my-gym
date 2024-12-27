import express from "express";
import {
  addMemberships,
  getMemberships,
  editMemberships,
  deleteMemberships,
} from "../controllers/MembershipsController.js";
import {
  addMember,
  deleteMember,
  getMembers,
} from "../controllers/MembersController.js";
import {
    addProgram,
    deleteProgram,
    getPrograms,
  } from "../controllers/ProgramsController.js";
  import {
    addClass,
    deleteClass,
    getClasses,
  } from "../controllers/ClassesController.js";
  import {
    addDiscountCode,
    deleteDiscountCode,
    getDiscountCodes,
  } from "../controllers/DiscountCodesController.js";
  import {
    addGymStaff,
    deleteGymStaff,
    getGymStaff,
  } from "../controllers/GymStaffController.js";
  import {
    addCoach,
    deleteCoach,
    getCoaches,
  } from "../controllers/CoachesController.js";


import { requireAuth } from "../middlewares/requireAuth.js";

export const manageRouter = express.Router();
manageRouter.use(requireAuth);


//Memberships
manageRouter.post("/memberships", addMemberships);
manageRouter.get("/memberships", getMemberships);
manageRouter.put("/edit-memberships/:id", editMemberships);
manageRouter.delete("/memberships/:id", deleteMemberships);
// Members
manageRouter.get("/members", getMembers);
manageRouter.post("/members", addMember);
manageRouter.delete("/members/:id", deleteMember);
// Programs
manageRouter.get("/programs", getPrograms);
manageRouter.post("/programs", addProgram);
manageRouter.delete("/programs/:id", deleteProgram);
// Classes
manageRouter.get("/classes", getClasses);
manageRouter.post("/classes", addClass);
manageRouter.delete("/classes/:id", deleteClass);
// Discount codes
manageRouter.get("/discountcodes", getDiscountCodes);
manageRouter.post("/discountcodes", addDiscountCode);
manageRouter.delete("/discountcodes/:id", deleteDiscountCode);
// Gym staff
manageRouter.get("/gymstaff", getGymStaff);
manageRouter.post("/gymstaff", addGymStaff);
manageRouter.delete("/gymstaff/:id", deleteGymStaff);
// Coaches
manageRouter.get("/coaches", getCoaches);
manageRouter.post("/coaches", addCoach);
manageRouter.delete("/coaches/:id", deleteCoach);




