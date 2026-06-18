const { Router } = require("express");

const indexRouter = Router();
const characterController = require("../controllers/characterController");
const gameController = require("../controllers/gameController");
const checkURL = require("../middlewares/checkURL");
// homepage
indexRouter.get("/", (req, res) => {
  res.send("Hello world!");
});

//get a new game

indexRouter.get("/game", gameController.game_get);

// get a character
indexRouter.get(
  "/game/:game/image/:image/character",
  checkURL.checkTypeOfParams,
  characterController.character_get,
  gameController.gameIsOver,
);

// bad url
indexRouter.use("/{*splat}", (req, res) => {
  res.status(404).json({
    message: "not found",
  });
});

module.exports = indexRouter;
