const { DataTypes } = require("sequelize");
const db = require("../configs/db");

const DmList = db.define(
  "dmlists",
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },

    creator_id: {
      type: DataTypes.NUMBER,
    },

    chatter_id: {
      type: DataTypes.NUMBER,
    },

    creator_name: {
      type: DataTypes.TEXT,
    },

    chatter_name: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = DmList;
