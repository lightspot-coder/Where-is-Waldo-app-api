const db = require("../db/db_methods");
async function score_get(req, res) {
  const users = await db.getUsers();
  if (!users) {
    res.status(500).json({
      message: "Internal sever error",
    });
    return;
  }
  res.json({
    message: "Sending all the scores of the users",
    data: {
      users,
    },
  });
}

module.exports = {
  score_get,
};
