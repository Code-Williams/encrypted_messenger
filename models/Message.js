const { DataTypes } = require("sequelize");
const Cryptr = require("cryptr");
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

Message.encrypt = (message, password) => {
  const cryptr = new Cryptr(password);
  const encrypted = cryptr.encrypt(message);
  delete cryptr;
  return encrypted;
};

Message.decrypt = (message, password) => {
  const cryptr = new Cryptr(password);
  const decrypted = cryptr.decrypt(message);
  delete cryptr;
  return decrypted;
};

module.exports = Message;
