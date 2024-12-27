import { Sequelize } from "sequelize";
import DiscountCodes from "../models/DiscountCodeModel.js";

export const getDiscountCodes = async (req, res) => {
  try {
    const discountCodes = await DiscountCodes.findAll({
      where: { assignedTo: req.userId, deletedAt: null },
      raw: true
    });

    return res.status(200).json({ discountCodes });
  } catch (err) {
    res.status(400).json({ error: "Internal server error" });
    console.log("internal err: ", err)
  }
};


export const addDiscountCode = async (req, res) => {
    const { code, discount, discountType, usageLimit, expires } = req.body;
    const assignedTo = req.userId;
  
    if (!code)
      return res.status(400).json({ error: "The discount code is required" });
      if (!discount)
      return res.status(400).json({ error: "The discount value is required" });
      if (!discountType)
      return res.status(400).json({ error: "The discount type is required" });
  
    try {
      const discountCode = await DiscountCodes.create({
        code,
        discount,
        discountType,
        usageLimit: usageLimit || null,
        expires: expires || null,
        assignedTo,
      });
  
      return res
        .status(200)
        .json({ message: "Discount code added successfully!", discountCode });
    } catch (err) {
      res.status(400).json({ error: "Internal server error" });
      console.log(err);
    }
  };


  export const editDiscountCode = async (req,res) => {
    
  }

  export const deleteDiscountCode = async (req, res) => {
    const discountCodeId = req.params.id;
  
    if (!discountCodeId)
      return res.status(400).json({ error: "Discount code ID not provided" });
  
    try {
      const [affectedRows] = await DiscountCodes.update(
        {
          deletedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        {
          where: {
            id: discountCodeId,
          },
        }
      );
  
      if (affectedRows > 0)
        return res.status(200).json({
          message: "Discount code deleted successfully!",
        });
      else
        return res
          .status(400)
          .json({ error: "Error deleting the discount code, no rows are affected" });
    } catch (err) {
      console.error("Error deleting discount code:", err);
      res.status(400).json({ error: "Internal server error" });
    }
  };


