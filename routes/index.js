const { Router } = require("express");

const indexRouter = Router();
const characterController = require("../controllers/characterController");
const gameController = require("../controllers/gameController");
const checkURL = require("../middlewares/checkURL");
const scoreController = require("../controllers/scoreController");
const userController = require("../controllers/userController");
// homepage
indexRouter.get("/", (req, res) => {
  res.send("Hello world!");
});

//get a new game

indexRouter.get("/game", gameController.game_get);

//score
indexRouter.get("/score", scoreController.score_get);

// update name

indexRouter.get("/user/:user", userController.userName_update);

// get a character
indexRouter.get(
  "/game/:game/image/:image/user/:user/character",
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
