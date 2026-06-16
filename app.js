/////// app.js

const express = require("express");
//const prisma = require("./lib/prisma.js");
const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("Hello there!"));

app.listen(3000, () => {
  console.log("Listening by the port 3000 ...");
});
