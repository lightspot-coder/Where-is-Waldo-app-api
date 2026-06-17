const prisma = require("../lib/prisma.js");

async function db_populate() {
  try {
    await prisma.image.create({
      data: {
        fileName: "waldo4.jpg",
        characters: {
          create: [
            { name: "waldo", positionX: 806, positionY: 48 },
            { name: "odlaw", positionX: 47, positionY: 640 },
          ],
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
}

db_populate();
