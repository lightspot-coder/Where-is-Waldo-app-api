const prisma = require("../lib/prisma");

async function readCharacter({ imageId, characterName }) {
  try {
    const character = await prisma.characterLoaded.findFirst({
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
    const character = await prisma.characterLoaded.update({
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
    const characters = await prisma.characterLoaded.findMany({
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
    const image = await prisma.image.findFirst({
      where: {
        id: imageId,
      },
      include: {
        characters: {
          omit: {
            imageId: true,
          },
        },
      },
    });

    const newGame = await prisma.game.create({
      data: {
        player: {
          connect: {
            id: userId,
          },
        },
      },
    });

    const imageLoaded = await prisma.imageLoaded.create({
      data: {
        name: image.name,
        fileName: image.fileName,
        gameId: newGame.id,
        characters: {
          createMany: {
            data: image.characters,
          },
        },
      },
    });

    const newGameUpdate = await prisma.game.update({
      where: {
        id: newGame.id,
      },
      data: {
        imageLoaded: {
          connect: {
            id: imageLoaded.id,
          },
        },
      },
      omit: {
        end: true,
      },
      include: {
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
    return newGameUpdate;
  } catch (err) {
    console.log(err);
  }
}
/*
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
*/

async function deleteGame(gameId) {
  try {
    const game = await prisma.game.delete({
      where: {
        id: gameId,
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
  deleteGame,
};
