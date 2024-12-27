import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;
const Programs = db.define(
  "programs",
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    assignedTo: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: "users",
        key: "id",
      },
    },
    deletedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NULL },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
  // Code here
})();

export default Programs;