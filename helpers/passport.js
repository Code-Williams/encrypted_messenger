const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/User");

passport.initialize();

passport.use(
  new localStrategy(async function (username, password, done) {
    const user = await User.findOne({
      where: {
        username: username.toLowerCase(),
      },
    });

    try {
      if (!user) {
        return done(null, false, {
          message: "Username or password is invalid",
        });
      }

      if (!User.validPassword(user, password)) {
        return done(null, false, {
          message: "Username or password is invalid",
        });
      }

      return done(null, user);
    } catch (error) {
      done(error);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
