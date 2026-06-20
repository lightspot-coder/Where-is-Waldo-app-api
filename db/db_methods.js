const prisma = require("../lib/prisma");
const { connect, get } = require("../routes");

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
            id: true,
          },
        },
      },
    });

    console.log(image);
    let newGame;
    if (userId) {
      newGame = await prisma.game.create({
        data: {
          player: {
            connect: {
              id: +userId,
            },
          },
        },
      });
    } else {
      newGame = await prisma.game.create({
        data: {
          player: {
            create: {
              name: "anonymus",
            },
          },
        },
      });
    }

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

async function createScore(userId, fileName, score) {
  try {
    const image = await prisma.image.findFirst({
      where: {
        fileName: fileName,
      },
    });
    const newScore = await prisma.scores.create({
      data: {
        userScores: {
          connect: {
            id: userId,
          },
        },
        value: score,
        image: {
          connect: {
            id: image.id,
          },
        },
      },
    });
    return newScore;
  } catch (err) {
    console.log(err);
  }
}

async function deleteGame(gameId) {
  try {
    const game = await prisma.game.delete({
      where: {
        id: gameId,
      },
      include: {
        imageLoaded: true,
      },
    });
    return game;
  } catch (err) {
    console.log(err);
  }
}

async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      omit: {
        id: true,
      },
      include: {
        scores: {
          orderBy: {
            value: "asc",
          },
        },
      },
    });
    return users;
  } catch (err) {
    console.log(err);
  }
}

async function updateUserName(userId, name) {
  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
      },
    });
    return user;
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
  createScore,
  getUsers,
  updateUserName,
};
