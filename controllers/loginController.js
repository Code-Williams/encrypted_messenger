const passport = require("passport");

const get = (req, res) => {
  res.render("login", {
    user: req.user,
    flash: req.flash(),
  });
};

const post = passport.authenticate("local", {
  failureRedirect: "/voroodi",
  failureFlash: true,
  session: true,
});

const loginSuccess = (req, res) => {
  res.redirect(req.session.redirectTo || "/dashboard");
  delete req.session.redirectTo;
};

module.exports = {
  get,
  post,
  loginSuccess,
};
