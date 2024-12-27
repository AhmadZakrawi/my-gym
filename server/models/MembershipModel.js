import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;
const Memberships = db.define(
  "memberships",
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT.UNSIGNED, allowNull: false },
    type: {
      type: DataTypes.ENUM("time", "session"),
      allowNull: false,
    },
    periodType: { type: DataTypes.ENUM("day", "month"), defaultValue: DataTypes.NULL },
    periodQuantity: { type: DataTypes.INTEGER, defaultValue: DataTypes.NULL },
    sessions: { type: DataTypes.INTEGER, defaultValue: DataTypes.NULL },
    classes: {
      type: DataTypes.ENUM("no_classes", "all_classes"),
      allowNull: false,
    },
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
    timestamps: false,
  }
);

(async () => {
  await db.sync();
  // Code here
})();

export default Memberships;
