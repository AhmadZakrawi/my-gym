import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Programs from "./ProgramModel.js";

const { DataTypes } = Sequelize;
const Classes = db.define(
  "classes",
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    programId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "programs",
          key: "id",
        },
        allowNull: false
      },
    type: {
      type: DataTypes.ENUM("onetime", "recurrent"),
      allowNull: false,
    },
    startTime: {type: DataTypes.DATE, allowNull: false},
    endTime: {type: DataTypes.DATE, allowNull: false},
    startDate: {type: DataTypes.DATE, allowNull: false},
    endDate: {type: DataTypes.DATE, defaultValue: DataTypes.NULL},
    maxMembers: {type: DataTypes.INTEGER.UNSIGNED, defaultValue: DataTypes.NULL},
    /*coach: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "coachs",
          key: "id",
        },
      }*/
    reccuringDays: {type: DataTypes.JSON, defaultValue: DataTypes.NULL},
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

Classes.belongsTo(Programs, {
  foreignKey: 'programId',
  as: 'program', 
  targetKey: 'id', 
});

(async () => {
  await db.sync();
  // Code here
})();

export default Classes;
