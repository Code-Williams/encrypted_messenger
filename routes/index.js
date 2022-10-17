const {
  isUserNotLoggedIn,
  isUserLoggedIn,
  isUserAdmin,
} = require("../helpers/auth");
const express = require("express");
const Router = new express.Router();

const homePageController = require("../controllers/homePageController");
Router.get("/", homePageController.get);

const loginController = require("../controllers/loginController");
Router.get("/voroodi", isUserNotLoggedIn, loginController.get);
Router.get("/avoroodi", isUserNotLoggedIn, loginController.post, (req, res) => { res.render("/dashboardViewer") })
Router.post(
  "/voroodi",
  isUserNotLoggedIn,
  loginController.post,
  loginController.loginSuccess
);

const registerController = require("../controllers/registerController");
Router.get("/register", isUserLoggedIn, isUserAdmin, registerController.get);
Router.post("/register", isUserLoggedIn, isUserAdmin, registerController.post);

const dashboardController = require("../controllers/dashboardController");
Router.get("/dashboard", isUserLoggedIn, dashboardController.get);

const chatController = require("../controllers/chatController");
Router.get("/chat/:id", isUserLoggedIn, chatController.get);
Router.post("/chat/:id", isUserLoggedIn, chatController.post);

const newMessageController = require("../controllers/newMessageController");
Router.post("/newMessage", newMessageController.post);

Router.get("/userInfo", (req, res) => {
  if (req.user) {
    res.send({
      id: req.user.id,
      username: req.user.username,
      userRank: req.user.userRank,
    });
  } else {
    res.redirect("/login");
  }
});

Router.get("*", (req, res) => {
  res.render("error", { code: 404, msg: "Page not found" });
});

module.exports = Router;
