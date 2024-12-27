import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;
const Tasks = db.define(
  "tasks",
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    order: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    label: { type: DataTypes.STRING, allowNull: false },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
    actionUrl: { type: DataTypes.STRING, defaultValue: null },
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

export default Tasks;