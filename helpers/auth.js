const User = require("../models/User");
const config = require("../configs/config.json");

// ?----------- Check if user is logged in
const isUserLoggedIn = (req, res, next) => {
  if (!req.user) {
    req.flash("warning", "برای دیدن این صفحه وارد شوید");
    req.session.redirectTo = req.url;
    return res.redirect("/voroodi");
  }

  next();
};

// ?----------- Check if user is not logged in
const isUserNotLoggedIn = (req, res, next) => {
  if (req.user) return res.redirect("/dashboard");
  next();
};

const isUserAdmin = (req, res, next) => {
  if (req.user.userRank.toLowerCase() != "admin")
    return res.redirect("/dashboard");
  next();
};

module.exports = {
  isUserLoggedIn,
  isUserNotLoggedIn,
  isUserAdmin,
};
