import Classes from "../models/ClassModel.js";
import Programs from "../models/ProgramModel.js";
import { Sequelize } from "sequelize";

export const getClasses = async (req, res) => {
  try {
    const classes = await Classes.findAll({
      where: { assignedTo: req.userId, deletedAt: null },
      include: 'program',
      raw: true,
    });

    return res.status(200).json({ classes });
  } catch (err) {
    res.status(400).json({ error: "Internal server error" });
    console.log("eerrororor: ", err)
  }
};


export const addClass = async (req, res) => {
    const { programId, type, startTime, endTime, startDate, endDate, maxMembers, reccuringDays } = req.body;
    const assignedTo = req.userId;
  
    if (!programId)
      return res.status(400).json({ error: "Please choose a program for the class" });
    if (!type)
      return res.status(400).json({ error: "The class type is required" });
    if (!startTime || !endTime)
      return res.status(400).json({ error: "The class start and end time is required" });
      if (!startDate)
      return res.status(400).json({ error: "The class start date is required" });
  
    try {
      const theClass = await Classes.create({
        programId,
        type,
        startTime,
        endTime,
        startDate,
        endDate: endDate || null,
        maxMembers: maxMembers || null,
        reccuringDays: reccuringDays || null,
        assignedTo,
      });
  
      return res
        .status(200)
        .json({ message: "Class added successfully!", theClass });
    } catch (err) {
      res.status(400).json({ error: "Internal server error" });
      console.log(err);
    }
  };


export const editClass = async (req,res) => {
  
}

  export const deleteClass = async (req, res) => {
    const classId = req.params.id;
  
    if (!classId)
      return res.status(400).json({ error: "Class ID not provided" });
  
    try {
      const [affectedRows] = await Classes.update(
        {
          deletedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        {
          where: {
            id: classId,
          },
        }
      );
  
      if (affectedRows > 0)
        return res.status(200).json({
          message: "Class deleted successfully!",
        });
      else
        return res
          .status(400)
          .json({ error: "Error deleting the class, no rows are affected" });
    } catch (err) {
      console.error("Error deleting class:", err);
      res.status(400).json({ error: "Internal server error" });
    }
  };
  
  