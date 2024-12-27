import Coaches from "../models/CoachModel.js";
import { Sequelize } from "sequelize";

export const getCoaches = async (req, res) => {
  try {
    const coaches = await Coaches.findAll({
      where: { assignedTo: req.userId, deletedAt: null },
      raw: true,
    });

    return res.status(200).json({ coaches });
  } catch (err) {
    console.log("errrr coaches", err)
    res.status(400).json({ error: "Internal server error" });
  }
};

export const addCoach= async (req, res) => {
    const { fullName, gender, role, email, phone, joined, birthday } = req.body;
    const assignedTo = req.userId;
  
    if (!fullName)
      return res.status(400).json({ error: "The coach name is required" });
    if (!gender)
      return res.status(400).json({ error: "The coach gender is required" });
  
    try {
      const coach = await Coaches.create({
        fullName,
        gender,
        role: role || null,
        email: email || null,
        phone: phone || null,
        joined: joined || null,
        birthday: birthday || null,
        assignedTo,
      });
  
      return res
        .status(200)
        .json({ message: "Coach added successfully!", coach });
    } catch (err) {
      res.status(400).json({ error: "Internal server error" });
      console.log(err);
    }
  };

  export const editCoach = async (req,res) => {
    
  }

  export const deleteCoach = async (req, res) => {
    const coachId = req.params.id;
  
    if (!coachId)
      return res.status(400).json({ error: "Coach ID not provided" });
  
    try {
      const [affectedRows] = await Coaches.update(
        {
          deletedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        {
          where: {
            id: coachId,
          },
        }
      );
  
      if (affectedRows > 0)
        return res.status(200).json({
          message: "Coach deleted successfully!",
        });
      else
        return res
          .status(400)
          .json({ error: "Error deleting the coach, no rows are affected" });
    } catch (err) {
      console.error("Error deleting coach:", err);
      res.status(400).json({ error: "Internal server error" });
    }
  };
  
  