const express = require("express");
const cors = require("cors");
const knex = require("knex");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("it's working");
});

app.listen(3002, () => {
  console.log(`app is running on port 3002`);
});
