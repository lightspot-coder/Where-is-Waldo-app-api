const db = require("../db/db_methods.js");
const { game } = require("../lib/prisma.js");

async function game_get(req, res) {
  const game = await db.createGame(+req.query.imageId, +req.query.userId);
  if (!game) {
    res.status(500).json({
      message: "Error on the server trying to create a new game",
    });
    return;
  }
  console.log(game);
  res.json({ message: "game created successful", data: { game } });
}
async function gameIsOver(req, res) {
  console.log(res.locals.response);

  // check if all the characters have been founded
  if (res.locals.response.message == "character found successful") {
    let someCharacterStillHidden = false;
    const characters = await db.readAllCharacters(+req.params.image);
    console.log(characters);
    for (let i = 0; i < characters.length; i++) {
      if (!characters[i].finded) {
        someCharacterStillHidden = true;
        res.locals.response.message = "Still some of the characters are hidden";
        break;
      }
    }

    if (!someCharacterStillHidden) {
      const game = await db.deleteGame(+req.params.game);
      console.log(game);
      res.json({
        message: "You have finded everyone, congratulation!",
        gameOver: true,
        data: res.locals.response.data,
      });
      return;
    }
  }
  res.status(res.locals.response.status).json({
    message: res.locals.response.message,
    data: res.locals.response.data,
  });
}
module.exports = {
  game_get,
  gameIsOver,
};
