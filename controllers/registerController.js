const User = require("../models/User");

const get = async (req, res) => {
  res.render("register", {
    flash: req.flash(),
    user: req.user,
  });
};

const post = async (req, res) => {
  const isUserExist =
    (await User.findOne({
      where: {
        username: req.body.username.toLowerCase(),
      },
    })) || false;

  if (isUserExist) {
    req.flash("danger", "با مشخصات وارد شده قادر به ساخت اکانت نیستید");
    res.redirect("/register");
  } else {
    await User.create({
      username: req.body.username.toLowerCase(),
      password: await User.encryptPassword(req.body.password),
      userRank: "user",
    });

    req.flash(
      "success",
      "اکانت شما با موفقیت ساخته شد. شما میتوانید هم اکنون به اکانت خود وارد شوید."
    );
    res.redirect("/login");
  }
};

module.exports = {
  get,
  post,
};
