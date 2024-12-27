import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;
const Users = db.define(
  "users",
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    gymName: { type: DataTypes.STRING, allowNull: false },
    avatar: { type: DataTypes.TEXT('long'), defaultValue: DataTypes.NULL },
    language: { type: DataTypes.ENUM("english", "french", "arabic"), defaultValue: "english" },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
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

export default Users;
