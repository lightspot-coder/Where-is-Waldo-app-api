const { Router } = require("express");

const indexRouter = Router();
const characterController = require("../controllers/characterController");
const checkURL = require("../middlewares/checkURL");
// homepage
indexRouter.get("/", (req, res) => {
  res.send("Hello world!");
});

// get a character
indexRouter.get(
  "/game/:image/character",
  checkURL.checkTypeOfParams,
  characterController.character_get,
);

// bad url
indexRouter.use("/{*splat}", (req, res) => {
  res.status(404).json({
    message: "not found",
  });
});

module.exports = indexRouter;
