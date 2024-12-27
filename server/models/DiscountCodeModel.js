import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;
const DiscountCode = db.define(
  "discountcodes",
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    code: { type: DataTypes.STRING, allowNull: false },
    discount: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    discountType: {
      type: DataTypes.ENUM("percentage", "currency"),
      allowNull: false,
    },
    usageLimit: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: DataTypes.NULL },
    expires: { type: DataTypes.DATE, defaultValue: DataTypes.NULL },
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

export default DiscountCode;