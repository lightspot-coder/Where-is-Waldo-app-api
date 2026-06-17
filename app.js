/////// app.js

const express = require("express");
const indexRouter = require("./routes");
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use("/waldo-api", indexRouter);

app.listen(3000, () => {
  console.log("Listening by the port 3000 ...");
});
