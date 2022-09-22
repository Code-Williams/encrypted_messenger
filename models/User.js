const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const db = require("../configs/db");

const User = db.define(
  "users",
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },

    username: {
      type: DataTypes.TEXT,
    },

    userRank: {
      type: DataTypes.TEXT,
    },

    warn: {
      type: DataTypes.TEXT,
    },

    password: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
  }
);

User.validPassword = function (user, password) {
  return bcrypt.compareSync(password, user.password);
};

User.encryptPassword = async (password) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = await bcrypt.hashSync(password, salt);
  return hash;
};

module.exports = User;
