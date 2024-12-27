import { Sequelize } from "sequelize";
import Programs from "../models/ProgramModel.js";

export const getPrograms = async (req, res) => {
  try {
    const programs = await Programs.findAll({
      where: { assignedTo: req.userId, deletedAt: null },
      raw: true
    });

    return res.status(200).json({ programs });
  } catch (err) {
    res.status(400).json({ error: "Internal server error" });
    console.log("internal err: ", err)
  }
};

export const addProgram = async (req, res) => {
    const { name } = req.body;
    const assignedTo = req.userId;
  
    if (!name)
      return res.status(400).json({ error: "The program name is required" });
    
  
    try {
      const program = await Programs.create({
        name,
        assignedTo,
      });
  
      return res
        .status(200)
        .json({ message: "Program added successfully!", program });
    } catch (err) {
      res.status(400).json({ error: "Internal server error" });
      console.log(err);
    }
  };
  
export const editProgram = async (req,res) => {
  
}

  export const deleteProgram = async (req, res) => {
    const programId = req.params.id;
  
    if (!programId)
      return res.status(400).json({ error: "Program ID not provided" });
  
    try {
      const [affectedRows] = await Programs.update(
        {
          deletedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        {
          where: {
            id: programId,
          },
        }
      );
  
      if (affectedRows > 0)
        return res.status(200).json({
          message: "Program deleted successfully!",
        });
      else
        return res
          .status(400)
          .json({ error: "Error deleting the program, no rows are affected" });
    } catch (err) {
      console.error("Error deleting membership:", err);
      res.status(400).json({ error: "Internal server error" });
    }
  };
  
