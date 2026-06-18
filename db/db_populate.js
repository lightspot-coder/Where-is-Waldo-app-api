const prisma = require("../lib/prisma.js");

async function db_populate() {
  try {
    await prisma.image.create({
      data: {
        fileName: "waldo1.jpg",
        characters: {
          create: [{ name: "waldo", positionX: 486, positionY: 379 }],
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
}

db_populate();
