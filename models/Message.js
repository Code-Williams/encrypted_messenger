const { DataTypes } = require("sequelize");
const db = require("../configs/db");

const Message = db.define(
  "messages",
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },

    chat_id: {
      type: DataTypes.NUMBER,
    },

    text: {
      type: DataTypes.TEXT,
    },

    sender_id: {
      type: DataTypes.NUMBER,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Message;
