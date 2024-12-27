import GymStaff from "../models/GymStaffModel.js";
import { Sequelize } from "sequelize";

export const getGymStaff = async (req, res) => {
  try {
    const gymstaff = await GymStaff.findAll({
      where: { assignedTo: req.userId, deletedAt: null },
      raw: true,
    });

    return res.status(200).json({ gymstaff });
  } catch (err) {
    console.log("errrr gym staff", err)
    res.status(400).json({ error: "Internal server error" });
  }
};

export const addGymStaff= async (req, res) => {
    const { fullName, gender, role, email, phone, joined, birthday } = req.body;
    const assignedTo = req.userId;
  
    if (!fullName)
      return res.status(400).json({ error: "The gym staff name is required" });
    if (!gender)
      return res.status(400).json({ error: "The gym staff gender is required" });
  
    try {
      const gymstaff = await GymStaff.create({
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
        .json({ message: "Gym staff added successfully!", gymstaff });
    } catch (err) {
      res.status(400).json({ error: "Internal server error" });
      console.log(err);
    }
  };

  export const editGymStaff = async (req,res) => {
    
  }

  export const deleteGymStaff = async (req, res) => {
    const gymstaffId = req.params.id;
  
    if (!gymstaffId)
      return res.status(400).json({ error: "Gym staff ID not provided" });
  
    try {
      const [affectedRows] = await GymStaff.update(
        {
          deletedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        {
          where: {
            id: gymstaffId,
          },
        }
      );
  
      if (affectedRows > 0)
        return res.status(200).json({
          message: "Gym staff deleted successfully!",
        });
      else
        return res
          .status(400)
          .json({ error: "Error deleting the gym staff, no rows are affected" });
    } catch (err) {
      console.error("Error deleting gym staff:", err);
      res.status(400).json({ error: "Internal server error" });
    }
  };
  
  