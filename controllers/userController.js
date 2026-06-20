const db = require("../db/db_methods");
async function userName_update(req, res) {
  console.log(req.params.user);
  console.log(req.query.name);
  const user = await db.updateUserName(+req.params.user, req.query.name);
  if (!user) {
    res.status(500).json({
      message: "Server error updating user name",
    });
    return;
  }
  res.json({
    message: "updating user name successful",
    data: {
      user,
    },
  });
}

module.exports = {
  userName_update,
};
