/////// app.js

const express = require("express");
const indexRouter = require("./routes");
const app = express();

app.use(express.urlencoded({ extended: false }));

// CORS policy

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use("/waldo-api", indexRouter);

app.listen(3000, () => {
  console.log("Listening by the port 3000 ...");
});
