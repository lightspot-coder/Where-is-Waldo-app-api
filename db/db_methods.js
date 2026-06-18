const prisma = require("../lib/prisma");

async function readCharacter({ imageId, characterName }) {
  try {
    const character = await prisma.character.findFirst({
      where: {
        AND: {
          imageId: +imageId,
          name: characterName,
        },
      },
    });
    return character;
  } catch (err) {
    console.log(err);
  }
}

async function updateCharacter(characterId) {
  try {
    const character = await prisma.character.update({
      where: {
        id: characterId,
      },
      data: {
        finded: true,
      },
    });
    return character;
  } catch (err) {
    console.log(err);
  }
}

async function readAllCharacters(imageId) {
  try {
    const characters = await prisma.character.findMany({
      where: {
        imageId: imageId,
      },
    });
    return characters;
  } catch (err) {
    console.log(err);
  }
}

async function createGame(imageId, userId) {
  try {
    const newGame = await prisma.game.create({
      data: {
        player: {
          connect: {
            id: userId,
          },
        },
        imageLoaded: {
          connect: {
            id: imageId,
          },
        },
      },
      include: {
        end: false,
        imageLoaded: {
          include: {
            characters: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    return newGame;
  } catch (err) {
    console.log(err);
  }
}

async function closeGame(gameId) {
  try {
    console.log(gameId);
    const game = await prisma.game.update({
      where: {
        id: gameId,
      },
      data: {
        finished: true,
        end: new Date(),
      },
    });
    return game;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  readCharacter,
  createGame,
  updateCharacter,
  readAllCharacters,
  closeGame,
};
