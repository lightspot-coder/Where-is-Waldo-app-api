const db = require("../db/db_methods.js");

function checkPositionOfTheCharacter() {}

async function character_get(req, res) {
  try {
    const character = await db.readCharacter({
      imageId: req.params.image,
      characterName: req.query.name,
    });
    console.log(character);
    if (!character) {
      res.status(404).json({
        message: "character not found",
      });
      return;
    }
    res.status(200).json({
      message: "character found successful",
      data: {
        character,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  character_get,
};
