import Members from "../models/MemberModel.js";
import { Sequelize } from "sequelize";
import Memberships from "../models/MembershipModel.js";
import memberstoMembershipsRelation from "../models/MembershipModel.js";

export const getMembers = async (req, res) => {
  try {
    const members = await Members.findAll({
      where: { assignedTo: req.userId, deletedAt: null },
      include: 'membership',
      raw: true,
    });

    return res.status(200).json({ members });
  } catch (err) {
    res.status(400).json({ error: "Internal server error" });
  }
};

export const editMembers = async (req,res) => {
  try {
    
  } catch (error) {
    
  }
}

export const addMember = async (req, res) => {
  const { fullName, gender, email, phone, membershipId, expire, debt } = req.body;
  const assignedTo = req.userId;

  if (!fullName)
    return res.status(400).json({ error: "The member name is required" });
  if (!gender)
    return res.status(400).json({ error: "The member gender is required" });

  try {
    const member = await Members.create({
      fullName,
      gender,
      email: email || null,
      phone: phone || null,
      membershipId: membershipId || null,
      expire: expire || null,
      debt: debt || null,
      assignedTo,
    });

    return res
      .status(200)
      .json({ message: "Member added successfully!", member });
  } catch (err) {
    res.status(400).json({ error: "Internal server error" });
    console.log(err);
  }
};

export const deleteMember = async (req, res) => {
  const memberId = req.params.id;

  if (!memberId)
    return res.status(400).json({ error: "Member ID not provided" });

  try {
    const [affectedRows] = await Members.update(
      {
        deletedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      {
        where: {
          id: memberId,
        },
      }
    );

    if (affectedRows > 0)
      return res.status(200).json({
        message: "Member deleted successfully!",
      });
    else
      return res
        .status(400)
        .json({ error: "Error deleting the user, no rows are affected" });
  } catch (err) {
    console.error("Error deleting membership:", err);
    res.status(400).json({ error: "Internal server error" });
  }
};
