const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const postRoutes = require("./routes/posts");

const app = express(); // creates a new express application
const cors = require("cors");
dotenv.config({ path: "./config.env" });
mongoose
  .connect(process.env.url)
  .then(() => console.log("DB connected successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use("", postRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is responding 5000`);
});
