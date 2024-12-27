import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;
const GymStaff = db.define(
  "gymstaff",
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    fullName: { type: DataTypes.STRING, allowNull: false },
    gender: {type: DataTypes.ENUM("male", "female"), allowNull: false},
    email: { type: DataTypes.STRING, defaultValue: DataTypes.NULL },
    role: { type: DataTypes.STRING, defaultValue: DataTypes.NULL },
    phone: { type: DataTypes.STRING, defaultValue: DataTypes.NULL },
    joined: { type: DataTypes.DATE, defaultValue: DataTypes.NULL },
    birthday: { type: DataTypes.DATE, defaultValue: DataTypes.NULL },
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

(async () => {
  await db.sync();
  // Code here
})();

export default GymStaff;
