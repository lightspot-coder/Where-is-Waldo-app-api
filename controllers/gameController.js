const db = require("../db/db_methods.js");
const { game } = require("../lib/prisma.js");

async function game_get(req, res) {
  const game = await db.createGame(+req.query.imageId, req.query.userId);
  if (!game) {
    res.status(500).json({
      message: "Error on the server trying to create a new game",
    });
    return;
  }
  res.json({ message: "game created successful", data: { game } });
}
async function gameIsOver(req, res) {
  // check if all the characters have been founded
  if (res.locals.response.message == "character found successful") {
    let someCharacterStillHidden = false;
    const characters = await db.readAllCharacters(+req.params.image);
    for (let i = 0; i < characters.length; i++) {
      if (!characters[i].finded) {
        someCharacterStillHidden = true;
        res.locals.response.message =
          "You find one, but some of the characters still hidden";
        break;
      }
    }

    if (!someCharacterStillHidden) {
      const timePlaying = new Date();
      const game = await db.deleteGame(+req.params.game);
      const score = Math.floor((timePlaying - game.start) / 1000);
      const newScore = await db.createScore(
        +req.params.user,
        game.imageLoaded.fileName,
        score,
      );
      res.json({
        message: "You have finded everyone, congratulation!",
        gameOver: true,
        timePlaying: newScore.value,
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
