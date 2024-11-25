import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Visitor = sequelize.define(
  "visitor",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no_hp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    division: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt
  }
);

export default Visitor;
