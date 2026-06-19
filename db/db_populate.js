const prisma = require("../lib/prisma.js");

async function db_populate() {
  try {
    await prisma.image.create({
      data: {
        name: "waldo on the beach",
        fileName: "waldo1.jpg",
        characters: {
          createMany: {
            data: [{ name: "waldo", positionX: 486, positionY: 425 }],
          },
        },
      },
    });

    await prisma.image.create({
      data: {
        name: "waldo on the the market",
        fileName: "waldo2.jpg",
        characters: {
          createMany: {
            data: [{ name: "waldo", positionX: 176, positionY: 175 }],
          },
        },
      },
    });
    await prisma.image.create({
      data: {
        name: "waldo on the river",
        fileName: "waldo3.jpg",
        characters: {
          createMany: {
            data: [
              { name: "odlaw", positionX: 51, positionY: 634 },
              { name: "waldo", positionX: 800, positionY: 46 },
            ],
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
}

db_populate();
