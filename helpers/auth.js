const User = require("../models/User");
const config = require("../configs/config.json");

// ?----------- Check if user is logged in
const isUserLoggedIn = (req, res, next) => {
  if (!req.user) {
    req.flash("warning", "برای دیدن این صفحه وارد شوید");
    req.session.redirectTo = req.url;
    return res.redirect("/login");
  }

  next();
};

// ?----------- Check if user is not logged in
const isUserNotLoggedIn = (req, res, next) => {
  if (req.user) return res.redirect("/dashboard");
  next();
};

// ?----------- Chcek if user have moderator or super moderator rank on stream
const isUserMod = async (req, res, next) => {
  if (!req.user) {
    return res.status(403).render("error", config.errors[403]);
  }

  const findUser = await User.findOne({
    where: {
      username: req.user.username,
    },
  });

  if (
    findUser &&
    (findUser.userRank == "moderator" ||
      findUser.userRank == "super mod" ||
      findUser.userRank == "developer" ||
      findUser.userRank == "owner")
  ) {
    next();
  } else {
    return res.status(403).render("error", config.errors[403]);
  }
};

const isUserSuperMod = async (req, res, next) => {
  if (!req.user) {
    return res.status(403).render("error", config.errors[403]);
  }

  if (
    req.user.userRank == "developer" ||
    req.user.userRank == "super moderator" ||
    req.user.userRank == "owner"
  ) {
    next();
  } else {
    return res.status(403).render("error", config.errors[403]);
  }
};

module.exports = {
  isUserLoggedIn,
  isUserNotLoggedIn,
  isUserMod,
  isUserSuperMod,
};
