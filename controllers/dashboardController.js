const DMList = require("../models/DmList");

const get = async (req, res) => {
  const firstDMList = await DMList.findAll({
    where: {
      creator_id: req.user.id,
    },
  });

  const secondDMList = await DMList.findAll({
    where: {
      chatter_id: req.user.id,
    },
  });

  res.render("dashboard", {
    user: req.user,
    flash: req.flash(),
    firstDMList,
    secondDMList,
    messages: null,
  });
};

module.exports = {
  get,
};
