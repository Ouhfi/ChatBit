import { DataTypes } from "sequelize";
import sequelize from "../config/Database.js";

const Conversation = sequelize.define(
  "Conversation",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("waiting", "active", "closed"),
      allowNull: false,
      defaultValue: "waiting",
    },

    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    agentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    closedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "conversations",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

export default Conversation;