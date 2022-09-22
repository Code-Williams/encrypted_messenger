const User = require("../models/User");

const isUserOwner = async (user) => {
  const findUser = await User.findByPk(user.id);

  if (!findUser) return null;

  if (findUser.userRank == "owner") {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  isUserOwner,
};
