const express = require("express");
const config = require("./configs/config.json");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session")({
  secret: config.app.secret,
  resave: true,
  saveUninitialized: true,
});
const cookieParser = require("cookie-parser");
const passport = require("passport");

const app = express();

const http = require("http").Server(app);
const socketIO = require("socket.io")(http);

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected`);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(cookieParser());
app.use(session);
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.use(passport.initialize());
app.use(passport.session());

require("./helpers/passport");

const routes = require("./routes");
app.use("/", routes);

http.listen(config.app.port, () => {
  console.log(`Server is listening to ${config.app.port}`);
});
