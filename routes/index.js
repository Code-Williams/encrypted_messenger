const { isUserNotLoggedIn, isUserLoggedIn } = require("../helpers/auth");
const express = require("express");
const Router = new express.Router();

const homePageController = require("../controllers/homePageController");
Router.get("/", homePageController.get);

const loginController = require("../controllers/loginController");
Router.get("/login", isUserNotLoggedIn, loginController.get);
Router.post(
  "/login",
  isUserNotLoggedIn,
  loginController.post,
  loginController.loginSuccess
);

const registerController = require("../controllers/registerController");
Router.get("/register", isUserNotLoggedIn, registerController.get);
Router.post("/register", isUserNotLoggedIn, registerController.post);

const dashboardController = require("../controllers/dashboardController");
Router.get("/dashboard", isUserLoggedIn, dashboardController.get);

const chatController = require("../controllers/chatController");
Router.get("/chat/:id", isUserLoggedIn, chatController.get);
Router.post("/chat/:id", isUserLoggedIn, chatController.post);

Router.get("*", (req, res) => {
  res.render("error", { code: 404, msg: "Page not found" });
});

module.exports = Router;
