const prisma = require("../lib/prisma");

async function readCharacter({ imageId, characterName }) {
  try {
    const character = await prisma.character.findFirst({
      where: {
        imageId: +imageId,
        name: characterName,
      },
    });
    return character;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  readCharacter,
};
