import { Sequelize } from "sequelize";
import Memberships from "../models/MembershipModel.js";

export const addMemberships = async (req, res) => {
  const { name, price, type, periodQuantity, periodType, sessions, classes } =
    req.body;

  const assignedTo = req.userId;

  if (!name || !price || !type || !classes) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newMembership = await Memberships.create({
      name,
      price,
      type,
      periodQuantity: periodQuantity || null,
      periodType: periodType || null,
      sessions: sessions || null,
      classes,
      assignedTo,
    });

    return res.status(201).json({
      message: "Membership added successfully",
      membership: newMembership,
    });
  } catch (error) {
    console.error("Error adding membership:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getMemberships = async (req, res) => {
  try {
    const userMemberships = await Memberships.findAll({
      where: { assignedTo: req.userId, deletedAt: null },
      raw: true,
    });

    return res.status(200).json({ memberships: userMemberships });
  } catch (error) {
    console.error("Error fetching memberships:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const editMemberships = async (req, res) => {
  const { name, price, type, periodQuantity, periodType, sessions, classes } = req.body;
  const membershipId = req.params.id;
  const assignedTo = req.userId;

  if (!membershipId)
    return res.status(400).json({ error: "Membership ID not found" });

  try {
    const membership = await Memberships.findOne({
      where: { id: membershipId, assignedTo: assignedTo },
    });

    if (!membership) {
      return res.status(404).json({ error: "Membership not found or not assigned to you" });
    }

    const updatedMembership = await membership.update({
      name,
      price,
      type,
      periodQuantity: periodQuantity || null,
      periodType: periodType || null,
      sessions: sessions || null,
      classes,
    });

    return res.status(200).json({
      message: "Membership updated successfully",
      membership: updatedMembership,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Error when trying to edit membership: ${error}` });
  }
};


export const deleteMemberships = async (req, res) => {
  const membershipId = req.params.id;

  if (!membershipId)
    return res.status(400).json({ error: "Membership ID not found" });

  try {
    const [affectedRows] = await Memberships.update(
      {
        deletedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      {
        where: {
          id: membershipId,
        },
      }
    );
    console.log("affected :", affectedRows);

    if (affectedRows > 0)
      return res.status(200).json({
        message: "Membership deleted successfully!",
      });
    else
      return res.status(400).json({ error: "Error deleting the membership" });
  } catch (err) {
    res.status(400).json({ error: "Internal server error" });
    console.log(err);
  }
};
