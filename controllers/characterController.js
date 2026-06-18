const db = require("../db/db_methods.js");

function checkPositionOfTheCharacter(character, x, y) {
  const BOX_AREA = 50;
  const targetBox = {
    left: character.positionX - BOX_AREA,
    top: character.positionY - BOX_AREA,
    width: BOX_AREA * 2,
    height: BOX_AREA * 2,
  };
  if (x >= targetBox.left && x <= targetBox.left + targetBox.width) {
    if (y >= targetBox.top && y <= targetBox.top + targetBox.height) {
      return targetBox;
    }
  }
  return null;
}

async function character_get(req, res, next) {
  try {
    const response = {};
    res.locals.response = response;
    const character = await db.readCharacter({
      imageId: req.params.image,
      characterName: req.query.name,
    });
    console.log(character);
    if (!character) {
      response.status = 404;
      response.message = "character not found";
      next();
      return;
      /*
      res.status(404).json({
        message: "character not found",
      });
      return
      */
    }
    console.log(req.query);
    const targetBox = checkPositionOfTheCharacter(
      character,
      +req.query.positionX,
      +req.query.positionY,
    );
    console.log(targetBox);
    if (!targetBox) {
      /*
      res.json({
        message: "character is not there",
        finded: false,
      });
      return;
      */
      response.status = 200;
      response.message = "character is not there";
      next();
      return;
    }
    const characterFinded = await db.updateCharacter(character.id);
    console.log(characterFinded);
    /*
    res.json({
      message: "character found successful",
      data: {
        targetBox,
        characterFinded,
      },
    });
    */
    response.status = 200;
    response.message = "character found successful";
    response.data = {
      targetBox,
      characterFinded,
    };
    next();
    return;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  character_get,
};
