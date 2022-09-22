const get = (req, res) => {
  res.render("index", { user: req.user });
};

module.exports = {
  get,
};
