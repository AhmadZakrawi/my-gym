import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Memberships from "./MembershipModel.js";

const { DataTypes } = Sequelize;
const Members = db.define(
  "members",
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    fullName: { type: DataTypes.STRING, allowNull: false },
    gender: {type: DataTypes.ENUM("male", "female"), allowNull: false},
    email: { type: DataTypes.STRING, defaultValue: null },
    phone: { type: DataTypes.STRING, defaultValue: null },
    registered: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    membershipId: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: null,
      references: {
        model: "memberships",
        key: "id",
      },
    },
    expire: { type: DataTypes.DATE },
    debt: { type: DataTypes.FLOAT.UNSIGNED },
    deletedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NULL },
    assignedTo: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: "users",
        key: "id",
      },
    }
  },
  {
    freezeTableName: true,
  }
);

export const memberstoMembershipsRelation = Members.belongsTo(Memberships, {
  foreignKey: 'membershipId',
  as: 'membership', 
  targetKey: 'id', 
});

(async () => {
  await db.sync();
  // Code here
})();

export default Members;
